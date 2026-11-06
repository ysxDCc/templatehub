'use client';

import { useState } from 'react';
import { PricingPlan } from '@/types';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const isHighlighted = plan.id === 'pro';
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!plan.dodoProductId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          customerEmail: user?.primaryEmailAddress?.emailAddress,
          customerName: user?.fullName || user?.firstName,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || 'Failed to initialize payment checkout.');
      }

      // Redirect user directly to Dodo Payments checkout
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err?.message || 'Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative flex flex-col p-6 rounded-2xl transition-all duration-300 ${
        isHighlighted
          ? 'bg-[#140838] border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.35)] scale-[1.02]'
          : 'bg-[#0d0622]/85 border border-purple-500/25 hover:border-purple-400/50 shadow-[0_4px_25px_rgba(7,3,20,0.7)]'
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 text-white text-[10px] font-extrabold uppercase tracking-widest py-1 px-3.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]">
            {plan.trialDays ? '3-DAY FREE TRIAL • POPULAR' : 'MOST POPULAR'}
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-1.5 flex items-center justify-between">
          <span>{plan.name}</span>
          {isHighlighted && (
            <span className="text-purple-400 text-sm">✦</span>
          )}
        </h3>
        <p className="text-xs text-purple-200/75 min-h-[32px] leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Price figure */}
      <div className="mb-6 pb-6 border-b border-purple-500/20">
        <div className="flex items-baseline text-white">
          <span className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
            €{plan.price}
          </span>
          <span className="ml-1.5 text-xs text-purple-300/70 font-medium font-mono">
            /{plan.interval}
          </span>
        </div>
        {plan.trialDays && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>€0 due today • 3 days free</span>
          </div>
        )}
      </div>

      {/* Features list */}
      <ul className="flex-1 space-y-3 mb-8 text-xs text-purple-200/90">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <svg
              className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {error && (
        <p className="text-xs text-rose-300 mb-3 bg-rose-500/15 p-2 rounded-lg border border-rose-500/30 text-center">
          {error}
        </p>
      )}

      {/* Action Button */}
      {plan.id === 'free' ? (
        <Link
          href="/signup"
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-center transition-all block bg-[#070314] text-purple-200 hover:text-white hover:bg-[#1a0b3b] border border-purple-500/30"
        >
          Start for Free
        </Link>
      ) : (
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs text-center transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            isHighlighted
              ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] hover:scale-[1.02] active:scale-98 shimmer-active'
              : 'bg-purple-900/60 hover:bg-purple-800 text-purple-100 border border-purple-500/40 hover:border-purple-400'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Connecting to checkout...</span>
            </>
          ) : plan.trialDays ? (
            <span>Start 3-Day Free Trial</span>
          ) : (
            <span>Upgrade to {plan.name}</span>
          )}
        </button>
      )}

      {plan.trialDays && (
        <p className="text-[10px] text-center text-purple-300/70 mt-2 font-mono">
          €0 charged today • €{plan.price}/mo after 3 days • Cancel anytime
        </p>
      )}
    </div>
  );
}
