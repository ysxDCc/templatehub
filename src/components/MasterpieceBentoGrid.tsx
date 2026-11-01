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
            <span>✦ Engineered Without Compromise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Not Mere Templates. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-fuchsia-200 to-violet-300 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              Sovereign Codebase Engines.
            </span>
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg leading-relaxed">
            Eliminate runtime fragility. Every codebase is self-contained HTML5, semantic CSS variables, and zero bundled node_modules dependencies.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Interactive Live CSS Token Playground (7 cols) */}
          <div className="md:col-span-7 bg-[#0d0622]/85 border border-purple-500/25 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  LIVE TOKEN HARNESS
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 border border-purple-500/35 text-purple-200">
                  CSS Variables Reactive
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Dynamic Brand Token Customizer
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mb-6">
                Test how effortlessly our templates absorb your brand identity. Select a theme token below to watch the live UI node adapt instantly.
              </p>

              {/* Swatch Selector */}
              <div className="flex items-center gap-3 mb-6 bg-[#070314] p-2.5 rounded-2xl border border-purple-500/25 w-fit shadow-inner">
                <span className="text-xs text-purple-300 font-medium px-2">Palette:</span>
                {colorPalettes.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setActiveColor(p.color)}
                    style={{ backgroundColor: p.color }}
                    className={`w-7 h-7 rounded-full transition-transform duration-300 ${
                      activeColor === p.color
                        ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#070314] shadow-[0_0_15px_rgba(168,85,247,0.7)]'
                        : 'opacity-70 hover:opacity-100 hover:scale-110'
                    }`}
                    title={p.name}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Preview Canvas Node */}
            <div
              className="bg-[#070314] border rounded-2xl p-6 transition-all duration-300 shadow-2xl"
              style={{
                borderColor: activeColor,
                boxShadow: `0 0 30px -5px ${activeColor}40`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-md transition-colors"
                    style={{ backgroundColor: activeColor }}
                  >
                    ⚡
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Quantum Cloud Mesh</div>
                    <div className="text-[10px] text-purple-300/70 font-mono">
                      --brand-primary: {activeColor}
                    </div>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${activeColor}20`,
                    color: activeColor,
                    border: `1px solid ${activeColor}50`,
                  }}
                >
                  Sub-3ms Edge
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#0e0624] p-3 rounded-xl border border-purple-500/20">
                  <div className="text-[10px] text-purple-400/80 uppercase font-mono">Uptime SLA</div>
                  <div className="text-sm font-bold text-white">99.999%</div>
                </div>
                <div className="bg-[#0e0624] p-3 rounded-xl border border-purple-500/20">
                  <div className="text-[10px] text-purple-400/80 uppercase font-mono">Edge Latency</div>
                  <div className="text-sm font-bold" style={{ color: activeColor }}>
                    2.8 ms
                  </div>
                </div>
                <div className="bg-[#0e0624] p-3 rounded-xl border border-purple-500/20">
                  <div className="text-[10px] text-purple-400/80 uppercase font-mono">Global Mesh</div>
                  <div className="text-sm font-bold text-white">340 PoPs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Zero Dependency Sovereignty (5 cols) */}
          <div className="md:col-span-5 bg-[#0d0622]/85 border border-purple-500/25 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-4">
                ARCHITECTURAL SOVEREIGNTY
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Immune to Dependency Rot
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mb-6">
                Typical templates pull 400+ transitive npm packages that break every 3 months. Our templates have zero dependencies. Run them today, run them in 2036.
              </p>

              {/* Comparison Matrix */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-rose-300">
                  <span>Standard Theme:</span>
                  <span className="font-bold">428 npm packages, 120MB</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-between text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <span>TemplateHub Masterpiece:</span>
                  <span className="font-bold">0 packages, &lt; 50KB HTML</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/20 mt-6 flex items-center justify-between">
              <span className="text-xs text-purple-300">Self-sufficient codebases</span>
              <span className="text-xs text-emerald-400 font-bold">100% Perpetual Guarantee</span>
            </div>
          </div>

          {/* Bento Card 3: Store Auto-Edit Studio with Base64 Photos (5 cols) */}
          <div className="md:col-span-5 bg-[#0d0622]/85 border border-purple-500/25 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-fuchsia-400 font-bold block mb-4">
                NO-CODE CUSTOMIZATION
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                In-Browser Store Auto-Edit Studio
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mb-4">
                Paid members can click any template and enter brand info, product titles, phone numbers, and upload local photos. Our engine updates the DOM live and builds a downloadable package in seconds.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-purple-300">
                <span className="px-2.5 py-1 rounded-md bg-[#070314] border border-purple-500/30">✓ Base64 Image Injection</span>
                <span className="px-2.5 py-1 rounded-md bg-[#070314] border border-purple-500/30">✓ PKZIP Bundler</span>
                <span className="px-2.5 py-1 rounded-md bg-[#070314] border border-purple-500/30">✓ Live Split-Pane</span>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/20 mt-6">
              <Link
                href="/templates/astral-aerospace"
                className="text-xs font-bold text-fuchsia-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Launch Auto-Edit Studio</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Bento Card 4: Global Performance Benchmark Telemetry (7 cols) */}
          <div className="md:col-span-7 bg-[#0d0622]/85 border border-purple-500/25 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold block mb-4">
                PERFORMANCE BENCHMARK
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Certified 100/100 Core Web Vitals
              </h3>
              <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mb-6">
                Because there is zero JavaScript hydration tax, our templates achieve perfect Lighthouse metrics out of the box on mobile and desktop.
              </p>

              {/* 4 Score Rings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#070314] rounded-2xl border border-purple-500/25 text-center">
                  <div className="text-2xl font-extrabold text-emerald-400 mb-1">100</div>
                  <div className="text-[11px] font-bold text-white">Performance</div>
                  <div className="text-[10px] text-purple-400/80 font-mono mt-0.5">LCP 0.4s</div>
                </div>
                <div className="p-4 bg-[#070314] rounded-2xl border border-purple-500/25 text-center">
                  <div className="text-2xl font-extrabold text-emerald-400 mb-1">100</div>
                  <div className="text-[11px] font-bold text-white">Accessibility</div>
                  <div className="text-[10px] text-purple-400/80 font-mono mt-0.5">WCAG AAA</div>
                </div>
                <div className="p-4 bg-[#070314] rounded-2xl border border-purple-500/25 text-center">
                  <div className="text-2xl font-extrabold text-emerald-400 mb-1">100</div>
                  <div className="text-[11px] font-bold text-white">Best Practices</div>
                  <div className="text-[10px] text-purple-400/80 font-mono mt-0.5">Modern Web</div>
                </div>
                <div className="p-4 bg-[#070314] rounded-2xl border border-purple-500/25 text-center">
                  <div className="text-2xl font-extrabold text-emerald-400 mb-1">100</div>
                  <div className="text-[11px] font-bold text-white">SEO Score</div>
                  <div className="text-[10px] text-purple-400/80 font-mono mt-0.5">Semantic Tags</div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/20 mt-6 flex items-center justify-between text-xs text-purple-300">
              <span>Audited with Google Chrome Lighthouse v12</span>
              <span className="font-mono text-purple-400 font-semibold">ZERO REGRESSIONS</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
