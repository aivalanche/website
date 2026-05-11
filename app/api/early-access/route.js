import { NextResponse } from 'next/server'
import { convex } from '@/lib/convex'
import { api } from '@/convex/_generated/api'

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

  // 1. Persist to Convex.
  let result
  try {
    const client = convex()
    result = await client.mutation(api.waitlist.add, {
      email,
      locale: locale || 'en',
      source: 'landing-page',
    })
  } catch (e) {
    console.error('[Waitlist] Convex write failed:', e?.message)
    return NextResponse.json({ error: 'Could not save signup' }, { status: 500 })
  }

  // 2. Send notification email (non-blocking).
  if (result.added) {
    try {
      const nodemailer = await import('nodemailer')
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
          port: parseInt(process.env.SMTP_PORT) || 465,
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
  <p><strong>Total:</strong> ${result.count} signups</p>
</div>
</div>`,
          replyTo: email,
        })
      }
    } catch (e) {
      console.error('[Waitlist] Email notification failed:', e?.message)
    }
  }

  return NextResponse.json({
    message: result.added ? 'Successfully registered' : 'Already registered',
    count: result.count,
  })
}

export async function GET() {
  try {
    const client = convex()
    const entries = await client.query(api.waitlist.list, {})
    return NextResponse.json({ count: entries.length, entries })
  } catch (e) {
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}
