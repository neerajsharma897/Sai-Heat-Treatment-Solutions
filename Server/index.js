require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { buildAutoReplyHtml, buildInternalHtml } = require('./emailTemplates');
const { BUCKET_EMAIL_CAPACITY, BUCKET_IP_CAPACITY, BUCKET_REFILL_MS, checkTokenBucket } = require('./throttle');
const { emailRegex, phoneRegex, validateFields } = require('./validation');

const app = express();
const PORT = process.env.PORT || 4000;

const MAX_TOTAL = 18 * 1024 * 1024; // 18 MB combined (safe for email)
const MAX_FILES = 10;
const BANNER_PATH = path.join(__dirname, 'Banner.png');

app.set('trust proxy', 1);

// CORS: allow specific origins when CORS_ORIGIN is set (comma-separated)
const corsOrigins = process.env.CORS_ORIGIN?.split(',').map(s => s.trim()).filter(Boolean);
const corsOptions = corsOrigins && corsOrigins.length > 0
  ? {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true); // non-browser tools
        if (corsOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    }
  : { origin: true, credentials: true };
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const isDev = process.env.NODE_ENV !== 'production';

// Note: Content-Security-Policy reporting removed. Re-enable only if you need CSP report collection.

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


// Per-route rate limiter for the quote endpoint
const quoteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a minute and try again.' },
});

// Multer: memory storage for attachments (per-file cap 18 MB, max files defined by MAX_FILES)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 18 * 1024 * 1024 },
}).array('attachments', MAX_FILES);



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

      // Token-bucket throttling
      const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
      const emailKey = `email:${email}`;
      const ipKey = `ip:${ip}`;
      const emailOpts = { capacity: BUCKET_EMAIL_CAPACITY, refillMs: BUCKET_REFILL_MS };
      const ipOpts = { capacity: BUCKET_IP_CAPACITY, refillMs: BUCKET_REFILL_MS };
      const peekEmail = checkTokenBucket(emailKey, emailOpts, false);
      const peekIp = checkTokenBucket(ipKey, ipOpts, false);
      if (!peekEmail.ok || !peekIp.ok) {
        const wait = Math.max(peekEmail.waitSec || 0, peekIp.waitSec || 0) || 60;
        return res.status(429).json({ error: `Please wait ${wait}s before submitting again.` });
      }
      // Both allowed: consume one token from each
      checkTokenBucket(emailKey, emailOpts, true);
      checkTokenBucket(ipKey, ipOpts, true);

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

      // Customer auto-reply
      await transporter.sendMail({
        from: FROM,
        to: email,
        replyTo: NOTIFY_ADDR,
        subject: 'We received your quote request',
        text:
`Hello ${name},

Thanks for contacting Sai Heat Treatment Solutions. We've received your request for ${service} and assigned it to our team. You'll hear from us within one business day.

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

// Security headers
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // No CSP header set by default here; set a CSP in your reverse-proxy or CDN if required.
  next();
});

// Static content and SPA fallback
const distPath = path.join(__dirname, '..', 'Client', 'dist');
// Prefer Cache-Control over Expires; set long cache for assets with hashes
app.use(express.static(distPath, {
  maxAge: '31536000', // 1 year
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (/\\.(?:html)$/i.test(filePath)) {
      // HTML should not be aggressively cached
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    } else {
      // Static assets: strong caching is ok since Vite outputs hashed filenames
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));
app.get('*', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(distPath, 'index.html'));
});

// Global error guard
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
  server.headersTimeout = 120000;
  server.requestTimeout = 120000;
}

// Graceful shutdown
process.on('SIGTERM', () => { console.log('SIGTERM'); process.exit(0); });
process.on('SIGINT', () => { console.log('SIGINT'); process.exit(0); });

// IMPORTANT: Export the app for Vercel
module.exports = app;