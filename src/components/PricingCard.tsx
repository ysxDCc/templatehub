'use client';

import { PricingPlan } from '@/types';
import Link from 'next/link';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const isHighlighted = plan.id === 'pro';

  return (
    <div className={`relative flex flex-col p-6 rounded-xl transition-all duration-200 ${
      isHighlighted 
        ? 'bg-zinc-900 border-2 border-indigo-500/80 shadow-lg shadow-indigo-500/10' 
        : 'bg-zinc-900/60 border border-white/[0.08]'
    }`}>
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider py-0.5 px-2.5 rounded-full">
            Recommended
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-white mb-1.5">{plan.name}</h3>
        <p className="text-xs text-zinc-400 min-h-[32px] leading-relaxed">{plan.description}</p>
      </div>

      {/* Price figure */}
      <div className="mb-6 pb-6 border-b border-white/[0.08] flex items-baseline text-white">
        <span className="text-4xl font-bold tracking-tight">€{plan.price}</span>
        <span className="ml-1.5 text-xs text-zinc-400 font-medium">/{plan.interval}</span>
      </div>

      {/* Features list */}
      <ul className="flex-1 space-y-2.5 mb-8 text-xs text-zinc-300">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Action Button */}
      <Link
        href="/signup"
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs text-center transition-colors block ${
          isHighlighted
            ? 'bg-white text-zinc-950 hover:bg-zinc-200 font-semibold shadow-xs'
            : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10'
        }`}
      >
        {plan.id === 'free' ? 'Start for free' : `Choose ${plan.name}`}
      </Link>
    </div>
  );
}
