import { clerkClient } from '@clerk/nextjs/server';
import DodoPayments from 'dodopayments';
import { PRODUCT_TO_TIER } from '@/data/pricing';
import { TIER_ORDER } from '@/lib/auth-tier';
import type { SubscriptionTier, Template } from '@/types';

export interface Entitlement {
  tier: SubscriptionTier;
  unlockedTemplates: string[];
}

/**
 * Reads the user's plan from Clerk. If Clerk still says "free" (e.g. a webhook
 * was missed), checks Dodo Payments for an active subscription and repairs it.
 */
export async function getEntitlement(userId: string): Promise<Entitlement> {
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  let tier = (user.publicMetadata?.subscription as SubscriptionTier | undefined) ?? 'free';
  const unlockedTemplates = (user.publicMetadata?.unlockedTemplates as string[] | undefined) ?? [];

  if (tier === 'free') {
    const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    if (email && apiKey) {
      try {
        const dodo = new DodoPayments({
          bearerToken: apiKey,
          environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode') || 'live_mode',
        });
        let scanned = 0;
        for await (const sub of dodo.subscriptions.list({ status: 'active' })) {
          if (++scanned > 1000) break; // safety cap
          const s = sub as { customer?: { email?: string }; product_id?: string };
          if (s.customer?.email?.toLowerCase() !== email) continue;
          const found = s.product_id ? (PRODUCT_TO_TIER[s.product_id] as SubscriptionTier | undefined) : undefined;
          if (found && TIER_ORDER[found] > TIER_ORDER[tier]) tier = found;
        }
        if (tier !== 'free') {
          await clerk.users.updateUserMetadata(userId, {
            publicMetadata: { ...user.publicMetadata, subscription: tier },
          });
        }
      } catch (err) {
        console.error('[entitlement] Dodo fallback check failed:', err);
      }
    }
  }

  return { tier, unlockedTemplates };
}

export function canAccessTemplate(ent: Entitlement, template: Template): boolean {
  return TIER_ORDER[ent.tier] >= TIER_ORDER[template.tier] || ent.unlockedTemplates.includes(template.id);
}
