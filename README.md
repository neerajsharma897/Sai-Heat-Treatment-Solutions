# Deployment guide (Hostinger)

This project has two parts:
- Client: React + Vite (TypeScript)
- Server: Node.js + Express API (email + file upload)

There are two recommended deployment options on Hostinger:

## Option A: Single Node app serving static client and API (simple)
Hostinger Node.js hosting can run a single Node process. The server here is already configured to serve the built client from `Client/dist` and handle `/api/*`.

Steps:
1) Build the client locally (or in CI):
   - Windows fix for npm EPERM (if needed): close editors/antivirus; then in `Client/` run `npm ci` or `npm install`.
   - Build: `npm run build` inside `Client/`. This creates `Client/dist/`.
2) Upload the whole repo to Hostinger, or only the `Server/` folder plus `Client/dist/`.
   The server expects `../Client/dist` relative to `Server/index.js` (as in repo). If you change structure, update `distPath` in `Server/index.js`.
3) In Hostinger hPanel -> Websites -> Manage -> Node.js, create a new app:
   - Application root: point to `Server`
   - Entry point: `index.js`
   - Node version: 18+ (LTS)
4) Set environment variables in Hostinger:
   - Copy values from `Server/.env.example`. Critical: SMTP_*, NODE_ENV=production, CORS_ORIGIN (if front-end is on a different origin)
5) Install dependencies in `Server/`: run `npm install` from hPanel terminal (or deploy with node_modules bundled). No build step for server.
6) Start the app from hPanel. The server will:
   - Serve static files from `Client/dist` (cache-optimized)
   - Handle `POST /api/quote` and `GET /api/health`

DNS and SMTP:
- Use Hostinger email (e.g., contact@yourdomain). Set SMTP_HOST `smtp.hostinger.com`, port 465, auth user/pass.
- Add SPF and DKIM records in your domain DNS per Hostinger’s instructions to improve deliverability.

## Option B: Static hosting for client + separate Node API
If you prefer to host the React app as static files (e.g., on Hostinger static hosting) and run the Node API separately (Hostinger Node app or another provider):
1) Build and upload `Client/dist` to the static hosting path.
2) Deploy the `Server` as a Node app (same as above) at e.g. `https://api.yourdomain.com`.
3) In `Client`, set `VITE_API_BASE=https://api.yourdomain.com` in environment and rebuild, or set via hPanel build.
4) In `Server`, set `CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com`.

## Environment files
- `Client/.env.example`: contains `VITE_API_BASE` override if front-end and API are on different origins.
- `Server/.env.example`: SMTP and CORS settings. Copy to `.env` and fill in on Hostinger.

## Production readiness checklist
- [x] Client build via Vite (cache-busted assets)
- [x] API rate limiting and per-route cooldown
- [x] File uploads memory-capped and size-limited (18 MB total)
- [x] Nodemailer SMTP with secure port handling
- [x] CSP report-only in dev; minimal CSP in prod
- [x] CORS restricted via `CORS_ORIGIN` (when front-end on separate origin)
- [x] SPA fallback for client routing

## Troubleshooting
- Windows npm EPERM during install: close editors/antivirus; delete `Client/node_modules`; run `npm cache verify`; try `npm ci` again.
- If emails not delivered: check SMTP credentials, enable SSL (port 465), ensure SPF/DKIM records exist, and review Hostinger mail logs.
- If 413 Payload Too Large: attachments exceed 18 MB total; reduce files.
- For 429 responses: rate limit or cooldown triggered; wait 1 minute and retry.
