# Portfolio chatbot worker

Cloudflare Worker that proxies chat requests from the portfolio's chat widget to Groq's free API. It keeps the Groq API key server-side and grounds every answer in the same `src/translations/*/global.json` content the site itself renders.

## One-time setup

```sh
cd worker
npm install
npx wrangler login

# Create the KV namespace used for per-IP rate limiting, then paste the
# returned id into wrangler.toml under [[kv_namespaces]] -> id.
npx wrangler kv namespace create RATE_LIMIT

# Store your Groq API key (from https://console.groq.com) as a secret.
# Never put it in wrangler.toml or commit it anywhere.
npx wrangler secret put GROQ_API_KEY
```

## Local development

```sh
npm run dev
```

Then test it:

```sh
curl -X POST http://localhost:8787/chat \
  -H "Content-Type: application/json" \
  -H "Origin: https://ianchaya.github.io" \
  -d '{"lang":"en","messages":[{"role":"user","content":"How many years of experience do you have?"}]}'
```

## Deploy

```sh
npm run deploy
```

Note the `*.workers.dev` URL it prints and put it in `src/config.js` (`CHAT_API_URL`) in the main app, then rebuild/redeploy the site.
