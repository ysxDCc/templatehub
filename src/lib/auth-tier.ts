import type { SubscriptionTier } from '@/types';

export const TIER_ORDER: Record<SubscriptionTier, number> = {
  free: 0,
  basic: 1,
  pro: 2,
  enterprise: 3,
};

/**
 * Checks whether the user's current subscription tier is equal to or higher than
 * the required tier for a template or protected feature.
 */
export function hasTierAccess(
  userTier: SubscriptionTier | undefined,
  requiredTier: SubscriptionTier
): boolean {
  const current = TIER_ORDER[userTier ?? 'free'] ?? 0;
  const needed = TIER_ORDER[requiredTier] ?? 0;
  return current >= needed;
}
