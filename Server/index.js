require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

const MAX_TOTAL = 18 * 1024 * 1024; // 18 MB combined (safe for email)
const MAX_FILES = 10;
const BANNER_PATH = path.join(__dirname, 'Banner.png');

// Core middleware
app.set('trust proxy', 1);
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CSP Report-Only to identify eval/inline usage without blocking. Remove or harden for production.
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self'",
  'report-uri /csp-report',
].join('; ');
const enableCspReportOnly = (process.env.CSP_REPORT_ONLY === '1') || (process.env.NODE_ENV !== 'production');
if (enableCspReportOnly) {
  app.use((req, res, next) => {
    // Only set for HTML responses and static assets; harmless for API
    res.setHeader('Content-Security-Policy-Report-Only', cspReportOnly);
    next();
  });
}

// Endpoint to receive CSP reports
app.post('/csp-report', express.json({ type: ['application/csp-report', 'application/json'] }), (req, res) => {
  // Console log minimal payload for inspection
  const report = req.body['csp-report'] || req.body;
  console.log('CSP Report:', JSON.stringify(report, null, 2));
  res.status(204).end();
});

// Global rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
}));

// Health
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SMTP transporter (DKIM via Hostinger DNS)
function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Missing required SMTP environment variables');
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// Per-route rate limit + cooldown (in-memory)
const quoteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a minute and try again.' },
});
const cooldownCache = new Map();
function checkCooldown(key, windowMs = 60_000) {
  const now = Date.now();
  const last = cooldownCache.get(key) || 0;
  const remaining = windowMs - (now - last);
  if (remaining > 0) return Math.ceil(remaining / 1000);
  cooldownCache.set(key, now);
  return 0;
}

// Multer upload: field "attachments", ≤ 25 MB per file, ≤ 10 files
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 18 * 1024 * 1024 }, // per-file hard cap
}).array('attachments', MAX_FILES);

