import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { isCurrentUserAdmin, SUPERADMIN_EMAILS } from '@/lib/admin';

export async function GET() {
  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
  }

  try {
    const clerk = await clerkClient();
    const usersResponse = await clerk.users.getUserList({
      limit: 100,
      orderBy: '-created_at',
    });

    const users = usersResponse.data.map((u) => {
      const email = u.emailAddresses[0]?.emailAddress || '';
      const isSuperadmin = SUPERADMIN_EMAILS.includes(email.toLowerCase());
      const role = (u.publicMetadata?.role as string) || (isSuperadmin ? 'admin' : 'user');
      const subscription = (u.publicMetadata?.subscription as string) || 'free';
      const name =
        u.fullName ||
        `${u.firstName || ''} ${u.lastName || ''}`.trim() ||
        u.username ||
        email.split('@')[0];

      return {
        id: u.id,
        email,
        name,
        imageUrl: u.imageUrl,
        createdAt: u.createdAt,
        lastSignInAt: u.lastSignInAt,
        role,
        subscription,
        isSuperadmin,
        unlockedTemplates: (u.publicMetadata?.unlockedTemplates as string[]) || [],
      };
    });

    return NextResponse.json({ users });
  } catch (err: any) {
    console.error('Failed to list users:', err);
    return NextResponse.json({ error: err?.message || 'Failed to fetch users' }, { status: 500 });
  }
}
