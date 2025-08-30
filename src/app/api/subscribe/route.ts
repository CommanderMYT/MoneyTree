import { NextRequest, NextResponse } from 'next/server';
import { saveUserData } from '../../../lib/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // For demo, save to Firestore; in production, integrate with Mailchimp or similar
    await saveUserData(email, 'subscription', { subscribed: true, date: new Date().toISOString() });

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
