import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Welcome to MoneyTree!',
      text: `Hi ${name || 'there'},

Welcome to MoneyTree! We're excited to help you manage your finances.

Start by linking your accounts and setting goals.

Best,
The MoneyTree Team`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Welcome email sent' });
  } catch (error) {
    console.error('Welcome email error:', error);
    return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 });
  }
}
