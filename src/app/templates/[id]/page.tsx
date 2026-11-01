import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { templates } from '@/data/templates';
import DownloadButton from '@/components/DownloadButton';
import InteractivePreviewFrame from '@/components/InteractivePreviewFrame';

export default async function TemplateDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = templates.find(t => t.id === id);

  if (!template) {
    notFound();
  }

  const tierBadgeColor = 
    template.tier === 'free' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
    template.tier === 'basic' ? 'bg-zinc-800 text-zinc-300 border-zinc-700' :
    template.tier === 'pro' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' :
    'bg-amber-500/10 text-amber-300 border-amber-500/20';

  return (
    <div className="bg-[#09090b] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb nav */}
        <div className="flex items-center text-xs text-zinc-500 mb-8 gap-2">
          <Link href="/templates" className="hover:text-zinc-300 transition-colors">Templates</Link>
          <span>/</span>
          <span className="capitalize">{template.category}</span>
          <span>/</span>
          <span className="text-zinc-300 font-medium">{template.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Area (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-md border ${tierBadgeColor}`}>
                  {template.tier} tier
                </span>
                <span className="text-[11px] text-zinc-400 font-mono uppercase bg-zinc-900 border border-white/[0.06] px-2 py-0.5 rounded-md">
                  {template.category}
                </span>
                <span className="text-xs text-zinc-500 ml-auto font-mono">
                  Release: {template.createdAt}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                {template.name}
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
                {template.description}
              </p>
            </div>

            {/* In-Browser Interactive Responsive Sandbox Frame with Viewport Switcher & Token Controls */}
            {template.livePreviewUrl !== '#' ? (
              <InteractivePreviewFrame
                templateId={template.id}
                templateName={template.name}
                livePreviewUrl={template.livePreviewUrl}
              />
            ) : (
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/[0.08]">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Included Features
                </h3>
                <ul className="space-y-2.5 text-xs text-zinc-300">
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
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Tech Specs & Tags
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {template.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-zinc-900 border border-white/[0.08] rounded-md text-[11px] text-zinc-400 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-zinc-400 space-y-1.5 pt-4 border-t border-white/[0.06]">
                  <div className="flex justify-between">
                    <span>Dependencies:</span>
                    <span className="text-zinc-200">Zero (Standalone HTML/CSS)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>License:</span>
                    <span className="text-zinc-200">Commercial & Personal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="text-zinc-200">HTML5 + Embedded Styles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar CTA Area (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6 sticky top-24 space-y-6">
              
              {/* Metric counters */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="text-xl font-bold text-white">★ {template.rating.toFixed(1)}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">Community rating</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{(template.downloads).toLocaleString()}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">Total downloads</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                <Link
                  href={`/builder?template=${template.id}`}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
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
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 border border-white/10"
                  >
                    Open live preview ↗
                  </a>
                )}
              </div>

              {/* Plan note */}
              <div className="pt-4 border-t border-white/[0.08] text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Included with {template.tier.toUpperCase()} subscription</span>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-500">
                  {template.tier === 'free' 
                    ? 'Free to download for registered users.' 
                    : `Requires an active ${template.tier} plan (€${template.tier === 'basic' ? '3' : '10'}/mo) or all-access pass.`}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
