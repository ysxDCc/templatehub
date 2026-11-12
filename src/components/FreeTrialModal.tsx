'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { TEMPLATE_COUNT } from '@/lib/site';

export default function FreeTrialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  // Watch for post-signup return or initial visit
  useEffect(() => {
    if (!isLoaded) return;

    // Check if user just signed up and has a pending trial checkout!
    if (isSignedIn && user && typeof window !== 'undefined') {
      const pending = localStorage.getItem('pending_trial_checkout');
      if (pending === 'pro') {
        localStorage.removeItem('pending_trial_checkout');
        // Instantly initiate checkout session and redirect!
        setIsOpen(true);
        setLoading(true);

        fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            planId: 'pro',
            customerEmail: user?.primaryEmailAddress?.emailAddress,
            customerName: user?.fullName || user?.firstName,
          }),
        })
          .then(async (res) => {
            const data = await res.json();
            if (data.checkoutUrl) {
              window.location.href = data.checkoutUrl;
            } else {
              setError(data.error || 'Failed to initialize checkout.');
              setLoading(false);
            }
          })
          .catch((err) => {
            console.error('Post-signup checkout error:', err);
            setError('Could not connect to payment gateway. Please try again.');
            setLoading(false);
          });
        return;
      }
    }

    // Do not show modal to existing paying subscribers
    const subscription = (user?.publicMetadata as any)?.subscription;
    if (subscription === 'pro' || subscription === 'enterprise') {
      return;
    }

    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('th_free_trial_dismissed');
    if (isDismissed) {
      return;
    }

    // Trigger popup smoothly after visitor lands
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, user]);

  const handleDismiss = () => {
    sessionStorage.setItem('th_free_trial_dismissed', 'true');
    setIsOpen(false);
  };

  const handleClaimTrial = async () => {
    setError(null);

    if (isSignedIn && user) {
      // User is already signed in -> Connect directly to Dodo Payments
      try {
        setLoading(true);
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId: 'pro',
            customerEmail: user?.primaryEmailAddress?.emailAddress,
            customerName: user?.fullName || user?.firstName,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.checkoutUrl) {
          throw new Error(data.error || 'Failed to initialize free trial checkout session.');
        }

        // Redirect directly to Dodo Payments checkout
        window.location.href = data.checkoutUrl;
      } catch (err: any) {
        console.error('Claim trial error:', err);
        setError(err?.message || 'Could not connect to payment gateway. Please try again.');
        setLoading(false);
      }
    } else {
      // User is not signed in -> Store intent, dismiss modal, and route to signup
      if (typeof window !== 'undefined') {
        localStorage.setItem('pending_trial_checkout', 'pro');
      }
      handleDismiss();
      router.push('/signup?plan=pro');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#070314]/85"
        onClick={loading ? undefined : handleDismiss}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg bg-[#0d0624] border-2 border-purple-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(168,85,247,0.5)] z-10 overflow-hidden transform transition-all animate-scaleUp"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-36 bg-gradient-to-r from-purple-600/40 via-fuchsia-600/40 to-violet-600/40 blur-3xl pointer-events-none" />

        {/* Close 'X' Button */}
        {!loading && (
          <button
            onClick={handleDismiss}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-purple-300/70 hover:text-white p-2 rounded-full hover:bg-purple-900/40 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>3-DAY FREE TRIAL • PRO ACCESS</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
          Unlock All {TEMPLATE_COUNT} Templates For Free
        </h2>

        {/* Subhead */}
        <p className="text-sm text-purple-200/80 mb-6 leading-relaxed">
          Start your 3-day complimentary Pro trial today. Full unrestricted access to every codebase, asset, and commercial license.
        </p>

        {/* Key value propositions */}
        <div className="space-y-3 mb-6 bg-[#070314]/70 p-4 rounded-2xl border border-purple-500/20">
          <div className="flex items-start gap-3 text-xs text-purple-200">
            <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5 text-purple-300 font-bold">
              ✓
            </div>
            <div>
              <strong className="text-white">€0 Charged Today:</strong> Free 3-day evaluation with instant download privileges.
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs text-purple-200">
            <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5 text-purple-300 font-bold">
              ✓
            </div>
            <div>
              <strong className="text-white">{TEMPLATE_COUNT} Production Codebases:</strong> SaaS, AI, Fintech, E-Commerce, Portfolios, and Dashboards.
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs text-purple-200">
            <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5 text-purple-300 font-bold">
              ✓
            </div>
            <div>
              <strong className="text-white">Zero Risk, Cancel Anytime:</strong> €10/month only begins after 3 days. Cancel anytime before trial ends.
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={handleClaimTrial}
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Connecting to payment gateway...</span>
            </>
          ) : (
            <>
              <span>Start 3-Day Free Trial — €0 Today</span>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>

        {/* Verification note */}
        <p className="text-[11px] text-center text-purple-300/60 mt-3 font-mono">
          Valid payment method required to activate trial • €0 billed today
        </p>

        {/* Dismiss link */}
        {!loading && (
          <div className="text-center mt-3">
            <button
              onClick={handleDismiss}
              className="text-xs text-purple-400/80 hover:text-purple-200 transition-colors underline underline-offset-4 cursor-pointer"
            >
              No thanks, I’ll browse manually
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
