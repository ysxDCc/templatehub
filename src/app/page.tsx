'use client';

import { useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import ShowcaseMarquee from '@/components/ShowcaseMarquee';
import MasterpieceBentoGrid from '@/components/MasterpieceBentoGrid';
import TemplateCard from '@/components/TemplateCard';
import PricingCard from '@/components/PricingCard';
import CommandPalette from '@/components/CommandPalette';
import { templates } from '@/data/templates';
import { pricingPlans } from '@/data/pricing';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const filterChips = [
    { id: 'all', label: 'All Masterpieces (56)', icon: '✦' },
    { id: 'saas-ai', label: 'SaaS & AI Studios', icon: '🤖', match: ['saas', 'ai', 'cloud'] },
    { id: 'aerospace-defense', label: 'Aerospace & Cyber', icon: '🚀', match: ['aerospace', 'security', 'cyberpunk'] },
    { id: 'motorsport-gaming', label: 'Motorsport & Esports', icon: '🏎️', match: ['motorsport', 'gaming'] },
    { id: 'architecture-luxury', label: 'Architecture & Living', icon: '🏛️', match: ['architecture', 'furniture', 'luxury', 'real-estate'] },
    { id: 'biotech-fintech', label: 'Biotech & Fintech', icon: '🧬', match: ['biotech', 'fintech', 'crypto'] },
  ];

  const filteredTemplates = templates.filter((t) => {
    if (activeCategory === 'all') return true;
    const chip = filterChips.find((c) => c.id === activeCategory);
    return chip && chip.match ? chip.match.includes(t.category) : true;
  }).slice(0, 8);

  return (
    <div className="flex flex-col bg-[#070314] min-h-screen text-purple-100">
      {/* 1. Atmospheric Masterpiece Hero with Particle Physics */}
      <Hero onOpenCommandPalette={() => setIsCommandOpen(true)} />

      {/* 2. Infinite Continuous Showcase Marquee */}
      <ShowcaseMarquee />

      {/* 3. Interactive Masterpiece Bento Grid */}
      <MasterpieceBentoGrid />

      {/* 4. Live Curated Masterpiece Showcase with Instant Category Switcher */}
      <section className="py-28 border-b border-purple-500/20 bg-[#09041b] relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 mb-2.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping"></span>
                <span>CURATED ARCHIVE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                Featured Production Masterpieces
              </h2>
              <p className="text-sm text-purple-200/75 max-w-xl leading-relaxed">
                Filter by specialized vertical. Every template includes 100% responsive testing, WCAG AAA accessibility, and zero external build tooling.
              </p>
            </div>

            <Link
              href="/templates"
              className="text-xs font-bold text-white px-5 py-3 rounded-xl border border-purple-500/30 bg-[#0e0624] hover:bg-[#190b3b] hover:border-purple-400/50 transition-all flex items-center gap-2 self-start md:self-auto shrink-0 shadow-[0_4px_20px_rgba(7,3,20,0.6)]"
            >
              <span>View All 56 Templates</span>
              <span className="text-purple-400">→</span>
            </Link>
          </div>

          {/* Quick Filter Category Chips */}
          <div className="flex overflow-x-auto pb-4 gap-2.5 mb-10 hide-scrollbar">
            {filterChips.map((chip) => {
              const isSelected = activeCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setActiveCategory(chip.id)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 text-white border-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.45)] font-bold scale-[1.02]'
                      : 'bg-[#0e0624]/90 border-purple-500/20 text-purple-300 hover:text-white hover:border-purple-400/40'
                  }`}
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Masterpiece Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 hover:from-purple-500 hover:via-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95 shimmer-active"
            >
              <span>Explore Complete 56-Template Registry</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Flat Subscription Pricing Section */}
      <section id="pricing" className="py-28 border-b border-purple-500/20 bg-[#070314] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/35 bg-purple-500/10 text-purple-300 text-xs font-mono uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              <span>✦ TRANSPARENT MEMBERSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
              Developer-First Flat Subscriptions
            </h2>
            <p className="text-sm sm:text-base text-purple-200/75 leading-relaxed">
              Cancel anytime. Downloaded template files and commercial perpetual rights remain yours forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Supported Global Payment Rails */}
          <div className="mt-14 pt-8 border-t border-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-purple-300/80">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span>256-bit TLS Encrypted Global Checkout via Dodo Payments</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-purple-400 font-mono text-[11px]">Accepted Rails:</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0e0624] border border-purple-500/25 text-purple-200 font-medium text-[11px]">Apple Pay</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0e0624] border border-purple-500/25 text-purple-200 font-medium text-[11px]">Google Pay</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0e0624] border border-purple-500/25 text-purple-200 font-medium text-[11px]">Visa &amp; Mastercard</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Commercial License & Technical FAQ */}
      <section id="license" className="py-28 border-b border-purple-500/20 bg-[#09041b] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Technical Architecture &amp; Licensing FAQ
            </h2>
            <p className="text-sm text-purple-200/75">Everything engineers need to know about code ownership, licenses, and tooling.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-7 rounded-2xl border border-purple-500/25 bg-[#0d0622]/85 backdrop-blur-md shadow-[0_4px_25px_rgba(7,3,20,0.6)]">
              <div className="text-purple-400 text-sm mb-3 font-mono font-bold">01 // Delivery Format</div>
              <h3 className="text-base font-bold text-white mb-2">Standalone Codebases</h3>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Every template ships as a pure, self-sufficient HTML5 file. All styling is defined via semantic CSS variables and embedded CSS. Zero build steps required to preview or host.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-purple-500/25 bg-[#0d0622]/85 backdrop-blur-md shadow-[0_4px_25px_rgba(7,3,20,0.6)]">
              <div className="text-purple-400 text-sm mb-3 font-mono font-bold">02 // Perpetual Licensing</div>
              <h3 className="text-base font-bold text-white mb-2">Unlimited Commercial Rights</h3>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Use downloaded templates across unlimited client or personal production projects. Even if your subscription lapses, code you downloaded remains 100% yours forever.
              </p>
            </div>

            <div className="p-7 rounded-2xl border border-purple-500/25 bg-[#0d0622]/85 backdrop-blur-md shadow-[0_4px_25px_rgba(7,3,20,0.6)]">
              <div className="text-purple-400 text-sm mb-3 font-mono font-bold">03 // Framework Agnostic</div>
              <h3 className="text-base font-bold text-white mb-2">Instant React / Vue Portability</h3>
              <p className="text-xs text-purple-200/75 leading-relaxed">
                Because the markup is pure semantic HTML5, you can copy sections directly into Next.js, Astro, Nuxt, Svelte, or plain static hosts with zero migration friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Radiant Purple Launch CTA */}
      <section className="py-24 bg-[#070314] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#160838] to-[#0a0319] border border-purple-500/35 shadow-[0_0_80px_rgba(168,85,247,0.3)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-fuchsia-500/20 blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/35 inline-block mb-4">
                Instant Access
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Ready to Deploy Your Next Masterpiece?
              </h2>
              <p className="text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto mb-8 leading-relaxed">
                Join hundreds of engineers, creators, and agencies shipping lightning-fast, zero-dependency websites in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/templates"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 hover:from-purple-500 hover:via-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all hover:scale-105 shimmer-active"
                >
                  Browse All 56 Templates →
                </Link>
                <Link
                  href="/#pricing"
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#070314] text-purple-200 border border-purple-500/30 hover:border-purple-400 text-xs font-semibold rounded-xl transition-colors"
                >
                  View Subscription Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Command Palette Trigger */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </div>
  );
}
