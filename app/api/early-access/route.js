import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { email, productId } = await request.json()

    // Same recipients as in request-demo
    const recipients = ['edonderguti@aivalanche.de', 'gazmendalia@gmail.com']

    // Updated transporter configuration - same as in request-demo
    const transporter = nodemailer.createTransport({
      host: `email-smtp.eu-west-1.amazonaws.com`,
      port: 465,
      secure: true,
      auth: {
        user: `AKIAQEXMU5TZHWZSP4VW`,
        pass: `BOSB4OTy0t7tpCnxUJazydSTN/dWg95LKDVRJjOzvKyp`,
      },
    })

    // Verify the connection before sending
    await transporter.verify().catch((error) => {
      console.error('SMTP Connection Error:', error)
      throw new Error('Failed to establish SMTP connection')
    })

    console.log('Attempting to send early access emails...')

    const results = {
      successful: [],
      failed: [],
    }

    // Get product name from productId
    let productName = 'LabFlow'
    if (productId === 'inverse-optical-design') {
      productName = 'OpticFlow'
    } else if (productId === 'bsim4-optimizer') {
      productName = 'Sfera'
    }

    await Promise.all(
      recipients.map(async (recipient) => {
        try {
          const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: recipient,
            subject: `${email} - Early Access Request for ${productName}`,
            text: `
Early Access Request Details:
----------------------------
Email: ${email}
Product: ${productName} (${productId})
                    `,
            html: `
        <h2>New Early Access Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${productName} (${productId})</p>
                    `,
            replyTo: email,
          })

          console.log(`Early access email sent successfully to ${recipient}:`, info)
          results.successful.push(recipient)
        } catch (error) {
          console.error(`Failed to send early access email to ${recipient}:`, error)
          results.failed.push({
            recipient,
            error: error.message,
          })
        }
      }),
    )

    if (results.successful.length === 0) {
      return NextResponse.json(
        {
          error: 'Failed to send early access request to all recipients',
          details: results.failed,
        },
        { status: 500 },
      )
    } else if (results.failed.length > 0) {
      return NextResponse.json({
        message: 'Early access request sent partially',
        details: {
          successful: results.successful,
          failed: results.failed,
        },
      })
    } else {
      return NextResponse.json({
        message: 'Early access request sent successfully to all recipients',
        recipients: results.successful,
      })
    }
  } catch (error) {
    console.error('Critical error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack,
    })

    return NextResponse.json(
      {
        error: 'Critical error in sending early access request',
        details: error.message,
        code: error.code,
      },
      { status: 500 },
    )
  }
}
