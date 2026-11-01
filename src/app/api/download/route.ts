import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { templates } from '@/data/templates';
import type { SubscriptionTier } from '@/types';

const TIER_ORDER: Record<SubscriptionTier, number> = {
  free: 0,
  basic: 1,
  pro: 2,
  enterprise: 3,
};

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'Please sign in to download templates', requiresAuth: true },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const templateId = searchParams.get('templateId');

  if (!templateId) {
    return NextResponse.json({ error: 'Missing templateId parameter' }, { status: 400 });
  }

  const template = templates.find((t) => t.id === templateId);
  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  // Fetch the full user object to read publicMetadata
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const userSubscription = (user.publicMetadata?.subscription as SubscriptionTier | undefined) ?? 'free';

  const userTierLevel = TIER_ORDER[userSubscription] ?? 0;
  const requiredTierLevel = TIER_ORDER[template.tier];

  if (userTierLevel < requiredTierLevel) {
    return NextResponse.json(
      {
        error: `Upgrade your plan to download this template`,
        requiresUpgrade: true,
        requiredTier: template.tier,
      },
      { status: 403 }
    );
  }

  // Sufficient tier — return the download URL
  return NextResponse.json({
    downloadUrl: `/templates/${templateId}/index.html`,
    templateName: template.name,
  });
}
