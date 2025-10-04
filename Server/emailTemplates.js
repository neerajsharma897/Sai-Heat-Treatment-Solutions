// Email HTML templates for customer auto-reply and internal notification (CommonJS)

function buildAutoReplyHtml({ name, service }) {
  return `<!doctype html>
<html lang="en" style="margin:0; padding:0;">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Thanks, ${name}</title>
    <!-- Preheader -->
    <style>
      .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; }
      @media only screen and (max-width: 600px) {
        .container { width:100% !important; }
        .stack { display:block !important; width:100% !important; max-width:100% !important; }
        .pr-16 { padding-right:0 !important; }
        .pl-16 { padding-left:0 !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#ffffff; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;">
    <div class="preheader">We’ve received your ${service} request. We’ll get back within 1 business day (Mon–Sat).</div>

    <!-- Outer wrapper -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#ffffff;">
      <!-- Full-bleed header banner (no padding) -->
      <tr>
        <td style="padding:0;">
          <img src="cid:email-banner@shs" alt="Sai Heat Treatment Solutions" width="1600" style="display:block; width:100%; height:auto; border:0; outline:none; text-decoration:none;" />
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0;">
          <!-- Content area (full-width) -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="container" style="width:100%; max-width:100%;">

            <!-- Greeting -->
            <tr>
              <td style="padding:24px 0 0 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#111827;">
                <h1 style="margin:0 0 8px 0; font-size:22px; line-height:1.4; color:#0b1e33;">Thanks, ${name}.</h1>
                <p style="margin:0; font-size:16px; line-height:1.7; color:#374151;">
                  Your request for <strong>${service}</strong> has been received and assigned to our team.
                </p>
              </td>
            </tr>

            <!-- What to expect -->
            <tr>
              <td style="padding:16px 0 0 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb; background:#f9fafb; border-radius:6px;">
                  <tr>
                    <td style="padding:12px 14px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:15px; line-height:1.7; color:#1f2937;">
                      <strong style="color:#0b1e33;">What to expect:</strong> A response within <strong>1 business day</strong> (Mon–Sat). For urgent matters, please use the contact options below.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:16px 0 0 0;">
                <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;" />
              </td>
            </tr>

            <!-- Two Columns: Contact & Hours | Our Services -->
            <tr>
              <td style="padding:16px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#111827;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td class="stack" width="50%" valign="top" style="padding-right:12px;">
                      <h2 style="margin:0 0 10px 0; font-size:18px; line-height:1.5; color:#0b1e33;">Contact & Hours</h2>
                      <p style="margin:0 0 10px 0; font-size:15px; line-height:1.8; color:#374151;">
                        Phone: <strong><a href="tel:+919321613552" style="color:#0b1e33; text-decoration:none;">+91 93216 13552</a></strong><br />
                        Email: <strong><a href="mailto:contact@saiheattreatmentsolutions.com" style="color:#0b1e33; text-decoration:none;">contact@saiheattreatmentsolutions.com</a></strong><br />
                        Address: <strong>Plot No. A-12, Anand Nagar, Additional M.I.D.C, Ambernath, Maharashtra 421506, India</strong><br />
                        Hours: Mon–Sat 10 am – 6 pm · Sun Closed (Holidays may differ)
                      </p>
                    </td>
                    <td class="stack" width="50%" valign="top" style="padding-left:12px;">
                      <h2 style="margin:0 0 10px 0; font-size:18px; line-height:1.5; color:#0b1e33;">Our Services</h2>
                      <ul style="margin:0; padding-left:18px; font-size:15px; line-height:1.9; color:#374151;">
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

            <!-- Disclaimer -->
            <tr>
              <td style="padding:6px 0 0 0;">
                <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:13px; line-height:1.7; color:#6b7280;">
                  This mailbox is not monitored. For follow‑ups or to share more files, email
                  <a href="mailto:contact@saiheattreatmentsolutions.com" style="color:#0b1e33; text-decoration:none; font-weight:600;">contact@saiheattreatmentsolutions.com</a>
                  or call the number above.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0 0 0;">
                <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;" />
              </td>
            </tr>
           
            <!-- Footer -->
            <tr>
              <td style="padding:14px 0 24px 0;">
                <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:12px; line-height:1.7; color:#6b7280;">
                  Sai Heat Treatment Solutions · Plot No. A-12, Anand Nagar, Additional M.I.D.C, Ambernath, Maharashtra 421506, India
                </p>
              </td>
            </tr>

          </table>
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

module.exports = {
  buildAutoReplyHtml,
  buildInternalHtml,
};
