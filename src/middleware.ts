import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const REF_COOKIE = 'th_ref';
const REF_MAX_AGE = 60 * 60 * 24 * 60; // 60 days, first click wins

export default clerkMiddleware((_auth, req) => {
  // Partner links look like https://www.templatehub.website/?ref=abc123.
  // Remember the code so checkout can attribute the sale to the partner.
  const ref = req.nextUrl.searchParams.get('ref');
  if (ref && /^[A-Za-z0-9_-]{2,40}$/.test(ref) && !req.cookies.get(REF_COOKIE)) {
    const res = NextResponse.next();
    res.cookies.set(REF_COOKIE, ref, {
      maxAge: REF_MAX_AGE,
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
    });
    return res;
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
