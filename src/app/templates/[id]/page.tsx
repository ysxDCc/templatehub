import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { templates } from '@/data/templates';
import DownloadButton from '@/components/DownloadButton';
import InteractivePreviewFrame from '@/components/InteractivePreviewFrame';
import SinglePurchaseButton from '@/components/SinglePurchaseButton';
import ReviewsSection from '@/components/ReviewsSection';
import MasterBundleDownloadButton from '@/components/MasterBundleDownloadButton';
import TemplateLogo from '@/components/TemplateLogo';
import { SITE_URL } from '@/lib/site';
import Badge from '@/components/ui/Badge';

// Pre-render every template page at build time for instant loads.
export function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);
  if (!template) return { title: 'Template not found' };

  const categoryLabel = template.category.replace(/-/g, ' ');
  const title = `${template.name} — ${categoryLabel.replace(/\b\w/g, (c) => c.toUpperCase())} Website Template`;
  const description = `${template.description} Responsive HTML & CSS, no build step. Live preview and in-browser customisation.`.slice(0, 300);

  return {
    title,
    description,
    alternates: { canonical: `/templates/${template.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/templates/${template.id}`,
      siteName: 'TemplateHub',
      images: [
        {
          url: `${SITE_URL}${template.previewImage}`,
          width: 1280,
          height: 800,
          alt: `${template.name} Preview`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}${template.previewImage}`],
    },
  };
}

export default async function TemplateDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);

  if (!template) {
    notFound();
  }


  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: template.name,
        description: template.description,
        image: `${SITE_URL}${template.previewImage}`,
        category: template.category,
        brand: {
          '@type': 'Brand',
          name: 'TemplateHub',
        },        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: '3.00',
          highPrice: '9.00',
          offerCount: '2',
          offers: [
            {
              '@type': 'Offer',
              name: 'Single Template Lifetime License',
              price: '9.00',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}/templates/${template.id}`,
            },
            {
              '@type': 'Offer',
              name: 'TemplateHub All-Access Plan',
              price: '3.00',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}/#pricing`,
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Templates', item: `${SITE_URL}/templates` },
          { '@type': 'ListItem', position: 3, name: template.name, item: `${SITE_URL}/templates/${template.id}` },
        ],
      },
    ],
  };

  return (
    <div className="pb-28 lg:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 pt-4 text-sm text-muted">
          <Link href="/templates" className="inline-flex items-center min-h-11 hover:text-ink">Templates</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/templates?category=${template.category}`} className="inline-flex items-center min-h-11 capitalize hover:text-ink">
            {template.category.replace(/-/g, ' ')}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink truncate max-w-[50vw]" aria-current="page">{template.name}</span>
        </nav>

        <header className="pt-2 pb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge tone={template.tier}>{template.tier}</Badge>
            <span className="text-sm text-muted">
              <span className="text-amber-300">★ {template.rating.toFixed(1)}</span> · {template.downloads.toLocaleString()} downloads
            </span>
          </div>
          <div className="flex items-center gap-3">
            <TemplateLogo template={template} size={40} />
            <h1 className="text-[32px] leading-tight sm:text-5xl font-bold tracking-tight text-ink">{template.name}</h1>
          </div>
          <p className="mt-3 text-base md:text-lg text-muted leading-relaxed max-w-3xl">{template.description}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-10">
            {template.livePreviewUrl !== '#' ? (
              <div style={{ viewTransitionName: 'tpl-hero' }}>
                <InteractivePreviewFrame template={template} />
              </div>
            ) : (
              <div className="relative aspect-[16/10] w-full rounded-section overflow-hidden border border-line bg-bg">
                <Image src={template.previewImage} alt={`${template.name} preview`} fill className="object-cover" sizes="(min-width:1024px) 760px, 100vw" />
              </div>
            )}

            <section aria-labelledby="features-title" className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 id="features-title" className="text-lg font-semibold text-ink mb-3">What&apos;s included</h2>
                <ul className="space-y-2.5 text-[15px] text-ink/90">
                  {template.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <svg aria-hidden="true" className="w-5 h-5 text-lilac shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-ink mb-3">Details</h2>
                <dl className="divide-y divide-line border-y border-line text-[15px]">
                  <div className="flex justify-between gap-4 py-3"><dt className="text-muted">Format</dt><dd className="text-ink">HTML + CSS</dd></div>
                  <div className="flex justify-between gap-4 py-3"><dt className="text-muted">Dependencies</dt><dd className="text-ink">None</dd></div>
                  <div className="flex justify-between gap-4 py-3"><dt className="text-muted">Plan</dt><dd className="text-ink capitalize">{template.tier}</dd></div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-muted">Licence</dt>
                    <dd><Link href="/licensing" className="inline-flex items-center min-h-11 -my-3 text-lilac underline underline-offset-4">Depends on your plan</Link></dd>
                  </div>
                </dl>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
                  {template.tags.map((tag) => (
                    <li key={tag} className="px-2.5 py-1 rounded-md bg-surface border border-line text-xs text-muted">{tag}</li>
                  ))}
                </ul>
              </div>
            </section>

            <ReviewsSection templateId={template.id} templateName={template.name} initialRating={template.rating} />
          </div>

          <aside id="get" aria-label="Get this template" className="scroll-mt-24">
            <div className="lg:sticky lg:top-24 rounded-section border border-line bg-surface p-5 space-y-4">
              <div>
                <p className="text-sm text-muted">Included with</p>
                <p className="text-xl font-semibold text-ink">{template.tier === 'free' ? 'Free account' : `${template.tier.charAt(0).toUpperCase()}${template.tier.slice(1)} plan or higher`}</p>
              </div>

              <div className="space-y-2.5">
                {template.tier === 'free' ? (
                  <DownloadButton template={template} />
                ) : (
                  <>
                    {template.tier === 'enterprise' ? (
                      <Link
                        href="/checkout/start?plan=enterprise"
                        className="flex flex-col items-center justify-center min-h-12 px-4 py-2 rounded-control bg-primary hover:bg-primary-hover text-white font-semibold text-center"
                      >
                        Get it with Enterprise
                        <span className="text-xs font-normal text-white/85">All templates incl. Enterprise · €29.99/month</span>
                      </Link>
                    ) : (
                      <Link
                        href="/checkout/start?plan=pro"
                        className="flex flex-col items-center justify-center min-h-12 px-4 py-2 rounded-control bg-primary hover:bg-primary-hover text-white font-semibold text-center"
                      >
                        Get it with Pro — 3 days free
                        <span className="text-xs font-normal text-white/85">Then €10/month · cancel anytime</span>
                      </Link>
                    )}
                    <SinglePurchaseButton templateId={template.id} templateName={template.name} />
                    <DownloadButton template={template} />
                  </>
                )}
                <Link
                  href={`/studio?template=${template.id}`}
                  className="flex items-center justify-center gap-2 min-h-12 px-4 rounded-control bg-raised border border-line text-ink font-semibold hover:border-line-strong"
                >
                  <span aria-hidden="true">🪄</span> Edit in Studio — free to try
                </Link>
              </div>

              <div className="pt-4 border-t border-line">
                <p className="text-sm text-muted mb-2">Publish in minutes</p>
                <div className="grid grid-cols-2 gap-2">
                  <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center min-h-11 rounded-control bg-bg border border-line text-sm text-ink hover:border-line-strong">
                    Netlify Drop ↗
                  </a>
                  <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center min-h-11 rounded-control bg-bg border border-line text-sm text-ink hover:border-line-strong">
                    Vercel ↗
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-line">
                <MasterBundleDownloadButton />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Phone & tablet: sticky buy bar (sits above the bottom tab bar on phones) */}
      <div className="lg:hidden fixed inset-x-0 z-30 bottom-[calc(56px+env(safe-area-inset-bottom))] md:bottom-0 border-t border-line bg-raised/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{template.name}</p>
            <p className="text-xs text-muted">{template.tier === 'free' ? 'Free with an account' : template.tier === 'enterprise' ? '€9 once, or with Enterprise' : '€9 once, or with Pro'}</p>
          </div>
          <a href="#get" className="shrink-0 inline-flex items-center min-h-11 px-5 rounded-control bg-primary hover:bg-primary-hover text-white text-sm font-semibold">
            {template.tier === 'free' ? 'Download' : 'Get it'}
          </a>
        </div>
      </div>
    </div>
  );
}
