'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MasterpieceBentoGrid() {
  const [activeColor, setActiveColor] = useState('#6366f1');

  const colorPalettes = [
    { name: 'Indigo', color: '#6366f1', glow: 'rgba(99, 102, 241, 0.4)' },
    { name: 'Cyan', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
    { name: 'Emerald', color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
    { name: 'Scarlet', color: '#ef233c', glow: 'rgba(239, 35, 60, 0.4)' },
    { name: 'Gold', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
    { name: 'Purple', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
  ];

  return (
    <section className="py-24 border-b border-white/[0.08] bg-[#070709] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-4">
            <span>✦ Engineered Without Compromise</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Not Just Templates. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400">
              Sovereign Production Codebases.
            </span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Eliminate runtime fragility. Every codebase is self-contained HTML5, semantic Tailwind/CSS variables, and zero bundled node_modules dependencies.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Interactive Live CSS Token Playground (7 cols) */}
          <div className="md:col-span-7 bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all shadow-2xl">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
                  LIVE TOKEN HARNESS
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                  CSS Variables Reactive
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Dynamic Brand Token Customizer
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Test how effortlessly our templates absorb your brand identity. Click a theme token below to watch the live UI node react in real-time.
              </p>

              {/* Swatch Selector */}
              <div className="flex items-center gap-3 mb-6 bg-zinc-950/70 p-2 rounded-xl border border-white/10 w-fit">
                <span className="text-xs text-zinc-400 font-medium px-2">Palette:</span>
                {colorPalettes.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setActiveColor(p.color)}
                    style={{ backgroundColor: p.color }}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      activeColor === p.color ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-zinc-950' : 'opacity-70 hover:opacity-100'
                    }`}
                    title={p.name}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Preview Canvas Node */}
            <div
              className="bg-zinc-950 border border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-xl"
              style={{ borderColor: activeColor }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs" style={{ backgroundColor: activeColor }}>
                    ⚡
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Quantum Cloud Infrastructure</div>
                    <div className="text-[10px] text-zinc-500 font-mono">--primary-brand: {activeColor}</div>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${activeColor}20`, color: activeColor, border: `1px solid ${activeColor}40` }}
                >
                  Sub-5ms Cluster
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-900/60 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Uptime SLA</div>
                  <div className="text-sm font-bold text-white">99.998%</div>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Edge Latency</div>
                  <div className="text-sm font-bold" style={{ color: activeColor }}>3.2 ms</div>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-zinc-500 uppercase font-mono">Global Mesh</div>
                  <div className="text-sm font-bold text-white">320 PoPs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Zero Dependency Architecture Comparison (5 cols) */}
          <div className="md:col-span-5 bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all shadow-2xl">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-4">
                ARCHITECTURAL SOVEREIGNTY
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Zero node_modules. Zero Fragility.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Most template vendors ship 150MB of deprecated packages that break with every React major bump. TemplateHub ships standalone purity.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-300">
                <div className="font-bold flex items-center justify-between">
                  <span>Legacy Marketplaces</span>
                  <span>✕ Deprecated</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">180 MB dependencies · 42 vulnerabilities · Broken builds</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-emerald-300">
                <div className="font-bold flex items-center justify-between">
                  <span>TemplateHub Registry</span>
                  <span>✓ 100% Standalone</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">1 Single File · 0 npm installs · Immediate browser execution</div>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Multi-Format Package Generator (6 cols) */}
          <div className="md:col-span-6 bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all shadow-2xl">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-4">
                NATIVE PKZIP PACKAGER
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Multi-Format Instant Export
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Download single-file `.html` for instant deployment, or export a complete project archive bundle (`.zip`) with README, License, and Configs.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-3 rounded-xl border border-white/10 text-center font-mono text-xs">
              <div className="p-2 rounded bg-zinc-900 border border-white/5">
                <div className="text-base mb-1">📄</div>
                <div className="font-bold text-white text-[11px]">.html</div>
                <div className="text-[9px] text-zinc-500">Standalone</div>
              </div>
              <div className="p-2 rounded bg-zinc-900 border border-white/5">
                <div className="text-base mb-1">📦</div>
                <div className="font-bold text-white text-[11px]">.zip</div>
                <div className="text-[9px] text-zinc-500">Full Archive</div>
              </div>
              <div className="p-2 rounded bg-zinc-900 border border-white/5">
                <div className="text-base mb-1">⟨/⟩</div>
                <div className="font-bold text-white text-[11px]">iframe</div>
                <div className="text-[9px] text-zinc-500">Embed Snippet</div>
              </div>
            </div>
          </div>

          {/* Bento Card 4: WCAG AAA Accessibility Matrix (6 cols) */}
          <div className="md:col-span-6 bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all shadow-2xl">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-4">
                WCAG AAA ACCESSIBILITY
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Audited Screen-Reader &amp; Contrast
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Every component is built with semantic landmark roles, keyboard navigation focus rings, and verified 7:1 contrast ratios.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-lg">
                  AAA
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Full WCAG 2.1 Compliance</div>
                  <div className="text-[10px] text-zinc-500 font-mono">ARIA Landmarks &amp; Focus Traps Included</div>
                </div>
              </div>
              <Link
                href="/compare"
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors border border-white/10"
              >
                Inspect Matrix →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
