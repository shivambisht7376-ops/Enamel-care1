// Vercel Serverless Function
// Note: This requires 'nodemailer' to be installed: npm install nodemailer
import type { VercelRequest, VercelResponse } from '@vercel/node';
// import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, date, department } = req.body;

  if (!email || !name || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log(`Sending confirmation email to ${email} for appointment on ${date}`);

  /* 
  // IMPLEMENTATION EXAMPLE WITH NODEMAILER:
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"LifeTime Smiles Clinic" <no-reply@lifetimesmiles.com>',
      to: email,
      subject: 'Appointment Confirmation - LifeTime Smiles Clinic',
      html: `
        <h1>Appointment Confirmed!</h1>
        <p>Hello ${name},</p>
        <p>Your dental appointment at <strong>LifeTime Smiles Clinic</strong> has been successfully booked for <strong>${date}</strong>.</p>
        <p>Department: ${department}</p>
        <p>Our team will contact you shortly to confirm the exact time.</p>
        <br/>
        <p>Best regards,<br/>LifeTime Smiles Team</p>
      `,
    });
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
  */

  // Mock success for now
  return res.status(200).json({ message: 'Email request received (Mock)' });
}
