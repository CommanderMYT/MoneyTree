import { NextRequest, NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || '5d93d129ecc406e881568bab',
      'PLAID-SECRET': process.env.PLAID_SECRET || 'sandbox-secret',
    },
  },
});

const client = new PlaidApi(configuration);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const publicToken = body.public_token;

    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // In a real app, store accessToken and itemId securely (e.g., in DB)
    // For demo, we'll store in localStorage via response

    return NextResponse.json({ access_token: accessToken, item_id: itemId });
  } catch (error) {
    console.error('Error exchanging public token:', error);
    return NextResponse.json({ error: 'Failed to exchange token' }, { status: 500 });
  }
}
