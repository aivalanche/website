// app/api/contact/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { name, email, message } = await request.json()

        // Array of recipients
        const recipients = [
            'edonderguti@aivalanche.de',
            'bano.andon@gmail.com',
            'gazmendalia@gmail.com'
        ]

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        })

        console.log('Attempting to send emails individually...')

        // Track successful and failed sends
        const results = {
            successful: [],
            failed: []
        }

        // Send emails individually
        await Promise.all(recipients.map(async (recipient) => {
            try {
                const info = await transporter.sendMail({
                    from: `"Contact Form" <edonderguti@gmail.com>`,
                    to: recipient,
                    subject: `aivalanche: Contact Form Submission from ${name}`,
                    text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
                    html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
                    replyTo: email
                })

                console.log(`Email sent successfully to ${recipient}:`, info)
                results.successful.push(recipient)
            } catch (error) {
                console.error(`Failed to send email to ${recipient}:`, error)
                results.failed.push({
                    recipient,
                    error: error.message
                })
            }
        }))

        // Log overall results
        console.log('Send results:', {
            successful: results.successful,
            failed: results.failed
        })

        // Determine response based on results
        if (results.successful.length === 0) {
            // If all sends failed
            return NextResponse.json(
                {
                    error: 'Failed to send email to all recipients',
                    details: results.failed
                },
                { status: 500 }
            )
        } else if (results.failed.length > 0) {
            // If some sends failed but others succeeded
            return NextResponse.json({
                message: 'Email sent partially',
                details: {
                    successful: results.successful,
                    failed: results.failed
                }
            })
        } else {
            // If all sends succeeded
            return NextResponse.json({
                message: 'Email sent successfully to all recipients',
                recipients: results.successful
            })
        }

    } catch (error) {
        console.error('Critical error:', {
            name: error.name,
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack
        })

        return NextResponse.json(
            {
                error: 'Critical error in email sending',
                details: error.message,
                code: error.code
            },
            { status: 500 }
        )
    }
}