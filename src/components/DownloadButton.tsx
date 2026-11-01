'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import type { Template } from '@/types';

interface DownloadButtonProps {
  template: Template;
}

export default function DownloadButton({ template }: DownloadButtonProps) {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState<{ tier: string } | null>(null);

  // While Clerk is hydrating, render a neutral placeholder
  if (!isLoaded) {
    return (
      <button
        disabled
        className="w-full bg-zinc-800 text-zinc-500 font-semibold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <span>Loading…</span>
      </button>
    );
  }

  // Not signed in — skip the API call and redirect immediately
  if (!isSignedIn) {
    return (
      <button
        onClick={() => router.push('/signup')}
        className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Sign in to Download</span>
      </button>
    );
  }

  const handleDownload = async () => {
    setUpgradeMessage(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/download?templateId=${template.id}`);
      const data = await res.json();

      if (res.ok) {
        // Trigger browser download via a hidden anchor
        const a = document.createElement('a');
        a.href = data.downloadUrl;
        a.download = data.templateName || template.id;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else if (res.status === 401 && data.requiresAuth) {
        router.push('/signup');
      } else if (res.status === 403 && data.requiresUpgrade) {
        setUpgradeMessage({ tier: data.requiredTier });
      }
    } finally {
      setLoading(false);
    }
  };

  if (upgradeMessage) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => router.push('/#pricing')}
          className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span>Upgrade to {upgradeMessage.tier} plan to download</span>
        </button>
        <p className="text-[11px] text-zinc-500 text-center">
          This template requires a{' '}
          <a href="/#pricing" className="text-amber-400 hover:underline">
            {upgradeMessage.tier} subscription
          </a>
          .
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <button
        disabled
        className="w-full bg-white/70 text-zinc-950 font-semibold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 cursor-not-allowed shadow-xs"
      >
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <span>Preparing download…</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>Download standalone code</span>
    </button>
  );
}
