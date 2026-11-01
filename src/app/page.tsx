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
    { id: 'all', label: 'All Masterpieces (36)', icon: '✦' },
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
    <div className="flex flex-col bg-[#060609] min-h-screen">
      {/* 1. Atmospheric Masterpiece Hero */}
      <Hero onOpenCommandPalette={() => setIsCommandOpen(true)} />

      {/* 2. Infinite Continuous Showcase Marquee */}
      <ShowcaseMarquee />

      {/* 3. Interactive Masterpiece Bento Grid */}
      <MasterpieceBentoGrid />

      {/* 4. Live Curated Masterpiece Showcase with Instant Category Switcher */}
      <section className="py-24 border-b border-white/[0.08] bg-[#07070b] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2 font-bold">
                <span>●</span>
                <span>CURATED ARCHIVE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                Featured Production Masterpieces
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                Filter by specialized vertical. Every template includes 100% responsive testing, WCAG AAA accessibility, and zero external build tooling.
              </p>
            </div>

            <Link
              href="/templates"
              className="text-xs font-semibold text-white px-4 py-2.5 rounded-xl border border-white/15 bg-zinc-900/80 hover:bg-zinc-800 transition-colors flex items-center gap-2 self-start md:self-auto shrink-0 shadow-lg"
            >
              <span>View All 36 Templates</span>
              <span>→</span>
            </Link>
          </div>

          {/* Quick Filter Category Chips */}
          <div className="flex overflow-x-auto pb-4 gap-2 mb-10 hide-scrollbar">
            {filterChips.map((chip) => {
              const isSelected = activeCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setActiveCategory(chip.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-white text-zinc-950 border-white shadow-lg shadow-white/10 font-bold scale-[1.02]'
                      : 'bg-zinc-950/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>

          {/* Masterpiece Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-bold rounded-xl border border-white/15 transition-all shadow-xl hover:scale-[1.02]"
            >
              <span>Explore Complete 36-Template Registry</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Pricing Section */}
      <section id="pricing" className="py-24 border-b border-white/[0.08] bg-[#060609]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-3">
              <span>✦ TRANSPARENT MEMBERSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Developer-First Flat Subscriptions
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Cancel anytime. Downloaded template files and commercial rights remain yours forever in perpetuity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Supported Global Payment Rails */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>256-bit TLS Encrypted Global Checkout via Dodo Payments</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">Supported Rails:</span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-200 font-medium">Apple Pay</span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-200 font-medium">Google Pay</span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-200 font-medium">Visa &amp; Mastercard</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Commercial License & Technical FAQ */}
      <section id="license" className="py-24 border-b border-white/[0.08] bg-[#07070b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
              Technical Architecture &amp; Licensing FAQ
            </h2>
            <p className="text-sm text-zinc-400">Everything developers need to know about code ownership, licenses, and tooling.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md">
              <div className="text-indigo-400 text-lg mb-2 font-mono">01 // Delivery Format</div>
              <h3 className="text-sm font-bold text-white mb-2">How are the templates delivered?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                As clean, production-ready standalone HTML5 files with embedded, modern CSS variables and vanilla JavaScript. Also available as instant full-project `.zip` archives with README, configs, and license terms.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md">
              <div className="text-emerald-400 text-lg mb-2 font-mono">02 // Commercial Rights</div>
              <h3 className="text-sm font-bold text-white mb-2">Can I ship client websites?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Yes. Active Basic (€3/mo) and Pro (€10/mo) subscriptions grant unlimited worldwide commercial deployment rights for client projects and SaaS apps with zero attribution required.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md">
              <div className="text-amber-400 text-lg mb-2 font-mono">03 // Perpetual Ownership</div>
              <h3 className="text-sm font-bold text-white mb-2">What happens if I cancel?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Any template code downloaded while subscribed remains yours to use and deploy forever. There are zero recurring runtime license gates or call-home verification checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom High-Impact Call To Action */}
      <section className="py-24 bg-[#060609]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 md:p-16 rounded-3xl border border-white/15 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl relative z-10">
              <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest font-bold block mb-2">
                START BUILDING TODAY
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
                Claim your starter template and deploy in minutes.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Join thousands of engineers and studios shipping high-converting websites without framework drag. Free starter tier included.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 relative z-10">
              <Link
                href="/signup"
                className="px-6 py-3.5 bg-white text-zinc-950 font-bold text-xs rounded-xl hover:bg-zinc-200 transition-all shadow-xl hover:scale-105"
              >
                Create Free Account
              </Link>
              <Link
                href="/templates"
                className="px-6 py-3.5 text-zinc-300 hover:text-white border border-white/15 rounded-xl text-xs font-semibold hover:bg-zinc-800 transition-colors"
              >
                Browse All 36
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </div>
  );
}
