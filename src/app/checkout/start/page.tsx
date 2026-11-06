'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

function CheckoutStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'pro';
  const { user, isLoaded, isSignedIn } = useUser();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      // Must be signed in first
      router.replace(`/signup?plan=${planId}`);
      return;
    }

    let isMounted = true;

    async function initiateCheckout() {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId,
            customerEmail: user?.primaryEmailAddress?.emailAddress,
            customerName: user?.fullName || user?.firstName,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.checkoutUrl) {
          throw new Error(data.error || 'Failed to initialize free trial checkout session.');
        }

        if (isMounted) {
          // Redirect directly to Dodo Payments secure checkout
          window.location.href = data.checkoutUrl;
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Checkout error:', err);
          setError(err?.message || 'Unable to connect to payment gateway. Please try again.');
        }
      }
    }

    initiateCheckout();

    return () => {
      isMounted = false;
    };
  }, [isLoaded, isSignedIn, user, planId, router]);

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-16 bg-[#070314]">
      <div className="max-w-md w-full bg-[#0d0624] border border-purple-500/40 rounded-3xl p-8 text-center shadow-[0_0_60px_rgba(168,85,247,0.35)] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-24 bg-purple-600/30 blur-2xl pointer-events-none" />

        {error ? (
          <div>
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto mb-4 text-rose-400 text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Checkout Connection Error</h2>
            <p className="text-xs text-rose-300 mb-6 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
              {error}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="py-2.5 px-5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                Retry
              </button>
              <button
                onClick={() => router.push('/')}
                className="py-2.5 px-5 rounded-xl font-bold text-xs bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30 transition-all cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative w-16 h-16 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/20"></div>
              <div className="absolute inset-0 rounded-full border-2 border-purple-400 border-t-transparent animate-spin"></div>
              <div className="absolute inset-3 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-300 text-sm font-bold">
                ✦
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>3-DAY FREE TRIAL • €0 TODAY</span>
            </div>

            <h2 className="text-xl font-extrabold text-white mb-2">
              Preparing Your Free Trial Checkout
            </h2>
            <p className="text-xs text-purple-200/75 max-w-xs mx-auto mb-6 leading-relaxed">
              Redirecting you to Dodo Payments secure 256-bit checkout to confirm your payment details. You will not be charged today.
            </p>

            <div className="flex items-center justify-center gap-2 text-[11px] text-purple-300/60 font-mono">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              <span>TLS Encrypted • Apple Pay / Google Pay / Cards</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutStartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-[#070314]">
          <div className="w-8 h-8 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
        </div>
      }
    >
      <CheckoutStartContent />
    </Suspense>
  );
}
