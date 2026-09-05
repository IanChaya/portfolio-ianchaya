import { buildSystemPrompt } from "./promptBuilder.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-120b";

const MAX_HISTORY_MESSAGES = 6; // most recent user/assistant turns kept
const MAX_MESSAGE_CHARS = 1000; // per-message cap
const RATE_LIMIT_PER_HOUR = 12; // per-IP requests
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;

// Groq's free-tier TPM cap (8K/min) means only ~3 requests/min fit
// regardless of model. A near-miss (Groq says "retry in 500ms") is worth
// waiting out invisibly; a multi-second wait is not worth blocking on.
const GROQ_RETRY_MAX_WAIT_MS = 1500;

function getAllowedOrigins(env) {
  return (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

// Returns the request's Origin if it's in the allow-list, otherwise null.
// A spoofed Origin header can still match this (Origin isn't authenticated),
// so the real abuse guard is the per-IP rate limit below, not this check.
function matchOrigin(request, env) {
  const origin = request.headers.get("Origin");
  return getAllowedOrigins(env).includes(origin) ? origin : null;
}

function corsHeaders(matchedOrigin) {
  return {
    "Access-Control-Allow-Origin": matchedOrigin || "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function jsonResponse(body, status, matchedOrigin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(matchedOrigin),
    },
  });
}

async function checkRateLimit(env, ip) {
  const key = `rl:${ip}`;
  const current = await env.RATE_LIMIT.get(key);
  const count = current ? parseInt(current, 10) : 0;
  if (count >= RATE_LIMIT_PER_HOUR) return false;
  await env.RATE_LIMIT.put(key, String(count + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
  });
  return true;
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    }));
}

export default {
  async fetch(request, env) {
    const matchedOrigin = matchOrigin(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(matchedOrigin) });
    }

    if (request.method !== "POST" || new URL(request.url).pathname !== "/chat") {
      return jsonResponse({ error: "Not found" }, 404, matchedOrigin);
    }

    if (!matchedOrigin) {
      return jsonResponse({ error: "Forbidden" }, 403, matchedOrigin);
    }

    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const allowed = await checkRateLimit(env, ip);
    if (!allowed) {
      return jsonResponse(
        { error: "Too many requests, please try again later." },
        429,
        matchedOrigin
      );
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400, matchedOrigin);
    }

    const lang = ["en", "es", "fr"].includes(payload.lang) ? payload.lang : "en";
    const messages = sanitizeMessages(payload.messages);
    if (messages.length === 0) {
      return jsonResponse({ error: "No message provided" }, 400, matchedOrigin);
    }

    const systemPrompt = buildSystemPrompt(lang);

    async function callGroq() {
      return fetch(GROQ_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          temperature: 0.3,
          max_tokens: 350,
          // Free-tier TPM is tight (8K/min) and gpt-oss's hidden reasoning
          // tokens count against it; this is a short factual Q&A persona
          // that doesn't need deep reasoning, so keep it low.
          reasoning_effort: "low",
        }),
      });
    }

    try {
      let groqResponse = await callGroq();

      // Groq's TPM window resets continuously, so a request that's only
      // barely over the limit often succeeds a moment later. Worth one
      // short, invisible retry - but not worth blocking the user on a
      // multi-second wait, so skip it when retry-after is large.
      if (groqResponse.status === 429) {
        const retryAfterSec = parseFloat(groqResponse.headers.get("retry-after") || "");
        if (!Number.isNaN(retryAfterSec) && retryAfterSec * 1000 <= GROQ_RETRY_MAX_WAIT_MS) {
          await new Promise((r) => setTimeout(r, retryAfterSec * 1000));
          groqResponse = await callGroq();
        }
      }

      if (!groqResponse.ok) {
        const bodyText = await groqResponse.text().catch(() => "");
        console.error(
          "Groq API error",
          groqResponse.status,
          "retry-after:", groqResponse.headers.get("retry-after"),
          "body:", bodyText.slice(0, 300)
        );
        return jsonResponse(
          { error: "The assistant is unavailable right now. Please try again later." },
          502,
          matchedOrigin
        );
      }

      const data = await groqResponse.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return jsonResponse(
          { error: "The assistant is unavailable right now. Please try again later." },
          502,
          matchedOrigin
        );
      }

      return jsonResponse({ reply }, 200, matchedOrigin);
    } catch (err) {
      console.error("Worker error", err);
      return jsonResponse(
        { error: "Something went wrong. Please try again later." },
        500,
        matchedOrigin
      );
    }
  },
};
