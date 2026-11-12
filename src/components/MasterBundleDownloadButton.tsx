'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { cyberSound } from '@/lib/sound';
import type { SubscriptionTier } from '@/types';
import { TEMPLATE_COUNT } from '@/lib/site';

interface MasterBundleDownloadButtonProps {
  className?: string;
}

export default function MasterBundleDownloadButton({ className = '' }: MasterBundleDownloadButtonProps) {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownloadMasterBundle = async () => {
    cyberSound.playClick();
    setErrorMessage(null);

    if (!isSignedIn) {
      router.push('/signup');
      return;
    }

    const tier = (user?.publicMetadata?.subscription as SubscriptionTier | undefined) ?? 'free';
    if (tier !== 'pro' && tier !== 'enterprise') {
      setErrorMessage(`The ${TEMPLATE_COUNT}-template bundle is included with Pro and Enterprise.`);
      return;
    }

    setDownloading(true);

    try {
      const res = await fetch('/api/download/master-bundle');
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (res.status === 403) {
        const data = await res.json();
        setErrorMessage(data.error || 'Requires Pro or Enterprise plan');
        return;
      }

      if (res.ok) {
        cyberSound.playSuccess();
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TemplateHub-${TEMPLATE_COUNT}-Template-Bundle.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Download failed');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to download master pack');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleDownloadMasterBundle}
        disabled={downloading}
        className={`py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(232,121,249,0.35)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        <span className="text-sm">📦</span>
        <span>
          {downloading
            ? `Packing ${TEMPLATE_COUNT} templates (ZIP)…`
            : `Download all ${TEMPLATE_COUNT} templates (ZIP)`}
        </span>
      </button>

      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs text-center flex items-center justify-center gap-2">
          <span>⚠️</span>
          <span>{errorMessage}</span>
          <a href="/#pricing" className="underline font-bold hover:text-white">
            Upgrade Now
          </a>
        </div>
      )}
    </div>
  );
}
