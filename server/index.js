const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'jayjobanputra007@gmail.com';

app.use(cors({ origin: true }));
app.use(express.json({ limit: '100kb' }));

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const createTransporter = () => {
  const user = process.env.GMAIL_USER || CONTACT_EMAIL;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!pass) {
    throw new Error(
      'Missing GMAIL_APP_PASSWORD. Create a Gmail App Password and add it to server/.env'
    );
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass: pass.replace(/\s+/g, ''),
    },
  });
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'portfolio-contact-api' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    if (!isValidEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (
      name.length > 120 ||
      email.length > 160 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: 'One or more fields are too long.',
      });
    }

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER || CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `Portfolio Contact: ${subject.trim()}`,
      text: [
        `New message from your portfolio contact form`,
        '',
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Subject: ${subject.trim()}`,
        '',
        'Message:',
        message.trim(),
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
          <h2 style="margin-bottom: 8px;">New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
          <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject.trim())}</p>
          <hr />
          <p style="white-space: pre-wrap;">${escapeHtml(message.trim())}</p>
        </div>
      `,
    });

    return res.json({
      success: true,
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again later.',
    });
  }
});

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
});
