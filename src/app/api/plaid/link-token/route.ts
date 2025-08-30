import { NextRequest, NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';

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
    const userId = body.userId || 'demo-user';

    const response = await client.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: 'MoneyTree',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    });

    return NextResponse.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    return NextResponse.json({ error: 'Failed to create link token' }, { status: 500 });
  }
}
