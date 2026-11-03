import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import fs from 'fs';
import path from 'path';
import { templates } from '@/data/templates';
import type { SubscriptionTier } from '@/types';
import { createZipArchive, ZipFileEntry } from '@/lib/zip';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Please sign in to access the Agency Master Archive', requiresAuth: true },
        { status: 401 }
      );
    }

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const userSubscription = (user.publicMetadata?.subscription as SubscriptionTier | undefined) ?? 'free';

    // Restricted to Pro and Enterprise subscribers
    if (userSubscription !== 'pro' && userSubscription !== 'enterprise') {
      return NextResponse.json(
        {
          error: `The Complete ${templates.length}-Template Master Pack is an exclusive benefit for Pro & Enterprise members.`,
          requiresUpgrade: true,
          currentTier: userSubscription,
        },
        { status: 403 }
      );
    }

    const sandboxesDir = path.join(process.cwd(), 'public', 'sandboxes');
    const zipEntries: ZipFileEntry[] = [];

    // Collect all template HTML files categorized by folder
    for (const t of templates) {
      const htmlPath = path.join(sandboxesDir, t.id, 'index.html');
      let htmlContent = '';
      if (fs.existsSync(htmlPath)) {
        htmlContent = fs.readFileSync(htmlPath, 'utf8');
      } else {
        htmlContent = `<!DOCTYPE html><html><body><h1>${t.name}</h1><p>${t.description}</p></body></html>`;
      }

      // Add to zip under category folder
      zipEntries.push({
        path: `${t.category}/${t.id}/index.html`,
        content: htmlContent,
      });

      // Individual readme per template
      zipEntries.push({
        path: `${t.category}/${t.id}/README.md`,
        content: `# ${t.name}
${t.description}

- Tier: ${t.tier.toUpperCase()}
- Category: ${t.category}
- Accessibility Rating: ${t.accessibilityScore || 'AA'}
- Commercial Agency License: ACTIVE
`,
      });
    }

    // Master Catalog Metadata
    zipEntries.push({
      path: 'master-catalog.json',
      content: JSON.stringify(
        {
          packName: 'TemplateHub Sovereign Agency Master Archive',
          totalTemplates: templates.length,
          exportedAt: new Date().toISOString(),
          subscriberEmail: user.emailAddresses[0]?.emailAddress,
          tier: userSubscription,
          templates: templates.map((t) => ({
            id: t.id,
            name: t.name,
            category: t.category,
            tier: t.tier,
            tags: t.tags,
            features: t.features,
          })),
        },
        null,
        2
      ),
    });

    // Master Readme
    zipEntries.push({
      path: 'README.md',
      content: `# TemplateHub Sovereign Agency Master Archive
${templates.length} Zero-Dependency Production Web Templates

Thank you for being a ${userSubscription.toUpperCase()} subscriber!

## Structure
All ${templates.length} templates are categorized into folders matching their industry:
- /saas/
- /ecommerce/
- /portfolios/
- /crypto/
- /luxury/
- /aerospace/
- ...and 40+ more

## Deploying
Each template contains a standalone index.html. You can deploy directly to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or AWS S3 with zero build steps.
`,
    });

    // Master Agency License
    zipEntries.push({
      path: 'AGENCY-COMMERCIAL-LICENSE.txt',
      content: `TemplateHub Agency Commercial License
====================================
Issued To: ${user.emailAddresses[0]?.emailAddress || 'Pro/Enterprise Subscriber'}
Tier: ${userSubscription.toUpperCase()}
Date: ${new Date().toISOString().split('T')[0]}

GRANT OF RIGHTS:
You are granted a non-exclusive, worldwide, perpetual commercial license to:
1. Deploy these templates for unlimited commercial client projects.
2. Customize, rebrand, re-style, and modify all source code.
3. Bundle these templates into proprietary SaaS applications or services.

RESTRICTION:
You may not resell or redistribute these templates as standalone marketplace items in direct competition with TemplateHub.
`,
    });

    const zipBuffer = createZipArchive(zipEntries);

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="TemplateHub-${templates.length}-Master-Agency-Bundle.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });
  } catch (err: any) {
    console.error('Master bundle export error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to assemble master archive' },
      { status: 500 }
    );
  }
}
