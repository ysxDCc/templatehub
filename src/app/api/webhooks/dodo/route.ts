import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

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

export async function POST(req: Request) {
  const body = await req.json();

  const eventType: string = body.type || body.event_type;

  if (eventType === 'subscription.active' || eventType === 'payment.succeeded') {
    const metadata = body.data || body;
    const customerEmail: string | undefined =
      metadata?.customer?.email || metadata?.email;
    const productId: string | undefined =
      metadata?.product_id || metadata?.items?.[0]?.product_id;

    const tier = productId ? PRODUCT_TO_TIER[productId] : undefined;

    if (!tier || !customerEmail) {
      return NextResponse.json({ received: true });
    }

    const clerk = await clerkClient();
    const users = await clerk.users.getUserList({ emailAddress: [customerEmail] });

    if (users.data.length > 0) {
      const userId = users.data[0].id;
      await clerk.users.updateUserMetadata(userId, {
        publicMetadata: { subscription: tier },
      });
    }
  }

  return NextResponse.json({ received: true });
}
