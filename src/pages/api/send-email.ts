import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, organization, specialty, challenge, demoType, preferredDate, preferredTime } = req.body;

  // Basic server-side validation
  if (!name || !email || !phone || !organization) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create a transporter
  // NOTE: In a real production app, use environment variables for these values.
  // For now, we'll set up the structure.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'ganeshkarthik18697@gmail.com',
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Winspire Demo" <ganeshkarthik18697@gmail.com>',
      to: process.env.SMTP_TO || 'ganeshkarthik18697@gmail.com', // Where the demo request goes
      subject: `New Demo Request from ${name}`,
      text: `
                New Demo Request:
                
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Organization: ${organization}
                Specialty: ${specialty}
                Challenge: ${challenge}
                Demo Type: ${demoType}
                Preferred Date: ${preferredDate}
                Preferred Time: ${preferredTime}
            `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Demo Enquiry</title>
</head>

<body style="margin:0; padding:0; background:#edf3f8; font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#edf3f8">
  <tr>
    <td align="center" style="padding:32px 16px;">

      <!-- Main Card -->
      <table width="680" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
             style="border-radius:12px; overflow:hidden; box-shadow:0 12px 35px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="padding:22px 28px;
                     background:linear-gradient(135deg,#4facfe,#00c6ff);">
            <table width="100%">
              <tr>
                <td>
                  <h2 style="margin:0; font-size:20px; color:#ffffff; font-weight:600;">
                    New Demo Enquiry Received
                  </h2>
                  <p style="margin:6px 0 0; font-size:13px; color:#eaf7ff;">
                    Internal notification · Action required
                  </p>
                </td>
                <td align="right" style="font-size:12px; color:#eaf7ff;">
                  ${new Date().toLocaleString()}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:26px 28px; color:#1f2937;">

            <!-- Section Title -->
            <p style="margin:0 0 14px; font-size:14px; font-weight:600; color:#2563eb;">
              Enquiry Details
            </p>

            <!-- Details Table -->
            <table width="100%" cellpadding="10" cellspacing="0"
                   style="border-collapse:collapse; font-size:14px;">

              <tr style="border-bottom:1px solid #e5e7eb;">
                <td width="32%" style="color:#6b7280;">Full Name</td>
                <td>${name}</td>
              </tr>

              <tr style="border-bottom:1px solid #e5e7eb; background:#f8fafc;">
                <td style="color:#6b7280;">Email Address</td>
                <td>${email}</td>
              </tr>

              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="color:#6b7280;">Phone Number</td>
                <td>${phone}</td>
              </tr>

              <tr style="border-bottom:1px solid #e5e7eb; background:#f8fafc;">
                <td style="color:#6b7280;">Organization</td>
                <td>${organization}</td>
              </tr>

              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="color:#6b7280;">Specialty</td>
                <td>${specialty}</td>
              </tr>

              <tr style="border-bottom:1px solid #e5e7eb; background:#f8fafc;">
                <td style="color:#6b7280;">RCM Challenge</td>
                <td>${challenge}</td>
              </tr>

              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="color:#6b7280;">Demo Type</td>
                <td>${demoType}</td>
              </tr>

              <tr style="border-bottom:1px solid #e5e7eb; background:#f8fafc;">
                <td style="color:#6b7280;">Preferred Date</td>
                <td>${preferredDate}</td>
              </tr>

              <tr>
                <td style="color:#6b7280;">Preferred Time</td>
                <td>${preferredTime}</td>
              </tr>

            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:14px 28px;
                     background:#f1f5f9;
                     font-size:12px;
                     color:#64748b;">
            This is an automated internal notification.  
            Please follow up with the prospect at the earliest.
          </td>
        </tr>

      </table>
      <!-- End Card -->

    </td>
  </tr>
</table>

</body>
</html>
            `,
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Winspire Team" <ganeshkarthik18697@gmail.com>',
      to: email, // Send to the user who filled the form
      subject: 'Thank you for contacting Winspire',
      text: `Hi ${name},\n\nThank you for reaching out to Winspire. We have received your demo request and will be in touch shortly.\n\nBest regards,\nThe Winspire Team`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Thank You</title>
</head>
<body style="margin:0; padding:0; background:#f8fafc; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding:40px; text-align:center;">
              <h2 style="margin:0 0 16px; color:#1e293b; font-size:24px;">Thank You!</h2>
              <p style="margin:0 0 24px; color:#64748b; font-size:16px; line-height:1.6;">
                Hi ${name},<br><br>
                Thank you for booking a demo with Winspire. We have received your request and our team will be in touch shortly to confirm the details.
              </p>
              <div style="height:1px; background:#e2e8f0; margin:30px 0;"></div>
              <p style="margin:0; color:#94a3b8; font-size:14px;">
                Best regards,<br>The Winspire Team
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error: (error as Error).message });
  }
}
