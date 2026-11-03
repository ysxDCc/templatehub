import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getReviewsForTemplate, addReviewForTemplate } from '@/data/reviews';
import type { SubscriptionTier } from '@/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const templateId = searchParams.get('templateId');

  if (!templateId) {
    return NextResponse.json({ error: 'Missing templateId parameter' }, { status: 400 });
  }

  const reviews = getReviewsForTemplate(templateId);
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'You must be signed in to submit a review', requiresAuth: true },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { templateId, rating, title, comment } = body;

    if (!templateId || !rating || !title || !comment) {
      return NextResponse.json(
        { error: 'All fields (templateId, rating, title, comment) are required' },
        { status: 400 }
      );
    }

    // Determine verified buyer status from user metadata
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const userTier = (user.publicMetadata?.subscription as SubscriptionTier | undefined) ?? 'free';
    const isVerified = userTier !== 'free' || !!user.publicMetadata?.hasPurchased;

    const authorName = user.firstName
      ? `${user.firstName} ${user.lastName ? user.lastName[0] + '.' : ''}`.trim()
      : user.emailAddresses[0]?.emailAddress?.split('@')[0] || 'Verified Customer';

    const authorRole = userTier !== 'free'
      ? `${userTier.toUpperCase()} Subscriber`
      : 'Verified User';

    const newReview = addReviewForTemplate(templateId, {
      templateId,
      authorName,
      authorRole,
      authorAvatar: user.imageUrl,
      rating: Math.max(1, Math.min(5, Number(rating))),
      title,
      comment,
      verifiedBuyer: isVerified,
    });

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (err: any) {
    console.error('Error submitting review:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}
