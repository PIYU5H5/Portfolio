import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message, honeypot } = req.body || {}

    // Honeypot bot protection
    if (honeypot) {
      return res.status(200).json({ success: true })
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Please provide name, email, and message.' })
    }

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, '') // remove spaces from Google app password
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10)

    if (!smtpUser || !smtpPass) {
      console.error('SMTP configuration missing: SMTP_USER or SMTP_PASS not set.')
      return res.status(500).json({
        error: 'Mail service is not configured on the server. Please email directly at piyushjadhavyt@gmail.com',
      })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const safeName = String(name).slice(0, 100)
    const safeEmail = String(email).slice(0, 150)
    const safeMessage = String(message).slice(0, 5000)

    await transporter.sendMail({
      from: `"${safeName} (via Portfolio)" <${smtpUser}>`,
      to: smtpUser,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `🚀 [Portfolio] Message from ${safeName} (${safeEmail})`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #2563eb; margin-top: 0; font-size: 20px;">New Message from Portfolio Website</h2>
          <p style="font-size: 14px; color: #475569; margin-bottom: 20px;">You received a new inquiry through your Visual Studio Code developer portfolio.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <div style="margin-bottom: 12px;">
            <strong style="color: #0f172a; font-size: 14px;">Sender:</strong>
            <span style="color: #334155; font-size: 14px; margin-left: 8px;">${safeName}</span>
          </div>
          <div style="margin-bottom: 16px;">
            <strong style="color: #0f172a; font-size: 14px;">Email:</strong>
            <a href="mailto:${safeEmail}" style="color: #2563eb; font-size: 14px; margin-left: 8px; text-decoration: none;">${safeEmail}</a>
          </div>
          <div style="margin-top: 20px;">
            <strong style="color: #0f172a; font-size: 14px;">Message:</strong>
            <div style="margin-top: 8px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</div>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px;" />
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">Hit "Reply" in your email client to respond directly to ${safeEmail}.</p>
        </div>
      `,
    })

    return res.status(200).json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error sending email via SMTP:', error)
    return res.status(500).json({
      error: error.message || 'Failed to dispatch email. Please email directly.',
    })
  }
}