// Email templates
function buildAutoReplyHtml({ name, service }) {
  return `<!doctype html>
<html lang="en" style="margin:0; padding:0;">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Thanks, ${name}</title>
     Preheader text: appears in inbox preview 
    <style>
      .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; }
      /* Mobile stacking for two columns */
      @media only screen and (max-width: 600px) {
        .container { width:100% !important; }
        .stack { display:block !important; width:100% !important; max-width:100% !important; }
        .center { text-align:center !important; }
        .mb-16 { margin-bottom:16px !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#f3f4f6; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;">
    <div class="preheader">We’ve received your ${service} request. We’ll get back within 1 business day (Mon–Sat).</div>

     Outer wrapper 
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f3f4f6;">
      <tr>
        <td align="center" style="padding:24px 12px;">
           Card 
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="width:600px; max-width:600px; background:#ffffff; border-radius:12px; border:1px solid #e5e7eb;">
             Header / Logo 
            <tr>
              <td style="padding:20px 20px 0 20px;">
                <img src="cid:email-banner@shs" width="560" alt="Sai Heat Treatment Solutions - The Most Reliable Partner for Your Heat Treatment Needs" style="display:block; width:100%; max-width:560px; height:auto; border-radius:8px;" />
              </td>
            </tr>

             Greeting 
            <tr>
              <td style="padding:20px 20px 0 20px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#111827;">
                <h1 style="margin:0 0 6px 0; font-size:22px; line-height:1.3; color:#0b1e33;">Thanks, ${name}.</h1>
                <p style="margin:0; font-size:16px; line-height:1.6; color:#374151;">
                  Your request for <strong>${service}</strong> has been received and assigned to our team.
                </p>
              </td>
            </tr>

             What to expect banner 
            <tr>
              <td style="padding:16px 20px 0 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb; background:#f9fafb; border-radius:8px;">
                  <tr>
                    <td style="padding:12px 14px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:15px; line-height:1.6; color:#1f2937;">
                      <strong style="color:#0b1e33;">What to expect:</strong> A response within <strong>1 business day</strong> (Mon–Sat). For urgent matters, please use the contact options below.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

             Divider 
            <tr>
              <td style="padding:20px 20px 0 20px;">
                <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;" />
              </td>
            </tr>

             Two Column: Contact & Services 
            <tr>
              <td style="padding:20px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#111827;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                     Contact 
                    <td class="stack mb-16" width="50%" valign="top" style="padding-right:12px;">
                      <h2 style="margin:0 0 8px 0; font-size:18px; line-height:1.4; color:#0b1e33;">Contact & Hours</h2>
                      <p style="margin:0 0 10px 0; font-size:15px; line-height:1.7; color:#374151;">
                        Phone: <strong><a href="tel:+919321613552" style="color:#0b1e33; text-decoration:none;">+91 93216 13552</a></strong><br />
                        Email: <strong><a href="mailto:contact@saiheattreatmentsolutions.com" style="color:#0b1e33; text-decoration:none;">contact@saiheattreatmentsolutions.com</a></strong><br />
                        Address: <strong>Plot No. A-12, Anand Nagar, Additional M.I.D.C, Ambernath, Maharashtra 421506, India</strong><br />
                        Hours: Mon–Sat 10 am – 6 pm · Sun Closed (Holidays may differ)
                      </p>

                       CTA Buttons 
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:8px;">
                        <tr>
                          <td style="border-radius:8px; background:#0b1e33;">
                            <a href="tel:+919321613552" style="display:inline-block; padding:10px 14px; color:#ffffff; font-size:14px; text-decoration:none; font-weight:600; border-radius:8px;">Call Now</a>
                          </td>
                          <td style="width:8px;">&nbsp;</td>
                          <td style="border-radius:8px; background:#f97316;">
                            <a href="mailto:contact@saiheattreatmentsolutions.com" style="display:inline-block; padding:10px 14px; color:#ffffff; font-size:14px; text-decoration:none; font-weight:600; border-radius:8px;">Email Us</a>
                          </td>
                        </tr>
                      </table>
                    </td>

                     Services 
                    <td class="stack" width="50%" valign="top" style="padding-left:12px;">
                      <h2 style="margin:0 0 8px 0; font-size:18px; line-height:1.4; color:#0b1e33;">Our Services</h2>
                      <ul style="margin:0; padding-left:18px; font-size:15px; line-height:1.7; color:#374151;">
                        <li>PWHT / Stress Relief</li>
                        <li>Preheating</li>
                        <li>Temporary Electric Furnace</li>
                        <li>Annealing & Normalizing</li>
                        <li>Hydrogen Diffusion</li>
                        <li>Dry Out System</li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

             Disclaimer 
            <tr>
              <td style="padding:6px 20px 0 20px;">
                <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:13px; line-height:1.6; color:#6b7280;">
                  This mailbox is not monitored. For follow‑ups or to share more files, email
                  <a href="mailto:contact@saiheattreatmentsolutions.com" style="color:#0b1e33; text-decoration:none; font-weight:600;">contact@saiheattreatmentsolutions.com</a>
                  or call the number above.
                </p>
              </td>
            </tr>

             Footer 
            <tr>
              <td style="padding:18px 20px 20px 20px;">
                <hr style="border:none; border-top:1px solid #e5e7eb; margin:0 0 10px 0;" />
                <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:12px; line-height:1.6; color:#6b7280;">
                  Sai Heat Treatment Solutions · Plot No. A-12, Anand Nagar, Additional M.I.D.C, Ambernath, Maharashtra 421506, India
                </p>
              </td>
            </tr>
          </table>
           /Card 
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
function buildInternalHtml({ name, email, company, phone, service, requirements }) {
  return `
  <div style="font-family: system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif; background:#fff; color:#1a1a1a; padding:16px;">
    <img src="cid:email-banner@shs" alt="Sai Heat Treatment Solutions" style="max-width:100%; display:block; border-radius:8px; margin-bottom:16px;" />
    <h2 style="margin:0 0 12px; color:#0b1e33;">New Quote Request</h2>
    <table style="width:100%; border-collapse:collapse;">
      <tr><td style="padding:6px 0; width:140px; color:#555;">Name</td><td style="padding:6px 0;">${name}</td></tr>
      <tr><td style="padding:6px 0; color:#555;">Email</td><td style="padding:6px 0;">${email}</td></tr>
      <tr><td style="padding:6px 0; color:#555;">Company</td><td style="padding:6px 0;">${company || 'N/A'}</td></tr>
      <tr><td style="padding:6px 0; color:#555;">Phone</td><td style="padding:6px 0;">${phone}</td></tr>
      <tr><td style="padding:6px 0; color:#555;">Service</td><td style="padding:6px 0;">${service}</td></tr>
    </table>
    <div style="margin-top:12px; padding:12px; background:#f7f8f9; border:1px solid #eee; border-radius:8px; white-space:pre-wrap;">${requirements}</div>
  </div>`;
}

// Validation helpers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+()\-\s]{6,20}$/;
function validateFields(body) {
  const { name, email, phone, service, requirements, website } = body;
  if (website && String(website).trim() !== '') return { isBot: true };
  if (!name || !email || !phone || !service || !requirements) return { error: 'Missing required fields.' };
  if (!emailRegex.test(email)) return { error: 'Invalid email format.' };
  if (!phoneRegex.test(phone)) return { error: 'Invalid phone format.' };
  return { ok: true };
}

// Quote route
app.post(
  '/api/quote',
  quoteLimiter,
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'A single attachment exceeds 18 MB.' });
        return res.status(400).json({ error: err.message || 'File upload error' });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const { name, email, company, phone, service, requirements, website } = req.body;

      // Validation
      const v = validateFields(req.body);
      if (v.isBot) return res.status(200).json({ ok: true });
      if (v.error) return res.status(400).json({ error: v.error });

      // Cooldown
      const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
      const cdEmail = checkCooldown(`email:${email}`);
      if (cdEmail) return res.status(429).json({ error: `Please wait ${cdEmail}s before submitting again.` });
      const cdIp = checkCooldown(`ip:${ip}`);
      if (cdIp) return res.status(429).json({ error: `Please wait ${cdIp}s before submitting again.` });

      // Files and total size
      const files = Array.isArray(req.files) ? req.files : [];
      if (files.length > MAX_FILES) return res.status(400).json({ error: `Maximum ${MAX_FILES} files allowed.` });
      const totalBytes = files.reduce((sum, f) => sum + (typeof f.size === 'number' ? f.size : (f.buffer ? f.buffer.length : 0)), 0);
  if (totalBytes > MAX_TOTAL) return res.status(413).json({ error: 'Total attachments must be 18 MB or less.' });

      // Email send
      const transporter = createTransporter();
      const FROM = process.env.SMTP_FROM || process.env.SMTP_USER; // no-reply@
      const NOTIFY_ADDR = process.env.NOTIFY_TO || process.env.SMTP_USER; // contact@

      const replyTo = emailRegex.test(email) ? `${name || 'Website User'} <${email}>` : undefined;

      const internalAttachments = [
        { filename: 'Banner.png', path: BANNER_PATH, cid: 'email-banner@shs' },
        ...files.map(f => ({ filename: f.originalname, content: f.buffer })),
      ];

      // Internal notification
      await transporter.sendMail({
        from: FROM,
        to: NOTIFY_ADDR,
        replyTo,
        subject: `New Quote • ${service} • ${name}`,
        text:
`New quote request.

Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Phone: ${phone}
Service: ${service}

Requirements:
${requirements}
`,
        html: buildInternalHtml({ name, email, company, phone, service, requirements }),
        headers: { 'X-Source': 'webform' },
        attachments: internalAttachments,
      });

      // Customer auto‑reply
      await transporter.sendMail({
        from: FROM,
        to: email,
        replyTo: NOTIFY_ADDR,
        subject: 'We received your quote request',
        text:
`Hello ${name},

Thanks for contacting Sai Heat Treatment Solutions. We’ve received your request for ${service} and assigned it to our team. You’ll hear from us within one business day.

Need urgent help? Call +91 93216 13552. To add details or files, reply to this email.

Regards,
Sai Heat Treatment Solutions`,
        html: buildAutoReplyHtml({ name, service }),
        headers: { 'X-Source': 'auto-ack' },
        attachments: [{ filename: 'Banner.png', path: BANNER_PATH, cid: 'email-banner@shs' }],
      });

      res.json({ ok: true });
    } catch (err) {
      console.error('Quote error:', err);
      res.status(500).json({ error: 'Failed to process quote request' });
    }
  }
);

// Static content and SPA fallback
const distPath = path.join(__dirname, '..', 'Client', 'dist');
app.use(express.static(distPath, { maxAge: '1y', etag: true, lastModified: true }));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), { headers: { 'Cache-Control': 'no-cache' } });
});

// Global error guard
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server with relaxed timeouts (helpful for multipart on slow disks)
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
server.headersTimeout = 120000;
server.requestTimeout = 120000;

// Graceful shutdown
process.on('SIGTERM', () => { console.log('SIGTERM'); process.exit(0); });
process.on('SIGINT', () => { console.log('SIGINT'); process.exit(0); });
