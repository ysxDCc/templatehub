import { auth, clerkClient } from '@clerk/nextjs/server';

export const SUPERADMIN_EMAILS = [
  'leogregus9@gmail.com',
  ...(process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase())
    : []),
];

export async function isCurrentUserAdmin(): Promise<boolean> {
  try {
    const { userId } = await auth();
    if (!userId) return false;

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    if (!user) return false;

    const email = user.emailAddresses[0]?.emailAddress?.toLowerCase();
    return email === 'leogregus9@gmail.com' || (email ? SUPERADMIN_EMAILS.includes(email) : false);
  } catch (err) {
    console.error('Error checking admin status:', err);
    return false;
  }
}
