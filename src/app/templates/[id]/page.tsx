import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { templates } from '@/data/templates';
import DownloadButton from '@/components/DownloadButton';
import InteractivePreviewFrame from '@/components/InteractivePreviewFrame';
import SinglePurchaseButton from '@/components/SinglePurchaseButton';
import ReviewsSection from '@/components/ReviewsSection';
import MasterBundleDownloadButton from '@/components/MasterBundleDownloadButton';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);
  if (!template) return { title: 'Template Not Found | TemplateHub' };

  const title = `${template.name} — Premium ${template.category.toUpperCase()} Website Template | TemplateHub`;
  const description = `${template.description} Responsive standalone HTML5/CSS codebase with commercial client rights and instant in-browser sandbox preview.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.templatehub.website/templates/${template.id}`,
      siteName: 'TemplateHub',
      images: [
        {
          url: `https://www.templatehub.website${template.previewImage}`,
          width: 1200,
          height: 630,
          alt: `${template.name} Preview`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://www.templatehub.website${template.previewImage}`],
    },
  };
}

export default async function TemplateDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);

  if (!template) {
    notFound();
  }

  const tierBadgeColor = 
    template.tier === 'free' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
    template.tier === 'basic' ? 'bg-purple-900/50 text-purple-200 border-purple-500/30' :
    template.tier === 'pro' ? 'bg-fuchsia-900/50 text-fuchsia-200 border-fuchsia-500/40 shadow-[0_0_8px_rgba(232,121,249,0.3)]' :
    'bg-amber-500/15 text-amber-300 border-amber-500/30';

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: template.name,
        description: template.description,
        image: `https://www.templatehub.website${template.previewImage}`,
        category: template.category,
        brand: {
          '@type': 'Brand',
          name: 'TemplateHub',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: template.rating.toFixed(1),
          reviewCount: Math.max(14, Math.floor(template.downloads / 18)),
        },
        offers: {
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
              url: `https://www.templatehub.website/templates/${template.id}`,
            },
            {
              '@type': 'Offer',
              name: 'TemplateHub All-Access Plan',
              price: '3.00',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: 'https://www.templatehub.website/#pricing',
            },
          ],
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: template.name,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All modern web browsers',
        offers: {
          '@type': 'Offer',
          price: '9.00',
          priceCurrency: 'EUR',
        },
      },
    ],
  };

  return (
    <div className="bg-[#070314] min-h-screen py-10 text-purple-100">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb nav */}
        <div className="flex items-center text-xs text-purple-400/80 mb-8 gap-2 font-mono">
          <Link href="/templates" className="hover:text-purple-200 transition-colors">Templates</Link>
          <span>/</span>
          <span className="capitalize text-purple-300">{template.category}</span>
          <span>/</span>
          <span className="text-white font-semibold">{template.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Area (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md border ${tierBadgeColor}`}>
                  {template.tier} tier
                </span>
                <span className="text-[11px] text-purple-300 font-mono uppercase bg-[#0e0624] border border-purple-500/25 px-2 py-0.5 rounded-md">
                  {template.category}
                </span>
                <span className="text-xs text-purple-400/70 ml-auto font-mono">
                  Release: {template.createdAt}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                {template.name}
              </h1>

              <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed max-w-2xl">
                {template.description}
              </p>
            </div>

            {/* In-Browser Interactive Responsive Sandbox Frame with Viewport Switcher, Auto-Editor & Code Inspector */}
            {template.livePreviewUrl !== '#' ? (
              <InteractivePreviewFrame template={template} />
            ) : (
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-purple-500/25 bg-[#070314]">
                <Image
                  src={template.previewImage}
                  alt={template.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Specifications & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-purple-500/20">
              <div>
                <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-4 font-mono">
                  Included Features
                </h3>
                <ul className="space-y-2.5 text-xs text-purple-200/90">
                  {template.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-4 font-mono">
                  Tech Specs &amp; Tags
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {template.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-[#0e0624] border border-purple-500/25 rounded-md text-[11px] text-purple-300 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-purple-200/70 space-y-2 pt-4 border-t border-purple-500/20">
                  <div className="flex justify-between">
                    <span>Dependencies:</span>
                    <span className="text-white font-medium">Zero (Standalone HTML/CSS)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>License:</span>
                    <span className="text-white font-medium">Commercial &amp; Personal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="text-white font-medium">HTML5 + Embedded Styles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Community Reviews Section */}
            <ReviewsSection
              templateId={template.id}
              templateName={template.name}
              initialRating={template.rating}
            />
          </div>

          {/* Sidebar CTA Area (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-[#0d0622]/90 border border-purple-500/25 rounded-2xl p-6 sticky top-24 space-y-5 shadow-2xl">
              
              {/* Metric counters */}
              <div className="grid grid-cols-2 gap-4 pb-5 border-b border-purple-500/20">
                <div>
                  <div className="text-xl font-bold text-white">★ {template.rating.toFixed(1)}</div>
                  <div className="text-[11px] text-purple-400/80 mt-0.5">Community rating</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{(template.downloads).toLocaleString()}</div>
                  <div className="text-[11px] text-purple-400/80 mt-0.5">Total downloads</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                {/* 1-Off Lifetime Buy (€9) */}
                <SinglePurchaseButton
                  templateId={template.id}
                  templateName={template.name}
                />

                <Link
                  href={`/builder?template=${template.id}`}
                  className="w-full bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 hover:from-purple-500 hover:via-violet-500 hover:to-fuchsia-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:scale-[1.01]"
                >
                  <span>✏️</span>
                  <span>Customize in No-Code Editor</span>
                </Link>

                <DownloadButton template={template} />

                {template.livePreviewUrl !== '#' && (
                  <a
                    href={template.livePreviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#070314] hover:bg-[#1a0b3b] text-purple-200 hover:text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-purple-500/30"
                  >
                    Open live preview ↗
                  </a>
                )}
              </div>

              {/* Quick Deploy Options */}
              <div className="pt-4 border-t border-purple-500/20">
                <span className="text-[11px] text-purple-400 font-mono block mb-2 font-semibold">
                  1-Click Cloud Deployment:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-black hover:bg-zinc-900 border border-white/20 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>▲</span>
                    <span>Vercel</span>
                  </a>
                  <a
                    href="https://app.netlify.com/drop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-[#00ad9f]/15 hover:bg-[#00ad9f]/25 border border-[#00ad9f]/40 text-[#2eeadc] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>◆</span>
                    <span>Netlify</span>
                  </a>
                </div>
              </div>

              {/* Agency Master Pack Bulk Download */}
              <div className="pt-4 border-t border-purple-500/20">
                <span className="text-[11px] text-purple-400 font-mono block mb-2 font-semibold">
                  Agency Benefit:
                </span>
                <MasterBundleDownloadButton />
              </div>

              {/* Plan note */}
              <div className="pt-4 border-t border-purple-500/20 text-xs text-purple-200/70 space-y-2">
                <div className="flex items-center gap-2 text-purple-200 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Included with {template.tier.toUpperCase()} subscription</span>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 text-[11px] text-purple-200 leading-relaxed">
                  <span className="font-bold text-white">🪄 Auto-Edit Studio:</span> Pre-load realistic industry presets with 1 click in the Auto-Edit tab to customize this template for your business.
                </div>
                <p className="text-[11px] leading-relaxed text-purple-300/60">
                  {template.tier === 'free' 
                    ? 'Free to download for registered users.' 
                    : `Buy individual license for €9 or unlock all templates with Pro (€10/mo).`}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
