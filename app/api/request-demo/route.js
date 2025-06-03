import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { name, companyName, contactNumber, email, message } = await request.json()

        const recipients = [
            'edonderguti@aivalanche.de',
            'bano.andon@gmail.com',
            'gazmendalia@gmail.com'
        ]

        // Updated transporter configuration
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,  // e.g., 'smtp.gmail.com' for Gmail
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            // Remove the tls configuration unless specifically needed
        })

        // Verify the connection before sending
        await transporter.verify().catch(error => {
            console.error('SMTP Connection Error:', error);
            throw new Error('Failed to establish SMTP connection');
        });

        console.log('Attempting to send demo request emails...')

        const results = {
            successful: [],
            failed: []
        }

        await Promise.all(recipients.map(async (recipient) => {
            try {
                const info = await transporter.sendMail({
                    from: process.env.SMTP_USER, // Fixed: Use a valid email address without the display name format
                    to: recipient,
                    subject: `aivalanche: New Demo Request from ${name} at ${companyName}`,
                    text: `
Demo Request Details:
-------------------
Name: ${name}
Company: ${companyName}
Contact Number: ${contactNumber}
Email: ${email}
Message: ${message}
      `,
                    html: `
        <h2>New Demo Request</h2>
        <h3>Contact Information:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        
        <h3>Message:</h3>
        <p>${message}</p>
      `,
                    replyTo: email
                })

                console.log(`Demo request email sent successfully to ${recipient}:`, info)
                results.successful.push(recipient)
            } catch (error) {
                console.error(`Failed to send demo request email to ${recipient}:`, error)
                results.failed.push({
                    recipient,
                    error: error.message
                })
            }
        }))

        if (results.successful.length === 0) {
            return NextResponse.json(
                {
                    error: 'Failed to send demo request to all recipients',
                    details: results.failed
                },
                { status: 500 }
            )
        } else if (results.failed.length > 0) {
            return NextResponse.json({
                message: 'Demo request sent partially',
                details: {
                    successful: results.successful,
                    failed: results.failed
                }
            })
        } else {
            return NextResponse.json({
                message: 'Demo request sent successfully to all recipients',
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
                error: 'Critical error in sending demo request',
                details: error.message,
                code: error.code
            },
            { status: 500 }
        )
    }
}