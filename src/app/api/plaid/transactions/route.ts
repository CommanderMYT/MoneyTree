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
    const accessToken = body.access_token;

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1); // Last 6 months
    const endDate = now;

    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    });

    const transactions = response.data.transactions.map((t: any) => ({
      name: t.merchant_name || t.name || 'Unknown',
      amount: Math.abs(t.amount), // Assuming positive for bills
      date: t.date,
    }));

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
