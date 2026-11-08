import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { isCurrentUserAdmin, SUPERADMIN_EMAILS } from '@/lib/admin';

export async function POST(req: Request) {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { userId, email, role, subscription } = body;

    if (!userId && !email) {
      return NextResponse.json({ error: 'Missing userId or email' }, { status: 400 });
    }

    const clerk = await clerkClient();
    let targetUser: any = null;

    if (userId) {
      targetUser = await clerk.users.getUser(userId);
    } else if (email) {
      const searchRes = await clerk.users.getUserList({ emailAddress: [email.trim()] });
      if (searchRes.data.length > 0) {
        targetUser = searchRes.data[0];
      }
    }

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const targetEmail = targetUser.emailAddresses[0]?.emailAddress?.toLowerCase() || '';

    // Prevent demoting the primary superadmin
    if (SUPERADMIN_EMAILS.includes(targetEmail) && role && role !== 'admin') {
      return NextResponse.json(
        { error: 'Cannot remove admin privileges from the root owner account' },
        { status: 400 }
      );
    }

    const currentMeta = targetUser.publicMetadata || {};
    const updatedMeta: Record<string, any> = {
      ...currentMeta,
    };

    if (role !== undefined) {
      updatedMeta.role = role;
    }
    if (subscription !== undefined) {
      updatedMeta.subscription = subscription;
    }

    const updatedUser = await clerk.users.updateUserMetadata(targetUser.id, {
      publicMetadata: updatedMeta,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.emailAddresses[0]?.emailAddress,
        role: updatedUser.publicMetadata?.role,
        subscription: updatedUser.publicMetadata?.subscription,
      },
    });
  } catch (err: any) {
    console.error('Failed to update user role/plan:', err);
    return NextResponse.json({ error: err?.message || 'Update failed' }, { status: 500 });
  }
}
