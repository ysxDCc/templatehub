import { NextResponse } from 'next/server';
import { readTemplateHtml, watermarkPreview } from '@/lib/template-source';
import { SITE_URL } from '@/lib/site';

/** Public, watermarked preview of a template (used by the iframes across the site). */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const html = await readTemplateHtml(id);
  if (!html) {
    return new NextResponse('Template not found', { status: 404 });
  }
  return new NextResponse(watermarkPreview(html, id, SITE_URL), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
