import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import DodoPayments from 'dodopayments';
import { templates } from '@/data/templates';
import type { SubscriptionTier } from '@/types';
import { createZipArchive } from '@/lib/zip';

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
  const format = searchParams.get('format') || 'html';

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
  let userSubscription = (user.publicMetadata?.subscription as SubscriptionTier | undefined) ?? 'free';
  const unlockedTemplates = (user.publicMetadata?.unlockedTemplates as string[] | undefined) ?? [];

  // Self-healing fallback: If metadata still shows 'free', check Dodo Payments live API for active subscription
  if (userSubscription === 'free') {
    const email = user.emailAddresses?.[0]?.emailAddress;
    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    if (email && apiKey) {
      try {
        const dodo = new DodoPayments({
          bearerToken: apiKey,
          environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as any) || 'live_mode',
        });
        const subs = await dodo.subscriptions.list({ status: 'active' });
        const activeSub = subs.items?.find(
          (s: any) => s.customer?.email?.toLowerCase() === email.toLowerCase()
        );
        if (activeSub) {
          userSubscription = 'pro';
          // Sync to Clerk database in background so future requests are instantaneous
          await clerk.users.updateUserMetadata(userId, {
            publicMetadata: {
              ...user.publicMetadata,
              subscription: 'pro',
            },
          });
        }
      } catch (err) {
        console.error('Dodo auto-sync check fallback error:', err);
      }
    }
  }

  const userTierLevel = TIER_ORDER[userSubscription] ?? 0;
  const requiredTierLevel = TIER_ORDER[template.tier];
  const isSingleUnlocked = unlockedTemplates.includes(templateId);

  if (userTierLevel < requiredTierLevel && !isSingleUnlocked) {
    return NextResponse.json(
      {
        error: `Upgrade your plan or buy this template individually to download`,
        requiresUpgrade: true,
        requiredTier: template.tier,
      },
      { status: 403 }
    );
  }

  // If ZIP bundle format requested, assemble and stream zip
  if (format === 'zip') {
    const templateFilePath = path.join(
      process.cwd(),
      'public',
      'sandboxes',
      templateId,
      'index.html'
    );

    let htmlContent = '';
    if (fs.existsSync(templateFilePath)) {
      htmlContent = fs.readFileSync(templateFilePath, 'utf8');
    } else {
      htmlContent = `<!DOCTYPE html><html><body><h1>${template.name}</h1></body></html>`;
    }

    const readmeContent = `# ${template.name}
${template.description}

## Included with TemplateHub License
- Tier: ${template.tier.toUpperCase()}
- Category: ${template.category}
- Accessibility Rating: ${template.accessibilityScore || 'AA'}
- Rating: ${template.rating} / 5.0

## Quickstart
1. Open \`index.html\` directly in any modern web browser.
2. Or run a local preview server:
   \`\`\`bash
   npx serve .
   \`\`\`

## Customization
- Embedded CSS variables can be modified directly inside the \`<style>\` block in \`index.html\`.
- All Google Fonts and icons are preloaded and responsive.

## License
Licensed under TemplateHub Single Product & Commercial License.
`;

    const themeConfig = JSON.stringify(
      {
        name: template.name,
        slug: template.id,
        category: template.category,
        tier: template.tier,
        tags: template.tags,
        features: template.features,
        version: '1.0.0',
        author: 'TemplateHub Master Atelier',
      },
      null,
      2
    );

    const packageJson = JSON.stringify(
      {
        name: `${template.id}-template`,
        version: '1.0.0',
        private: true,
        scripts: {
          start: 'npx serve .',
        },
      },
      null,
      2
    );

    const licenseContent = `TemplateHub Commercial License
================================

Copyright (c) 2026 TemplateHub. All rights reserved.

Permission is hereby granted to the subscriber to use, customize, and deploy
this template for personal and commercial websites, client deliverables, and SaaS applications.

Redistribution or resale of the raw template source code as a competing marketplace item
is strictly prohibited.
`;

    const zipBuffer = createZipArchive([
      { path: 'index.html', content: htmlContent },
      { path: 'README.md', content: readmeContent },
      { path: 'theme.config.json', content: themeConfig },
      { path: 'package.json', content: packageJson },
      { path: 'LICENSE.txt', content: licenseContent },
    ]);

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${template.id}-bundle.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });
  }

  // Sufficient tier & HTML format — return JSON with download URL
  return NextResponse.json({
    downloadUrl: `/sandboxes/${templateId}/index.html`,
    templateName: template.name,
  });
}
