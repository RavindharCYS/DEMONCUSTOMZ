// POST /api/subscribe
// Body: { email: string }
//
// Uses Resend (https://resend.com) to (a) send the subscriber a confirmation
// email and (b) notify the DemonCustomz team of the new sign-up.
// Requires these environment variables set in your Vercel project
// (Project Settings → Environment Variables — server-side only, no VITE_ prefix):
//   RESEND_API_KEY        — from https://resend.com/api-keys
//   RESEND_FROM_EMAIL      — a verified sender, e.g. "DemonCustomz <notify@demoncustomz.in>"
//   NOTIFY_TO_EMAIL        — where new-subscriber alerts should land, e.g. contact@demoncustomz.in

import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const notifyTo = process.env.NOTIFY_TO_EMAIL;

  if (!apiKey || !fromEmail) {
    return res.status(500).json({
      error: 'Mail service is not configured yet. Set RESEND_API_KEY and RESEND_FROM_EMAIL.',
    });
  }

  const resend = new Resend(apiKey);
  const brandName = process.env.BRAND_NAME || 'DemonCustomz';

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `You're on the list — ${brandName} launch`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
          <h2 style="color:#131b2e;margin-bottom:8px;">Thanks for signing up!</h2>
          <p style="color:#5b615d;line-height:1.6;">
            You're now on the ${brandName} launch list. We'll email you the moment
            we open — plus any early launch offers.
          </p>
          <p style="color:#5b615d;">— Team ${brandName}</p>
        </div>
      `,
    });

    if (notifyTo) {
      await resend.emails.send({
        from: fromEmail,
        to: notifyTo,
        subject: `New launch subscriber: ${email}`,
        html: `<p>New subscriber: <strong>${email}</strong></p>`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(502).json({ error: 'Could not send confirmation email right now.' });
  }
}
