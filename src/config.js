// Public endpoint for the portfolio chatbot's Cloudflare Worker.
// Not a secret — protected by CORS + per-IP rate limiting server-side.
// Replace with your deployed *.workers.dev (or custom domain) URL after
// running `wrangler deploy` from the worker/ directory.
export const CHAT_API_URL = "https://portfolio-ianchaya-chatbot.ianchaya.workers.dev/chat";
