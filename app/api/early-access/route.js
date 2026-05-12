import { NextResponse } from 'next/server'

/**
 * Waitlist signup endpoint.
 *
 * Two persistence layers, in order:
 *   1. Convex (preferred — see /lib/convex.js). Skipped silently if
 *      NEXT_PUBLIC_CONVEX_URL is missing or the mutation throws.
 *   2. SMTP notification email to ADMIN_NOTIFY_EMAIL. Acts as the
 *      backstop log: even if the DB is down, you still get the lead
 *      in your inbox.
 *
 * The signup succeeds (200) if EITHER path stored the lead. Only when
 * both fail do we return 500 — that way a misconfigured Convex doesn't
 * make the home page form look broken.
 */
export async function POST(request) {
  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }
  const { email, locale } = payload || {}

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // 1. Try Convex.
  let convexResult = null
  let convexError = null
  try {
    const { convex } = await import('@/lib/convex')
    const { api } = await import('@/convex/_generated/api')
    convexResult = await convex().mutation(api.waitlist.add, {
      email,
      locale: locale || 'en',
      source: 'landing-page',
    })
  } catch (e) {
    convexError = e?.message || String(e)
    console.error('[Waitlist] Convex write skipped:', convexError)
  }

  // 2. SMTP notification (best-effort backstop).
  let emailSent = false
  let emailError = null
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
      await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        to: process.env.ADMIN_NOTIFY_EMAIL || 'edonderguti@gmail.com',
        subject: `New Labflow waitlist signup: ${email}`,
        html: `<div style="font-family:-apple-system,system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px">
<div style="background:#ff4d12;padding:24px;color:#fff;margin-bottom:16px">
  <h2 style="margin:0 0 8px 0;font-size:20px">New Labflow waitlist signup</h2>
</div>
<div style="background:#f4f4f1;padding:20px;border:1px solid #d4d4cf">
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><strong>Locale:</strong> ${locale || 'en'}</p>
  <p><strong>At:</strong> ${new Date().toISOString()}</p>
  ${
    convexResult
      ? `<p><strong>DB:</strong> stored (total ${convexResult.count})</p>`
      : `<p><strong>DB:</strong> not stored (${convexError ? convexError.slice(0, 120) : 'no Convex'})</p>`
  }
</div>
</div>`,
        replyTo: email,
      })
      emailSent = true
    } catch (e) {
      emailError = e?.message || String(e)
      console.error('[Waitlist] Email notification failed:', emailError)
    }
  } else {
    emailError = 'SMTP not configured'
  }

  // Decide outcome.
  if (convexResult || emailSent) {
    return NextResponse.json({
      message: convexResult && !convexResult.added ? 'Already registered' : 'Successfully registered',
      count: convexResult?.count,
      persisted: Boolean(convexResult),
      notified: emailSent,
    })
  }

  return NextResponse.json(
    {
      error: 'Signup not persisted',
      details: { convex: convexError, email: emailError },
    },
    { status: 500 },
  )
}

export async function GET() {
  try {
    const { convex } = await import('@/lib/convex')
    const { api } = await import('@/convex/_generated/api')
    const entries = await convex().query(api.waitlist.list, {})
    return NextResponse.json({ count: entries.length, entries })
  } catch (e) {
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}
