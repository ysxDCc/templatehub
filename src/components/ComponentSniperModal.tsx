'use client';

import { useState } from 'react';
import { cyberSound } from '@/lib/sound';
import { convertHtmlToReact } from '@/lib/transpiler';

interface ComponentSniperModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  rawHtml: string;
}

type SectionKey = 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta';

export default function ComponentSniperModal({
  isOpen,
  onClose,
  templateName,
  rawHtml,
}: ComponentSniperModalProps) {
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [outputFormat, setOutputFormat] = useState<'html' | 'jsx'>('jsx');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Extract sections heuristically or provide tailored modular blocks
  const extractSection = (key: SectionKey): string => {
    if (!rawHtml) return '<!-- Source code unavailable -->';

    // Regex matchers for common semantic tags
    let match: RegExpMatchArray | null = null;
    if (key === 'hero') {
      match = rawHtml.match(/<header[\s\S]*?<\/header>|<section[^>]*(?:hero|header|banner)[^>]*>[\s\S]*?<\/section>/i);
    } else if (key === 'features') {
      match = rawHtml.match(/<section[^>]*(?:feature|grid|bento|services)[^>]*>[\s\S]*?<\/section>/i);
    } else if (key === 'pricing') {
      match = rawHtml.match(/<section[^>]*(?:pricing|plan|tier|table)[^>]*>[\s\S]*?<\/section>/i);
    } else if (key === 'testimonials') {
      match = rawHtml.match(/<section[^>]*(?:testimonial|review|social-proof|quote)[^>]*>[\s\S]*?<\/section>/i);
    } else if (key === 'cta') {
      match = rawHtml.match(/<section[^>]*(?:cta|call-to-action|newsletter|action)[^>]*>[\s\S]*?<\/section>/i);
    }

    if (match && match[0]) {
      return match[0].trim();
    }

    // High-quality fallback component snippet tailored to the template
    const fallbacks: Record<SectionKey, string> = {
      hero: `<section class="relative py-24 px-6 text-center max-w-5xl mx-auto">\n  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono mb-6">\n    ✦ Autonomous Production Engine\n  </div>\n  <h1 class="text-5xl sm:text-7xl font-black text-white tracking-tight mb-6">\n    Build Sovereign Systems with Zero Bloat\n  </h1>\n  <p class="text-lg text-purple-200/80 max-w-2xl mx-auto mb-8 leading-relaxed">\n    Engineered for speed, conversion, and effortless commercial deployment.\n  </p>\n  <div class="flex items-center justify-center gap-4">\n    <a href="#action" class="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all">Get Started Now</a>\n    <a href="#docs" class="px-6 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-semibold text-sm hover:bg-zinc-800 transition-all">Explore Architecture</a>\n  </div>\n</section>`,
      features: `<section class="py-20 px-6 max-w-7xl mx-auto">\n  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">\n    <div class="p-6 rounded-2xl bg-[#0e0624] border border-purple-500/20 hover:border-purple-400 transition-all">\n      <div class="text-3xl mb-4">⚡</div>\n      <h3 class="text-lg font-bold text-white mb-2">Sub-20ms Latency</h3>\n      <p class="text-xs text-zinc-400 leading-relaxed">Pure vanilla HTML/CSS architecture eliminates runtime compilation delays.</p>\n    </div>\n    <div class="p-6 rounded-2xl bg-[#0e0624] border border-purple-500/20 hover:border-purple-400 transition-all">\n      <div class="text-3xl mb-4">🛡️</div>\n      <h3 class="text-lg font-bold text-white mb-2">Air-Gapped Security</h3>\n      <p class="text-xs text-zinc-400 leading-relaxed">Zero third-party script vulnerabilities or supply-chain telemetry injection.</p>\n    </div>\n    <div class="p-6 rounded-2xl bg-[#0e0624] border border-purple-500/20 hover:border-purple-400 transition-all">\n      <div class="text-3xl mb-4">📐</div>\n      <h3 class="text-lg font-bold text-white mb-2">CSS Token Scalability</h3>\n      <p class="text-xs text-zinc-400 leading-relaxed">Single-point palette mutation with responsive container queries built in.</p>\n    </div>\n  </div>\n</section>`,
      pricing: `<section class="py-20 px-6 max-w-5xl mx-auto">\n  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">\n    <div class="p-8 rounded-3xl bg-[#0e0624] border border-white/10">\n      <div class="text-sm font-bold text-purple-300 uppercase">Starter Tier</div>\n      <div class="text-4xl font-black text-white my-3">€9.00 <span class="text-xs text-zinc-500 font-normal">/ lifetime</span></div>\n      <p class="text-xs text-zinc-400 mb-6">Complete standalone codebase with perpetual commercial rights.</p>\n      <button class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs">Choose Starter</button>\n    </div>\n    <div class="p-8 rounded-3xl bg-[#0e0624] border border-purple-500/40 relative shadow-2xl">\n      <div class="text-sm font-bold text-fuchsia-400 uppercase">Pro All-Access</div>\n      <div class="text-4xl font-black text-white my-3">€10.00 <span class="text-xs text-zinc-500 font-normal">/ month</span></div>\n      <p class="text-xs text-zinc-400 mb-6">Unlimited downloads, monthly drops, and multi-format transpiler access.</p>\n      <button class="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/30">Unlock All</button>\n    </div>\n  </div>\n</section>`,
      testimonials: `<section class="py-16 px-6 max-w-4xl mx-auto">\n  <div class="p-8 rounded-3xl bg-[#0e0624] border border-purple-500/25 text-center">\n    <div class="text-amber-400 text-lg mb-3">★★★★★</div>\n    <p class="text-base sm:text-lg text-white font-medium italic mb-4 leading-relaxed">\n      "This single component transformed our agency's landing page conversion rate overnight. Cleanest HTML we've ever purchased."\n    </p>\n    <div class="text-xs font-bold text-purple-300">Marcus Sterling — Founder, Veloce Labs</div>\n  </div>\n</section>`,
      cta: `<section class="py-20 px-6 max-w-5xl mx-auto text-center bg-gradient-to-r from-purple-900/30 via-violet-900/20 to-fuchsia-900/30 rounded-3xl border border-purple-500/30 p-12">\n  <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Deploy Your Masterpiece?</h2>\n  <p class="text-xs sm:text-sm text-purple-200/80 mb-6 max-w-xl mx-auto">Instant setup. Zero build steps. Drop directly into any hosting provider.</p>\n  <button class="px-8 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-all shadow-xl">Start Building Today →</button>\n</section>`,
    };

    return fallbacks[key];
  };

  const rawSnippet = extractSection(activeSection);
  const displayCode =
    outputFormat === 'jsx'
      ? convertHtmlToReact(rawSnippet, `${templateName}_${activeSection}`)
      : rawSnippet;

  const handleCopy = () => {
    cyberSound.playSuccess();
    navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections: { id: SectionKey; label: string; icon: string }[] = [
    { id: 'hero', label: 'Hero Header', icon: '⚡' },
    { id: 'features', label: 'Bento Grid', icon: '🧱' },
    { id: 'pricing', label: 'Pricing Table', icon: '💳' },
    { id: 'testimonials', label: 'Social Proof', icon: '💬' },
    { id: 'cta', label: 'Call-to-Action', icon: '🚀' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-3xl bg-[#090317] border border-purple-500/35 p-6 sm:p-8 shadow-[0_0_80px_rgba(168,85,247,0.3)] relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Sniper Mode — Component Snatcher
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Modular Export
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Extract isolated sections from {templateName} with zero extra bloat
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              cyberSound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#070314] border border-white/10 text-zinc-400 hover:text-white flex items-center justify-center text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4 shrink-0 overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-1.5">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  cyberSound.playClick();
                  setActiveSection(s.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeSection === s.id
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'bg-[#0e0624] border border-purple-500/20 text-purple-300/70 hover:text-white'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Format Switcher */}
          <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => {
                cyberSound.playClick();
                setOutputFormat('jsx');
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                outputFormat === 'jsx'
                  ? 'bg-purple-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              React / Next.js
            </button>
            <button
              onClick={() => {
                cyberSound.playClick();
                setOutputFormat('html');
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                outputFormat === 'html'
                  ? 'bg-purple-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Raw HTML5
            </button>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="flex-1 bg-[#070314] rounded-2xl border border-purple-500/20 p-4 font-mono text-xs overflow-auto relative">
          <pre className="text-purple-200/90 leading-5 whitespace-pre">
            {displayCode}
          </pre>

          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>{copied ? '✓' : '📋'}</span>
            <span>{copied ? 'Copied Component!' : `Copy ${outputFormat.toUpperCase()}`}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-4 flex items-center justify-between text-xs text-zinc-500 font-mono shrink-0">
          <span>Isolated component snippet • Fully responsive</span>
          <span>Zero dependencies</span>
        </div>
      </div>
    </div>
  );
}
