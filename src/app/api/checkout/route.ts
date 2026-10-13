import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';
import { pricingPlans } from '@/data/pricing';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, customerEmail, customerName } = body;

    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan || !plan.dodoProductId) {
      return NextResponse.json(
        { error: 'Invalid plan or product not found' },
        { status: 400 }
      );
    }

    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Dodo Payments API key is not configured' },
        { status: 500 }
      );
    }

    const client = new DodoPayments({
      bearerToken: apiKey,
      environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode') || 'test_mode',
    });

    const origin = req.headers.get('origin') || 'https://templatehub-gold.vercel.app';

    const sessionPayload: any = {
      product_cart: [
        {
          product_id: plan.dodoProductId,
          quantity: 1,
        },
      ],
      allowed_payment_method_types: ['credit', 'debit', 'apple_pay', 'google_pay'],
      return_url: `${origin}/checkout/success?plan=${plan.id}`,
    };

    if (customerEmail) {
      sessionPayload.customer = {
        email: customerEmail,
        ...(customerName ? { name: customerName } : {}),
      };
    }

    const session = await client.checkoutSessions.create(sessionPayload);

    return NextResponse.json({
      checkoutUrl: session.checkout_url,
      sessionId: session.session_id,
    });
  } catch (err: any) {
    console.error('Error creating Dodo checkout session:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
