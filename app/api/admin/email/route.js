import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { isAuthed } from '@/lib/admin/auth'
import { convex } from '@/lib/convex'
import { api } from '@/convex/_generated/api'

export async function POST(request) {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }
  const { to, subject, body: html, mode } = body || {}
  if (!subject || !html) {
    return NextResponse.json({ error: 'subject and body required' }, { status: 400 })
  }

  // Resolve recipient list.
  let recipients = []
  if (mode === 'broadcast-waitlist') {
    try {
      const client = convex()
      const entries = await client.query(api.waitlist.list, {})
      recipients = entries.map((e) => e.email)
    } catch (e) {
      return NextResponse.json({ error: 'Could not load waitlist: ' + e?.message }, { status: 500 })
    }
  } else {
    if (!to || typeof to !== 'string') {
      return NextResponse.json({ error: 'to required for single send' }, { status: 400 })
    }
    recipients = [to]
  }
  if (recipients.length === 0) {
    return NextResponse.json({ error: 'No recipients resolved' }, { status: 400 })
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return NextResponse.json({ error: 'SMTP_USER / SMTP_PASS not configured' }, { status: 500 })
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  const from = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER

  const results = { successful: [], failed: [] }
  for (const recipient of recipients) {
    try {
      await transporter.sendMail({ from, to: recipient, subject, html })
      results.successful.push(recipient)
      try {
        await convex().mutation(api.emails.record, {
          to: recipient,
          subject,
          body: html,
          success: true,
          audienceSize: recipients.length,
          sentBy: 'admin',
        })
      } catch {
        /* audit-log write failed — don't fail the send because of it */
      }
    } catch (e) {
      results.failed.push({ recipient, error: e?.message })
      try {
        await convex().mutation(api.emails.record, {
          to: recipient,
          subject,
          body: html,
          success: false,
          error: e?.message,
          audienceSize: recipients.length,
          sentBy: 'admin',
        })
      } catch {
        /* audit-log write failed — don't fail the send because of it */
      }
    }
  }

  return NextResponse.json({
    sent: results.successful.length,
    failed: results.failed,
    recipients: results.successful,
  })
}
