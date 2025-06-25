// app/api/contact/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Format email address properly
function formatEmailAddress(email, name = '') {
  // Ensure email is trimmed and valid
  const cleanEmail = email?.trim()

  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    throw new Error(`Invalid email address: ${email}`)
  }

  // If name is provided, format as "Name <email>"
  if (name) {
    // Escape quotes in name to prevent injection
    const safeName = name.replace(/"/g, '\\"')
    return `"${safeName}" <${cleanEmail}>`
  }

  // Otherwise just return the email
  return cleanEmail
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 },
      )
    }

    // Validate user's email
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address provided' }, { status: 400 })
    }

    // Debug environment variables
    console.log('Environment check:', {
      SMTP_HOST: process.env.SMTP_HOST || 'NOT SET',
      SMTP_USER: process.env.SMTP_USER ? 'Set' : 'NOT SET',
      SMTP_USER_VALUE: process.env.SMTP_USER || 'NOT SET',
      SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL || 'NOT SET',
    })

    // Determine the FROM email address
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER

    if (!fromEmail) {
      console.error('No FROM email configured. Set SMTP_USER or SMTP_FROM_EMAIL in environment variables.')
      return NextResponse.json({ error: 'Email configuration error: No sender email configured' }, { status: 500 })
    }

    // Validate FROM email
    if (!isValidEmail(fromEmail)) {
      console.error(`Invalid FROM email format: ${fromEmail}`)
      return NextResponse.json(
        { error: `Email configuration error: Invalid sender email format: ${fromEmail}` },
        { status: 500 },
      )
    }

    // Recipients
    const recipients = ['edonderguti@aivalanche.de', 'gazmendalia@gmail.com']

    // Create transporter with better error handling
    let transporter
    try {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_PORT === '465' || !process.env.SMTP_PORT, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
        // Add debug logging
        logger: process.env.NODE_ENV === 'development',
        debug: process.env.NODE_ENV === 'development',
      })

      // Verify connection
      console.log('Verifying SMTP connection...')
      await transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (error) {
      console.error('SMTP connection error:', error)
      return NextResponse.json(
        {
          error: 'Failed to connect to email server',
          details: error.message,
        },
        { status: 500 },
      )
    }

    console.log('Attempting to send emails...')
    console.log(`FROM address: ${fromEmail}`)

    // Track results
    const results = {
      successful: [],
      failed: [],
    }

    // Send emails
    await Promise.all(
      recipients.map(async (recipient) => {
        try {
          // Validate recipient email
          if (!isValidEmail(recipient)) {
            throw new Error(`Invalid recipient email: ${recipient}`)
          }

          // Prepare email options
          const mailOptions = {
            from: formatEmailAddress(fromEmail, 'AIvalanche Contact Form'),
            to: recipient,
            subject: `AIvalanche: Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message: ${message}

--
This email was sent from the contact form at www.aivalanche.de
            `,
            html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .message { background-color: white; padding: 15px; border-left: 3px solid #0066cc; margin-top: 10px; }
    .footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${name}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="message">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      This email was sent from the contact form at www.aivalanche.de
    </div>
  </div>
</body>
</html>
            `,
            replyTo: email,
          }

          console.log(`Sending email to ${recipient}...`)
          const info = await transporter.sendMail(mailOptions)

          console.log(`✓ Email sent successfully to ${recipient}:`, info.messageId)
          results.successful.push(recipient)
        } catch (error) {
          console.error(`✗ Failed to send email to ${recipient}:`, error.message)
          results.failed.push({
            recipient,
            error: error.message,
            code: error.code,
          })
        }
      }),
    )

    // Log results
    console.log('Send results:', {
      successful: results.successful,
      failed: results.failed,
    })

    // Return appropriate response
    if (results.successful.length === 0) {
      return NextResponse.json(
        {
          error: 'Failed to send email to all recipients',
          details: results.failed,
          debug: {
            fromEmail: fromEmail,
            smtpHost: process.env.SMTP_HOST,
          },
        },
        { status: 500 },
      )
    } else if (results.failed.length > 0) {
      return NextResponse.json({
        message: 'Email sent to some recipients',
        details: {
          successful: results.successful,
          failed: results.failed,
        },
      })
    } else {
      return NextResponse.json({
        message: 'Email sent successfully',
        recipients: results.successful,
      })
    }
  } catch (error) {
    console.error('Critical error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    })

    return NextResponse.json(
      {
        error: 'Critical error in email sending',
        details: error.message,
        code: error.code,
      },
      { status: 500 },
    )
  }
}
