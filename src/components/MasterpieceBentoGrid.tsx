'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MasterpieceBentoGrid() {
  const [activeColor, setActiveColor] = useState('#a855f7');

  const colorPalettes = [
    { name: 'Amethyst', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.5)' },
    { name: 'Royal Violet', color: '#7c3aed', glow: 'rgba(124, 58, 237, 0.5)' },
    { name: 'Neon Fuchsia', color: '#e879f9', glow: 'rgba(232, 121, 249, 0.5)' },
    { name: 'Electric Cyan', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.5)' },
    { name: 'Emerald Pulse', color: '#10b981', glow: 'rgba(16, 185, 129, 0.5)' },
    { name: 'Solar Amber', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.5)' },
  ];

  return (
    <section className="py-28 border-b border-purple-500/20 bg-[#070314] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/35 bg-purple-500/10 text-purple-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <span>✦ Why TemplateHub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Simple files. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-fuchsia-200 to-violet-300 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              Nothing to break later.
            </span>
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg leading-relaxed">
            Every template is plain HTML and CSS with a little vanilla JavaScript. There are no packages to install or update, so the site you launch today still works years from now.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Bento Card 1: Interactive Live CSS Token Playground (7 cols) */}
          <div className="md:col-span-7 bg-[#0d0622]/85 border border-purple-500/25 rounded-3xl p-5 sm:p-8 backdrop-blur-xl flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  TRY IT
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 border border-purple-500/35 text-purple-200">
                  Live demo
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Your brand colour, everywhere
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mb-5 sm:mb-6">
                Each template's colours live in a few CSS variables. Pick a colour below and the sample card updates instantly — the real templates work the same way.
              </p>

              {/* Swatch Selector */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 bg-[#070314] p-2 sm:p-2.5 rounded-2xl border border-purple-500/25 max-w-full shadow-inner">
                <span id="palette-label" className="text-xs text-purple-300 font-medium px-1 sm:px-2">Brand colour:</span>
                <div role="radiogroup" aria-labelledby="palette-label" className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto hide-scrollbar py-2 px-1.5">
                  {colorPalettes.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setActiveColor(p.color)}
                      style={{ backgroundColor: p.color }}
                      className={`w-7 h-7 shrink-0 rounded-full transition-transform duration-300 ${
                        activeColor === p.color
                          ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#070314] shadow-[0_0_15px_rgba(168,85,247,0.7)]'
                          : 'opacity-70 hover:opacity-100 hover:scale-110'
                      }`}
                      title={p.name}
                      role="radio"
                      aria-checked={activeColor === p.color}
                      aria-label={p.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Preview Canvas Node */}
            <div
              className="bg-[#070314] border rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-2xl"
              style={{
                borderColor: activeColor,
                boxShadow: `0 0 30px -5px ${activeColor}40`,
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-md transition-colors shrink-0"
                    style={{ backgroundColor: activeColor }}
                  >
                    ⚡
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">Your Business Name</div>
                    <div className="text-[10px] text-purple-300/70 font-mono truncate">
                      --brand-primary: {activeColor}
                    </div>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0"
                  style={{
                    backgroundColor: `${activeColor}20`,
                    color: activeColor,
                    border: `1px solid ${activeColor}50`,
                  }}
                >
                  Sample
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-[#0e0624] p-2.5 sm:p-3 rounded-xl border border-purple-500/20">
                  <div className="text-[10px] text-purple-400/80 uppercase font-mono">Buttons</div>
                  <div className="text-sm font-bold text-white">Updated</div>
                </div>
                <div className="bg-[#0e0624] p-2.5 sm:p-3 rounded-xl border border-purple-500/20">
                  <div className="text-[10px] text-purple-400/80 uppercase font-mono">Accents</div>
                  <div className="text-sm font-bold" style={{ color: activeColor }}>
                    Updated
                  </div>
                </div>
                <div className="bg-[#0e0624] p-2.5 sm:p-3 rounded-xl border border-purple-500/20">
                  <div className="text-[10px] text-purple-400/80 uppercase font-mono">Borders</div>
                  <div className="text-sm font-bold text-white">Updated</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Zero Dependency Sovereignty (5 cols) */}
          <div className="md:col-span-5 bg-[#0d0622]/85 border border-purple-500/25 rounded-3xl p-5 sm:p-8 backdrop-blur-xl flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-4">
                NO DEPENDENCIES
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Nothing to install or update
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mb-6">
                Many React and Next.js themes rely on hundreds of npm packages that need regular updates. Ours are plain files: open index.html and it works.
              </p>

              {/* Comparison Matrix */}
              <div className="space-y-3 font-mono text-[11px] sm:text-xs">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-rose-300">
                  <span>Typical framework theme:</span>
                  <span className="font-bold">hundreds of packages</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-between text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <span>TemplateHub:</span>
                  <span className="font-bold">0 packages</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/20 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
              <span className="text-xs text-purple-300">Host on any static server</span>
              <span className="text-xs text-emerald-400 font-bold">Downloads are yours to keep</span>
            </div>
          </div>

          {/* Bento Card 3: Store Auto-Edit Studio with Base64 Photos (5 cols) */}
          <div className="md:col-span-5 bg-[#0d0622]/85 border border-purple-500/25 rounded-3xl p-5 sm:p-8 backdrop-blur-xl flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-fuchsia-400 font-bold block mb-4">
                NO CODE NEEDED
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Auto-Edit Studio
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mb-4">
                Pick a template, fill in your business name, products and contact details, and upload your photos. The preview updates as you type, and you download the finished site as a ZIP.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-purple-300">
                <span className="px-2.5 py-1 rounded-md bg-[#070314] border border-purple-500/30">✓ Your own photos</span>
                <span className="px-2.5 py-1 rounded-md bg-[#070314] border border-purple-500/30">✓ One-click ZIP</span>
                <span className="px-2.5 py-1 rounded-md bg-[#070314] border border-purple-500/30">✓ Live preview</span>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/20 mt-6">
              <Link
                href="/studio"
                className="text-xs font-bold text-fuchsia-300 hover:text-white transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <span>Launch Auto-Edit Studio</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Bento Card 4: Global Performance Benchmark Telemetry (7 cols) */}
          <div className="md:col-span-7 bg-[#0d0622]/85 border border-purple-500/25 rounded-3xl p-5 sm:p-8 backdrop-blur-xl flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold block mb-4">
                FAST BY DEFAULT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Built to load fast
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mb-6">
                With no framework to download, pages render quickly on phones and laptops. Don't take our word for it: run Google PageSpeed Insights on any template — there's a link on every template page.
              </p>

              {/* Performance checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: 'Performance', note: 'No framework to load' },
                  { label: 'Accessibility', note: 'Semantic HTML' },
                  { label: 'Best practices', note: 'HTTPS-ready, no trackers' },
                  { label: 'SEO', note: 'Meta tags included' },
                ].map((item) => (
                  <div key={item.label} className="p-3 sm:p-4 bg-[#070314] rounded-2xl border border-purple-500/25 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 mb-1" aria-hidden="true">✓</div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-white">{item.label}</div>
                    <div className="text-[9px] sm:text-[10px] text-purple-400/80 font-mono mt-0.5">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/20 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-purple-300">
              <span>Real scores depend on your images and hosting.</span>
              <span className="font-mono text-purple-400 font-semibold">Test it yourself</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
