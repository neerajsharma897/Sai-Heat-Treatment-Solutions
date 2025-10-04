# Server

This folder contains the Express API that handles quote submissions for the Sai Heat Treatment Solutions site.

Environment variables (example):

- SMTP_HOST - SMTP server hostname (required to send emails)
- SMTP_PORT - SMTP port (required)
- SMTP_USER - SMTP username (required)
- SMTP_PASS - SMTP password (required)
- SMTP_FROM - (optional) From address to use
- NOTIFY_TO - (optional) Internal notification recipient
- DKIM_DOMAIN, DKIM_SELECTOR, DKIM_PRIVATE_KEY - (optional) DKIM settings

Testing the /api/quote endpoint (curl example):

curl -v -F "name=Test User" -F "email=test@example.com" \
  -F "company=Acme" -F "phone=+911234567890" -F "service=Heat Treatment" \
  -F "requirements=Some requirements" -F "file=@path/to/file.pdf" \
  http://localhost:4000/api/quote

Notes:
- The server accepts file uploads under any form field name. For best compatibility, use `file`.
- If the server logs `SMTP configuration missing in environment variables.`, set the SMTP_* env vars or run with a development SMTP like Mailtrap.
 
Local development:

If you don't have a `.env` file, you can copy `.env.example` into `.env` and edit it:

```powershell
cd Server
copy .env.example .env
```

This project will now load `.env` if present, otherwise it falls back to `.env.example` automatically.
