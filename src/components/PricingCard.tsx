'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import type { PricingPlan } from '@/types';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const highlighted = !!plan.highlighted;
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!plan.dodoProductId) return;

    // Plans are attached to accounts by email, so buyers must have an account
    // first. /checkout/start sends them through sign-up and back to payment.
    if (!isSignedIn) {
      router.push(`/checkout/start?plan=${plan.id}`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          customerEmail: user?.primaryEmailAddress?.emailAddress,
          customerName: user?.fullName || user?.firstName,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error || 'Could not start checkout.');
      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  const ctaLabel = plan.id === 'free' ? 'Start for free' : plan.trialDays ? `Start ${plan.trialDays}-day free trial` : `Choose ${plan.name}`;

  return (
    <div
      className={`relative h-full flex flex-col p-6 rounded-card border transition-[border-color,transform] duration-300 ${
        highlighted
          ? 'bg-raised border-primary shadow-[0_24px_60px_-24px_rgb(124_58_237/0.7)]'
          : 'bg-surface border-line hover:border-line-strong'
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
          Most popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted leading-relaxed min-h-[2.75rem]">{plan.description}</p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-ink tracking-tight">€{plan.price}</span>
        <span className="text-sm text-muted">/ month</span>
      </div>
      {plan.trialDays ? (
        <p className="mt-1 text-sm font-medium text-success">€0 today · {plan.trialDays} days free</p>
      ) : (
        <p className="mt-1 text-sm text-transparent select-none" aria-hidden="true">.</p>
      )}

      <ul className="mt-6 mb-6 flex-1 space-y-3 text-[15px] text-ink/90">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <svg aria-hidden="true" className="w-5 h-5 shrink-0 text-lilac" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      {error && (
        <p role="alert" className="mb-3 text-sm text-rose-200 bg-rose-500/15 border border-rose-500/30 rounded-control p-2 text-center">
          {error}
        </p>
      )}

      {plan.id === 'free' ? (
        <Link
          href="/signup"
          className="inline-flex items-center justify-center min-h-12 rounded-control font-semibold bg-raised border border-line text-ink hover:border-line-strong transition-colors active:scale-[0.97]"
        >
          {ctaLabel}
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 min-h-12 rounded-control font-semibold transition-colors active:scale-[0.97] disabled:opacity-60 ${
            highlighted ? 'bg-primary hover:bg-primary-hover text-white' : 'bg-raised border border-line text-ink hover:border-line-strong'
          }`}
        >
          {loading ? 'Opening secure checkout…' : ctaLabel}
        </button>
      )}

      {plan.trialDays ? (
        <p className="mt-3 text-xs text-muted leading-relaxed text-center">
          After {plan.trialDays} days, €{plan.price}/month until you cancel. Cancel before the trial ends to pay nothing.{' '}
          <Link href="/terms#subscriptions" className="underline text-lilac">Terms</Link>
        </p>
      ) : null}
    </div>
  );
}
