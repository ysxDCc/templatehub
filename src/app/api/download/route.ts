import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { canAccessTemplate, getEntitlement } from '@/lib/entitlement';
import { findTemplate, readTemplateHtml } from '@/lib/template-source';
import { SITE_URL } from '@/lib/site';
import { createZipArchive } from '@/lib/zip';

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

  const template = findTemplate(templateId);
  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  const ent = await getEntitlement(userId);
  if (!canAccessTemplate(ent, template)) {
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
    const htmlContent = await readTemplateHtml(template.id);
    if (!htmlContent) {
      return NextResponse.json({ error: 'Template file missing' }, { status: 500 });
    }

    const readmeContent = `# ${template.name}
${template.description}

## Included with TemplateHub License
- Tier: ${template.tier.toUpperCase()}
- Category: ${template.category}
- Accessibility Rating: ${template.accessibilityScore || 'AA'}

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
Your licence depends on the plan you had when you downloaded this file.
See ${SITE_URL}/licensing
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
        author: 'TemplateHub',
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

You may use this template under the licence of the TemplateHub plan you
held when you downloaded it (${ent.tier} plan). What each plan allows is
described at ${SITE_URL}/licensing

You may not resell, share or redistribute the template itself.
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
    downloadUrl: `/api/template-source?id=${template.id}&download=1`,
    templateName: template.name,
  });
}
