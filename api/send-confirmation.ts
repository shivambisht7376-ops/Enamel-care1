import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// User should add RESEND_API_KEY to their Vercel environment variables
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, date, department } = req.body;

  if (!email || !name || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'LifeTime Smiles Clinic <appointments@resend.dev>', // Change to your verified domain later
      to: [email],
      subject: 'Appointment Confirmed - LifeTime Smiles Clinic',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 12px;">
          <h2 style="color: #0ea5e9;">Appointment Confirmed!</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>Your dental appointment at <strong>LifeTime Smiles Clinic</strong> has been successfully booked.</p>
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 5px 0;"><strong>Department:</strong> ${department}</p>
          </div>
          <p>Our team will contact you shortly to confirm the exact time and specialist.</p>
          <p>If you need to reschedule, please call us at 8851865995.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">© ${new Date().getFullYear()} LifeTime Smiles Clinic. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
