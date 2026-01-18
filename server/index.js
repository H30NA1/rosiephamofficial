import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import socialsRouter from './socials/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// SMTP Accounts

const accounts = [
    { user: process.env.SMTP_USER_1, pass: process.env.SMTP_PASS_1 },
    { user: process.env.SMTP_USER_2, pass: process.env.SMTP_PASS_2 },
    { user: process.env.SMTP_USER_3, pass: process.env.SMTP_PASS_3 },
    { user: process.env.SMTP_USER_4, pass: process.env.SMTP_PASS_4 },
    { user: process.env.SMTP_USER_5, pass: process.env.SMTP_PASS_5 },
].filter(acc => acc.user && acc.pass);

console.log(`Loaded ${accounts.length} SMTP accounts`);

// Health check
app.get('/', (req, res) => {
    res.send('Email Server is Running');
});

// Routes
console.log('Mounting socials router at /api/socials');
app.use('/api/socials', socialsRouter);
console.log('Socials router mounted successfully');

// Send Email Route
app.post('/api/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Load balancing: Randomly select an account
    const account = accounts[Math.floor(Math.random() * accounts.length)];

    if (!account) {
        return res.status(500).json({ error: 'No SMTP accounts configured' });
    }

    // Create Transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user,
            pass: account.pass, // Remove spaces just in case, though usually apps passwords have spaces which are ignored or needed. Gmail app passwords standardly display with spaces. Nodemailer usually handles spaces in pass strings fine, but let's be careful. Actually spaces in app passwords are often ignored by Google but let's keep them as is unless it fails.
        },
    });

    const mailOptions = {
        from: `"${name}" <${account.user}>`, // Sender address (must be the authenticated user for Gmail usually, or it will rewrite it)
        replyTo: email, // The user's email so Rosie can reply to them
        to: process.env.RECIPIENT_EMAIL, // Rosie's receiving email
        subject: `New Contact Form Submission from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
    `,
        html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
<hr/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s using account %s', info.messageId, account.user);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
