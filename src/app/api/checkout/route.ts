import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';
import { pricingPlans, SINGLE_TEMPLATE_PRODUCT_ID } from '@/data/pricing';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, templateId, customerEmail, customerName } = body;

    let productId = '';
    let isSingle = false;

    if (planId === 'single' || planId === 'single-template') {
      productId = SINGLE_TEMPLATE_PRODUCT_ID;
      isSingle = true;
    } else {
      const plan = pricingPlans.find(p => p.id === planId);
      if (!plan || !plan.dodoProductId) {
        return NextResponse.json(
          { error: 'Invalid plan or product not found' },
          { status: 400 }
        );
      }
      productId = plan.dodoProductId;
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
      environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode') || 'live_mode',
    });

    const origin = req.headers.get('origin') || 'https://www.templatehub.website';

    const sessionPayload: any = {
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      allowed_payment_method_types: ['credit', 'debit', 'apple_pay', 'google_pay'],
      return_url: isSingle
        ? `${origin}/checkout/success?template=${templateId || ''}&type=single`
        : `${origin}/checkout/success?plan=${planId}`,
      metadata: {
        planId: isSingle ? 'single-template' : planId,
        ...(templateId ? { templateId } : {}),
      },
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
    const rawMsg = err?.message || '';
    let userMsg = rawMsg || 'Failed to create checkout session';

    if (rawMsg.includes('Live payments not enabled for merchant')) {
      userMsg = 'Live payments are pending merchant verification in your Dodo Payments dashboard. Complete your business compliance review to activate live billing, or switch to test mode.';
    }

    return NextResponse.json(
      { error: userMsg },
      { status: 500 }
    );
  }
}
