import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { Webhook } from 'standardwebhooks';
import { SINGLE_TEMPLATE_PRODUCT_ID } from '@/data/pricing';

const PRODUCT_TO_TIER: Record<string, string> = {
  // Live mode products
  'pdt_0NrADRDfp8T2zDVsEGRI1': 'basic',
  'pdt_0NrADRIRwLn8v87737eXX': 'pro',
  'pdt_0NrADRKsIRfzGl1RtXlG7': 'enterprise',
  // Test mode fallback
  'pdt_0NpgItSPPrLwWxL1VNu5h': 'basic',
  'pdt_0NpgIuba73JMfBWvtkFHg': 'pro',
  'pdt_0NpgIueDKNSywrCSEg3EN': 'enterprise',
};

/**
 * Verifies the Standard Webhooks signature Dodo Payments sends with every event.
 * Without this check anyone could POST a fake "subscription.active" event and
 * grant themselves a paid tier.
 */
function verifySignature(rawBody: string, req: Request): boolean {
  const secret = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  if (!secret) {
    console.error('[dodo webhook] DODO_PAYMENTS_WEBHOOK_KEY is not set — rejecting event.');
    return false;
  }
  try {
    new Webhook(secret).verify(rawBody, {
      'webhook-id': req.headers.get('webhook-id') ?? '',
      'webhook-signature': req.headers.get('webhook-signature') ?? '',
      'webhook-timestamp': req.headers.get('webhook-timestamp') ?? '',
    });
    return true;
  } catch (err) {
    console.warn('[dodo webhook] Invalid signature:', (err as Error).message);
    return false;
  }
}

export async function POST(req: Request) {
  const rawBody = await req.text();

  if (!verifySignature(rawBody, req)) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
  }

  let body: any;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const eventType: string = body.type || body.event_type;

  if (eventType === 'subscription.active' || eventType === 'payment.succeeded') {
    const payloadData = body.data || body;
    const customerEmail: string | undefined =
      payloadData?.customer?.email || payloadData?.email;
    const productId: string | undefined =
      payloadData?.product_id || payloadData?.items?.[0]?.product_id;
    const metadata = payloadData?.metadata || {};
    const purchasedTemplateId: string | undefined = metadata?.templateId;

    if (!customerEmail) {
      return NextResponse.json({ received: true });
    }

    const clerk = await clerkClient();
    const users = await clerk.users.getUserList({ emailAddress: [customerEmail] });

    if (users.data.length > 0) {
      const user = users.data[0];
      const userId = user.id;

      // Handle subscription tiers
      const tier = productId ? PRODUCT_TO_TIER[productId] : undefined;
      if (tier) {
        await clerk.users.updateUserMetadata(userId, {
          publicMetadata: {
            ...user.publicMetadata,
            subscription: tier,
          },
        });
      }

      // Handle single template purchase (one-time)
      if (productId === SINGLE_TEMPLATE_PRODUCT_ID || metadata?.planId === 'single-template') {
        const existingUnlocked = (user.publicMetadata?.unlockedTemplates as string[] | undefined) || [];
        const updatedUnlocked = purchasedTemplateId && !existingUnlocked.includes(purchasedTemplateId)
          ? [...existingUnlocked, purchasedTemplateId]
          : existingUnlocked;

        await clerk.users.updateUserMetadata(userId, {
          publicMetadata: {
            ...user.publicMetadata,
            unlockedTemplates: updatedUnlocked,
          },
        });
      }
    }
  }

  if (
    eventType === 'subscription.cancelled' ||
    eventType === 'subscription.expired' ||
    eventType === 'subscription.on_hold' ||
    eventType === 'subscription.failed'
  ) {
    const payloadData = body.data || body;
    const customerEmail: string | undefined =
      payloadData?.customer?.email || payloadData?.email;

    if (customerEmail) {
      const clerk = await clerkClient();
      const users = await clerk.users.getUserList({ emailAddress: [customerEmail] });
      if (users.data.length > 0) {
        await clerk.users.updateUserMetadata(users.data[0].id, {
          publicMetadata: {
            ...users.data[0].publicMetadata,
            subscription: 'free',
          },
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
