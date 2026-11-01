'use client';

import { useState } from 'react';
import Link from 'next/link';

interface HeroProps {
  onOpenCommandPalette?: () => void;
}

export default function Hero({ onOpenCommandPalette }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'sandbox' | 'inspector' | 'packager'>('sandbox');

  return (
    <div className="relative border-b border-white/[0.08] bg-[#060609] pt-20 pb-20 md:pt-28 md:pb-32 overflow-hidden">
      {/* Layered Cyberpunk & Aurora Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-indigo-500/25 via-violet-600/15 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Blueprint Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Operational Telemetry Status Pill */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-zinc-950/80 backdrop-blur-xl text-zinc-300 text-xs font-mono shadow-2xl shadow-indigo-500/10 hover:border-indigo-400/50 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white tracking-wide">36 PRODUCTION MASTERPIECES ONLINE</span>
            <span className="text-zinc-600">/</span>
            <span className="text-indigo-300 hidden sm:inline">ZERO NPM DEPENDENCIES</span>
            <span className="text-zinc-600 hidden sm:inline">/</span>
            <span className="text-emerald-400 font-bold">100/100 LIGHTHOUSE</span>
          </div>
        </div>

        {/* Masterpiece Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.02]">
            The Sovereign{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-violet-200 to-cyan-300 drop-shadow-[0_0_35px_rgba(99,102,241,0.4)]">
              Template Registry
            </span>{' '}
            for Engineers.
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 leading-relaxed font-normal max-w-3xl mx-auto">
            Every template is crafted as a standalone, framework-free masterwork. Single-file HTML5 architectures, reactive CSS custom properties, and zero fragile node_modules. Download, brand, and deploy forever.
          </p>
        </div>

        {/* Action Buttons & Command Palette Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
          <Link
            href="/templates"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-xl transition-all shadow-xl shadow-white/10 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>Explore All 36 Templates</span>
            <span>→</span>
          </Link>

          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-zinc-200 border border-white/15 bg-zinc-900/80 hover:bg-zinc-800/90 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Command Palette</span>
              <kbd className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-white/10 rounded">
                ⌘K
              </kbd>
            </button>
          )}

          <Link
            href="/#pricing"
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-zinc-300 border border-white/10 bg-zinc-950/60 hover:bg-zinc-900 rounded-xl transition-all text-center"
          >
            Subscription Access (from €3/mo)
          </Link>
        </div>

        {/* Live Interactive Command Center Showcase Deck */}
        <div className="max-w-5xl mx-auto bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-[0_0_80px_-20px_rgba(99,102,241,0.3)] transition-all">
          {/* Deck Browser Topbar */}
          <div className="bg-zinc-900/90 px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1 rounded-md border border-white/10">
                https://templatehub.website/registry/live-engine
              </span>
            </div>

            {/* Deck Feature Tabs */}
            <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-white/10 gap-1 text-xs">
              <button
                onClick={() => setActiveTab('sandbox')}
                className={`px-3 py-1 rounded font-semibold transition-all ${
                  activeTab === 'sandbox' ? 'bg-indigo-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ⚡ Live Sandbox
              </button>
              <button
                onClick={() => setActiveTab('inspector')}
                className={`px-3 py-1 rounded font-semibold transition-all ${
                  activeTab === 'inspector' ? 'bg-indigo-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                🔍 Code Telemetry
              </button>
              <button
                onClick={() => setActiveTab('packager')}
                className={`px-3 py-1 rounded font-semibold transition-all ${
                  activeTab === 'packager' ? 'bg-indigo-600 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                📦 PKZIP Packager
              </button>
            </div>
          </div>

          {/* Deck Body */}
          <div className="p-6 bg-zinc-950/90">
            {activeTab === 'sandbox' && (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                <iframe
                  src="/templates/astral-aerospace/index.html"
                  title="ASTRAL Aerospace Live Masterpiece Showcase"
                  className="w-full h-full border-0"
                  loading="eager"
                />
              </div>
            )}

            {activeTab === 'inspector' && (
              <div className="h-[460px] p-6 bg-zinc-950 font-mono text-xs text-zinc-300 overflow-y-auto space-y-3">
                <div className="text-emerald-400 font-bold">// ZERO-DEPENDENCY SOURCE CODE TELEMETRY</div>
                <div className="text-zinc-500">Target: All 36 TemplateHub Production Codebases</div>
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-white/10 space-y-2">
                  <div className="flex justify-between"><span>Lighthouse Performance:</span><span className="text-emerald-400 font-bold">100 / 100</span></div>
                  <div className="flex justify-between"><span>Cumulative Layout Shift (CLS):</span><span className="text-emerald-400 font-bold">0.000</span></div>
                  <div className="flex justify-between"><span>First Contentful Paint (FCP):</span><span className="text-emerald-400 font-bold">42 ms</span></div>
                  <div className="flex justify-between"><span>node_modules required:</span><span className="text-emerald-400 font-bold">0 (Zero bytes)</span></div>
                  <div className="flex justify-between"><span>Commercial redistribution:</span><span className="text-indigo-400 font-bold">Allowed in perpetuity</span></div>
                </div>
                <div className="text-zinc-400">
                  `&lt;!DOCTYPE html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;...&lt;style&gt;:root &#123; --bg: #030712; --gold: #f6d365; &#125;&lt;/style&gt;...`
                </div>
              </div>
            )}

            {activeTab === 'packager' && (
              <div className="h-[460px] p-6 bg-zinc-950 flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-3xl flex items-center justify-center mb-4">
                  📦
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Native Serverless PKZIP Packaging Engine</h3>
                <p className="text-sm text-zinc-400 max-w-md mb-6">
                  Every template can be downloaded as a standalone `.html` file or exported on-the-fly into a clean `.zip` archive containing `index.html`, `README.md`, `theme.config.json`, and commercial license terms.
                </p>
                <Link
                  href="/templates/astral-aerospace"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition-colors shadow-lg shadow-indigo-500/20"
                >
                  Inspect Template Details &amp; Export →
                </Link>
              </div>
            )}
          </div>

          {/* Deck Footer Metrics Bar */}
          <div className="px-6 py-4 bg-zinc-900/50 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono text-xs">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Total Catalog</div>
              <div className="font-bold text-white text-sm">36 Masterpieces</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Framework Bloat</div>
              <div className="font-bold text-emerald-400 text-sm">0 KB Runtime</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Responsive Testing</div>
              <div className="font-bold text-white text-sm">375px to 4K</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Commercial Rights</div>
              <div className="font-bold text-indigo-400 text-sm">Unlimited Clients</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
