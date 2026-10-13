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

      {error && (
        <p className="text-xs text-rose-400 mb-3 bg-rose-500/10 p-2 rounded border border-rose-500/20 text-center">
          {error}
        </p>
      )}

      {/* Action Button */}
      {plan.id === 'free' ? (
        <Link
          href="/signup"
          className="w-full py-2.5 px-4 rounded-lg font-medium text-xs text-center transition-colors block bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10"
        >
          Start for free
        </Link>
      ) : (
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs text-center transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            isHighlighted
              ? 'bg-white text-zinc-950 hover:bg-zinc-200 font-semibold shadow-xs'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
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
          ) : (
            <span>Upgrade to {plan.name}</span>
          )}
        </button>
      )}
    </div>
  );
}
