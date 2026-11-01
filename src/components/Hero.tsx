'use client';

import { useState } from 'react';
import Link from 'next/link';
import CosmicPurpleCanvas from '@/components/CosmicPurpleCanvas';

interface HeroProps {
  onOpenCommandPalette?: () => void;
}

export default function Hero({ onOpenCommandPalette }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'sandbox' | 'inspector' | 'packager'>('sandbox');

  return (
    <div className="relative border-b border-purple-500/20 bg-[#070314] pt-20 pb-20 md:pt-28 md:pb-36 overflow-hidden">
      {/* 1. Interactive Cosmic Purple Particle Engine */}
      <CosmicPurpleCanvas />

      {/* 2. Layered Cosmic Aurora Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-purple-600/30 via-violet-600/20 to-transparent blur-[140px] pointer-events-none animate-aurora-1" />
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[140px] pointer-events-none animate-aurora-2" />
      <div className="absolute top-1/3 -right-36 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none animate-aurora-1" />

      {/* 3. Cyber Scanning Grid Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 animate-scanline"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(168, 85, 247, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 35%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Telemetry Status Pill (Floating Physics) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-purple-500/35 bg-[#0e0624]/90 backdrop-blur-xl text-purple-200 text-xs font-mono shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:border-purple-400/60 transition-all animate-float">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-400"></span>
            </span>
            <span className="font-bold text-white tracking-wide">36 SOVEREIGN MASTERPIECES</span>
            <span className="text-purple-500/70">/</span>
            <span className="text-purple-300 hidden sm:inline">ZERO RUNTIME NPM BLOAT</span>
            <span className="text-purple-500/70 hidden sm:inline">/</span>
            <span className="text-emerald-400 font-bold">100/100 LIGHTHOUSE</span>
          </div>
        </div>

        {/* Masterpiece Headline with Purple Glow */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.03]">
            The Sovereign{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-fuchsia-200 to-violet-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.6)]">
              Template Engine
            </span>{' '}
            for Visionaries.
          </h1>

          <p className="text-base sm:text-xl text-purple-200/80 leading-relaxed font-normal max-w-3xl mx-auto">
            Engineered as standalone, framework-free masterworks. Single-file architectures, reactive CSS custom tokens, and zero fragile build pipelines. Download, auto-edit with your store data, and deploy forever.
          </p>
        </div>

        {/* Action Buttons & Command Palette Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/templates"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 hover:from-purple-500 hover:via-violet-500 hover:to-fuchsia-500 rounded-xl transition-all shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 shimmer-active"
          >
            <span>Explore All 36 Templates</span>
            <span className="text-lg">→</span>
          </Link>

          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-purple-200 border border-purple-500/30 bg-[#0e0624]/90 hover:bg-[#190b3b] hover:border-purple-400/50 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(7,3,20,0.6)] hover:scale-[1.01]"
            >
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Command Palette</span>
              <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#070314] text-purple-300 border border-purple-500/30 rounded shadow-xs">
                ⌘K
              </kbd>
            </button>
          )}

          <Link
            href="/#pricing"
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-purple-200 border border-purple-500/20 bg-[#0c051f]/70 hover:bg-[#160a36] hover:text-white rounded-xl transition-all text-center"
          >
            Subscription Access (from €3/mo)
          </Link>
        </div>

        {/* Live Interactive Command Center Showcase Deck with Purple Styling & Border Beam */}
        <div className="max-w-5xl mx-auto bg-[#0a041b] border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_0_100px_-15px_rgba(168,85,247,0.45)] transition-all relative">
          
          {/* Deck Browser Topbar */}
          <div className="bg-[#0e0624]/95 px-4 py-3 border-b border-purple-500/25 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              </div>
              <span className="text-xs font-mono text-purple-300/80 bg-[#070314] px-3 py-1 rounded-md border border-purple-500/25 flex items-center gap-1.5">
                <span className="text-purple-400">🔒</span>
                <span>https://templatehub.website/v3/amethyst-engine</span>
              </span>
            </div>

            {/* Deck Feature Tabs */}
            <div className="flex items-center bg-[#070314] p-1 rounded-xl border border-purple-500/25 gap-1 text-xs">
              <button
                onClick={() => setActiveTab('sandbox')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeTab === 'sandbox'
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                ⚡ Live Sandbox
              </button>
              <button
                onClick={() => setActiveTab('inspector')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeTab === 'inspector'
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                🔍 Telemetry
              </button>
              <button
                onClick={() => setActiveTab('packager')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  activeTab === 'packager'
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                    : 'text-purple-300/70 hover:text-white'
                }`}
              >
                📦 Store Auto-Edit
              </button>
            </div>
          </div>

          {/* Deck Body */}
          <div className="p-6 bg-[#0a041b]">
            {activeTab === 'sandbox' && (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-purple-500/25 bg-[#070314]">
                <iframe
                  src="/templates/astral-aerospace/index.html"
                  title="ASTRAL Aerospace Live Masterpiece Showcase"
                  className="w-full h-full border-0"
                  loading="eager"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <Link
                    href="/templates/astral-aerospace"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-950/90 text-purple-200 border border-purple-500/40 hover:bg-purple-900 transition-colors shadow-lg backdrop-blur-md flex items-center gap-1.5"
                  >
                    <span>Full Screen Masterpiece</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'inspector' && (
              <div className="aspect-[16/9] w-full rounded-xl border border-purple-500/25 bg-[#070314] p-6 font-mono text-xs overflow-y-auto space-y-4">
                <div className="flex items-center justify-between text-purple-400 border-b border-purple-500/20 pb-3">
                  <span className="font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    ACTIVE COMPLIANCE HARNESS
                  </span>
                  <span className="text-purple-300 text-[10px]">ALL 36 TEMPLATES VALIDATED</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#0e0624] rounded-lg border border-purple-500/20">
                    <div className="text-purple-400/80 text-[10px]">HTML5 CONFORMANCE</div>
                    <div className="text-lg font-bold text-emerald-400">100% STRICT</div>
                    <div className="text-[10px] text-purple-300/60 mt-1">Zero hydration mismatches</div>
                  </div>
                  <div className="p-3 bg-[#0e0624] rounded-lg border border-purple-500/20">
                    <div className="text-purple-400/80 text-[10px]">EXTERNAL RUNTIME LIBS</div>
                    <div className="text-lg font-bold text-white">0 DEPENDENCIES</div>
                    <div className="text-[10px] text-purple-300/60 mt-1">Single-file autonomy</div>
                  </div>
                  <div className="p-3 bg-[#0e0624] rounded-lg border border-purple-500/20">
                    <div className="text-purple-400/80 text-[10px]">WCAG CONTRAST RATIO</div>
                    <div className="text-lg font-bold text-purple-300">AAA CERTIFIED</div>
                    <div className="text-[10px] text-purple-300/60 mt-1">High-legibility ratios</div>
                  </div>
                </div>
                <div className="p-4 bg-[#070314] rounded-lg border border-purple-500/20 text-purple-200/90 leading-relaxed text-[11px]">
                  <code>
                    <span className="text-fuchsia-400">&lt;!DOCTYPE html&gt;</span><br />
                    <span className="text-purple-300">&lt;html lang=&quot;en&quot; class=&quot;dark scroll-smooth&quot;&gt;</span><br />
                    &nbsp;&nbsp;<span className="text-purple-400">&lt;head&gt;</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;meta charset=&quot;UTF-8&quot; /&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;style&gt;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:root &#123; --brand-primary: #a855f7; --brand-glow: rgba(168,85,247,0.4); &#125;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/style&gt;<br />
                    &nbsp;&nbsp;<span className="text-purple-400">&lt;/head&gt;</span>
                  </code>
                </div>
              </div>
            )}

            {activeTab === 'packager' && (
              <div className="aspect-[16/9] w-full rounded-xl border border-purple-500/25 bg-[#070314] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">🪄</span>
                    <h3 className="text-sm font-bold text-white">Store Auto-Edit &amp; PKZIP Engine</h3>
                  </div>
                  <p className="text-xs text-purple-200/80 leading-relaxed mb-4">
                    Subscribers can instantly inject brand headlines, products, contacts, and custom store photos with live DOM replacement right in the browser, then download clean standalone ZIP bundles.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-[#0e0624] rounded-lg border border-purple-500/20">
                      <div className="text-base font-bold text-purple-300">1-Click</div>
                      <div className="text-[10px] text-purple-400/80 mt-0.5">Live DOM Inject</div>
                    </div>
                    <div className="p-3 bg-[#0e0624] rounded-lg border border-purple-500/20">
                      <div className="text-base font-bold text-fuchsia-300">Local</div>
                      <div className="text-[10px] text-purple-400/80 mt-0.5">Image Base64 Map</div>
                    </div>
                    <div className="p-3 bg-[#0e0624] rounded-lg border border-purple-500/20">
                      <div className="text-base font-bold text-emerald-300">Clean ZIP</div>
                      <div className="text-[10px] text-purple-400/80 mt-0.5">Zero Build System</div>
                    </div>
                    <div className="p-3 bg-[#0e0624] rounded-lg border border-purple-500/20">
                      <div className="text-base font-bold text-cyan-300">Protected</div>
                      <div className="text-[10px] text-purple-400/80 mt-0.5">Clerk Tier Guarded</div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
                  <span className="text-[11px] text-purple-300/80 font-mono">Available on all 36 template pages</span>
                  <Link
                    href="/templates/astral-aerospace"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-lg text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform"
                  >
                    Open Auto-Edit Studio →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Deck Bottom Bar */}
          <div className="px-6 py-3 bg-[#070314] border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-purple-300/80">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
              <span>All 36 Masterpiece Codebases Ready for Deployment</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="text-purple-400">STANDALONE HTML5</span>
              <span>•</span>
              <span className="text-fuchsia-300">REACTIVE CSS</span>
              <span>•</span>
              <span className="text-emerald-300">ZERO NPM</span>
            </div>
          </div>
        </div>

        {/* Floating Telemetry Physics Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-purple-300/90">
          <div className="px-4 py-2 rounded-xl bg-[#0e0624]/80 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center gap-2 animate-float">
            <span className="text-purple-400 font-bold">⚡</span>
            <span>DOM Boot: &lt; 15ms</span>
          </div>

          <div className="px-4 py-2 rounded-xl bg-[#0e0624]/80 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center gap-2 animate-float-delayed">
            <span className="text-fuchsia-400 font-bold">💎</span>
            <span>Cyber-Amethyst Engine</span>
          </div>

          <div className="px-4 py-2 rounded-xl bg-[#0e0624]/80 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center gap-2 animate-float">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Commercial Perpetual Rights</span>
          </div>
        </div>

      </div>
    </div>
  );
}
