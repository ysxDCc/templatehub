'use client';

import { useState } from 'react';
import { cyberSound } from '@/lib/sound';

interface SinglePurchaseButtonProps {
  templateId: string;
  templateName: string;
  className?: string;
}

export default function SinglePurchaseButton({
  templateId,
  templateName,
  className = '',
}: SinglePurchaseButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuySingle = async () => {
    cyberSound.playClick();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: 'single',
          templateId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize checkout');
      }

      if (data.checkoutUrl) {
        cyberSound.playSuccess();
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Checkout URL not returned');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err?.message || 'Checkout failed');
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-1.5">
      <button
        onClick={handleBuySingle}
        disabled={loading}
        className={`w-full min-h-11 py-2.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border bg-[#13072e] hover:bg-[#1f0b4d] text-purple-200 hover:text-white border-purple-500/40 hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        <span>⚡</span>
        <span>
          {loading ? 'Initializing Checkout…' : 'Buy Single Template — €9 One-Time'}
        </span>
      </button>

      {error && (
        <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/25 p-2 rounded-lg text-center leading-tight">
          {error}
        </div>
      )}
    </div>
  );
}
