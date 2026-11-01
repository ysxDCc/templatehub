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
  const [loadingHtml, setLoadingHtml] = useState(false);
  const [loadingZip, setLoadingZip] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
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

  // Not signed in — redirect immediately to signup
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

  const handleDownload = async (format: 'html' | 'zip') => {
    setUpgradeMessage(null);
    if (format === 'html') setLoadingHtml(true);
    else setLoadingZip(true);

    try {
      if (format === 'zip') {
        const res = await fetch(`/api/download?templateId=${template.id}&format=zip`);
        if (res.status === 401) {
          router.push('/signup');
          return;
        }
        if (res.status === 403) {
          const data = await res.json();
          setUpgradeMessage({ tier: data.requiredTier || template.tier });
          return;
        }
        if (res.ok) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${template.id}-bundle.zip`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      } else {
        const res = await fetch(`/api/download?templateId=${template.id}`);
        const data = await res.json();

        if (res.ok) {
          const a = document.createElement('a');
          a.href = data.downloadUrl;
          a.download = `${template.id}.html`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else if (res.status === 401 && data.requiresAuth) {
          router.push('/signup');
        } else if (res.status === 403 && data.requiresUpgrade) {
          setUpgradeMessage({ tier: data.requiredTier });
        }
      }
    } finally {
      setLoadingHtml(false);
      setLoadingZip(false);
    }
  };

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="https://www.templatehub.website/templates/${template.id}/index.html" width="100%" height="800" frameborder="0" loading="lazy"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
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
          <span>Upgrade to {upgradeMessage.tier.toUpperCase()} plan to download</span>
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

  return (
    <div className="space-y-2">
      {/* Primary Action: Download HTML */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleDownload('html')}
          disabled={loadingHtml || loadingZip}
          className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-2.5 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
          title="Download single-file standalone HTML"
        >
          {loadingHtml ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          <span>Download .html</span>
        </button>

        <button
          onClick={() => handleDownload('zip')}
          disabled={loadingHtml || loadingZip}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
          title="Export complete package with README, License, and Configs (.zip)"
        >
          {loadingZip ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )}
          <span>Export .zip</span>
        </button>
      </div>

      {/* Secondary Embed copy button */}
      <button
        onClick={handleCopyEmbed}
        className="w-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white py-1.5 px-3 rounded-md text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
      >
        <span>{copiedEmbed ? '✓ Copied Iframe Embed Code!' : '⟨/⟩ Copy Embed Snippet'}</span>
      </button>
    </div>
  );
}
