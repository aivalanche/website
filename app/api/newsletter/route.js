// app/api/newsletter/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { email } = await request.json()

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

        console.log('Attempting to send newsletter subscription notification...')

        const results = {
            successful: [],
            failed: []
        }

        await Promise.all(recipients.map(async (recipient) => {
            try {
                const info = await transporter.sendMail({
                    from: `"Newsletter Subscription" <edonderguti@gmail.com>`,
                    to: recipient,
                    subject: `New Newsletter Subscription`,
                    text: `
New newsletter subscription:
Email: ${email}
                    `,
                    html: `
                        <h3>New Newsletter Subscription</h3>
                        <p><strong>Email:</strong> ${email}</p>
                    `,
                    replyTo: email
                })

                console.log(`Notification sent successfully to ${recipient}:`, info)
                results.successful.push(recipient)
            } catch (error) {
                console.error(`Failed to send notification to ${recipient}:`, error)
                results.failed.push({
                    recipient,
                    error: error.message
                })
            }
        }))

        if (results.successful.length === 0) {
            return NextResponse.json(
                {
                    error: 'Failed to process subscription',
                    details: results.failed
                },
                { status: 500 }
            )
        }

        return NextResponse.json({
            message: 'Newsletter subscription processed successfully',
            details: {
                successful: results.successful,
                failed: results.failed
            }
        })

    } catch (error) {
        console.error('Critical error:', error)
        return NextResponse.json(
            {
                error: 'Failed to process subscription',
                details: error.message
            },
            { status: 500 }
        )
    }
}