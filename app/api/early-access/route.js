import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json')

function readWaitlist() {
  try {
    if (fs.existsSync(WAITLIST_FILE)) {
      return JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf-8'))
    }
  } catch (e) {
    console.error('Error reading waitlist:', e)
  }
  return []
}

function saveWaitlist(entries) {
  const dir = path.dirname(WAITLIST_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(entries, null, 2), 'utf-8')
}

export async function POST(request) {
  try {
    const { email, locale } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // 1. Save to local JSON file (guaranteed persistence)
    const entries = readWaitlist()
    const alreadyExists = entries.some((e) => e.email === email)

    if (!alreadyExists) {
      entries.push({
        email,
        locale: locale || 'de',
        timestamp: new Date().toISOString(),
        source: 'landing-page',
      })
      saveWaitlist(entries)
      console.log(`[Waitlist] New signup: ${email} (total: ${entries.length})`)
    } else {
      console.log(`[Waitlist] Duplicate: ${email}`)
    }

    // 2. Try to send notification email (optional, won't block success)
    try {
      const nodemailer = await import('nodemailer')

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
          port: parseInt(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        await transporter.sendMail({
          from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
          to: 'edonderguti@gmail.com',
          subject: `🚀 Neue Wartelisten-Anmeldung: ${email}`,
          html: `
<div style="font-family: -apple-system, system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
  <div style="background: #B1E346; padding: 24px; border-radius: 12px; color: #1a1a1a; margin-bottom: 16px;">
    <h2 style="margin: 0 0 8px 0; font-size: 20px;">🚀 Neue Wartelisten-Anmeldung</h2>
    <p style="margin: 0; opacity: 0.8; font-size: 14px;">AIvalanche Enterprise Agent</p>
  </div>
  <div style="background: #f8f9fb; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb;">
    <p style="margin: 0 0 12px 0;"><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
    <p style="margin: 0 0 12px 0;"><strong>Sprache:</strong> ${locale === 'en' ? 'Englisch' : 'Deutsch'}</p>
    <p style="margin: 0 0 12px 0;"><strong>Zeitpunkt:</strong> ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</p>
    <p style="margin: 0;"><strong>Gesamt:</strong> ${entries.length} Anmeldungen</p>
  </div>
</div>`,
          replyTo: email,
        })
        console.log(`[Waitlist] Email notification sent for ${email}`)
      } else {
        console.log('[Waitlist] SMTP not configured — skipping email notification')
      }
    } catch (emailError) {
      console.error('[Waitlist] Email notification failed (entry still saved):', emailError.message)
    }

    return NextResponse.json({
      message: alreadyExists ? 'Already registered' : 'Successfully registered',
      count: entries.length,
    })
  } catch (error) {
    console.error('[Waitlist] Critical error:', error)
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 },
    )
  }
}

// GET endpoint to view all waitlist entries (for admin use)
export async function GET(request) {
  const entries = readWaitlist()
  return NextResponse.json({ count: entries.length, entries })
}
