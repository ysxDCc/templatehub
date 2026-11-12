import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { canAccessTemplate, getEntitlement } from '@/lib/entitlement';
import { findTemplate, readTemplateHtml } from '@/lib/template-source';

/**
 * Clean (un-watermarked) template source for members whose plan covers it.
 * ?id=<template>  — returns text/html
 * &download=1     — sends it as a file download
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const template = findTemplate(searchParams.get('id'));
  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Please sign in', requiresAuth: true }, { status: 401 });
  }

  const ent = await getEntitlement(userId);
  if (!canAccessTemplate(ent, template)) {
    return NextResponse.json(
      { error: 'Your plan does not include this template', requiresUpgrade: true, requiredTier: template.tier },
      { status: 403 }
    );
  }

  const html = await readTemplateHtml(template.id);
  if (!html) {
    return NextResponse.json({ error: 'Template file missing' }, { status: 500 });
  }

  const headers: Record<string, string> = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex',
  };
  if (searchParams.get('download') === '1') {
    headers['Content-Disposition'] = `attachment; filename="${template.id}.html"`;
  }
  return new NextResponse(html, { headers });
}
