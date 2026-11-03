'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { cyberSound } from '@/lib/sound';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const { isSignedIn, user } = useUser();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const referralCode = isSignedIn && user ? user.id.slice(-8) : 'creator';
  const referralLink = `https://www.templatehub.website?ref=${referralCode}`;

  const handleCopyLink = () => {
    cyberSound.playSuccess();
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetText = encodeURIComponent(
    `Check out @TemplateHub — 56 sovereign zero-dependency website templates with interactive sandboxes and in-browser auto-editor: ${referralLink}`
  );
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-[#0d0622] border border-purple-500/35 p-6 sm:p-8 shadow-[0_0_70px_rgba(168,85,247,0.35)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-1/3 w-48 h-20 bg-fuchsia-500/20 blur-[50px] pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-purple-500/25 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">💸</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                TemplateHub Creator Partner Program
              </h3>
              <p className="text-xs text-purple-300/70 font-mono">
                Earn 30% recurring rev-share on every referral
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              cyberSound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#070314] border border-purple-500/30 text-purple-300 hover:text-white flex items-center justify-center text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Earning Breakdown Cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
          <div className="p-3 rounded-2xl bg-[#070314] border border-purple-500/25">
            <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              €2.70
            </div>
            <div className="text-[10px] text-purple-300/80 mt-0.5">Per €9 Single Buy</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#070314] border border-purple-500/25">
            <div className="text-base sm:text-lg font-black text-fuchsia-400 font-mono">
              €3.00/mo
            </div>
            <div className="text-[10px] text-purple-300/80 mt-0.5">Per Pro Member</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#070314] border border-purple-500/25">
            <div className="text-base sm:text-lg font-black text-amber-400 font-mono">
              €9.00/mo
            </div>
            <div className="text-[10px] text-purple-300/80 mt-0.5">Per Enterprise</div>
          </div>
        </div>

        {/* Custom Affiliate Link */}
        <div className="space-y-2 mb-6">
          <label className="block text-xs font-mono text-purple-300 font-semibold">
            Your Sovereign Referral Link:
          </label>
          <div className="flex items-center gap-2 bg-[#070314] p-1.5 rounded-xl border border-purple-500/35">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="bg-transparent text-xs text-white px-2.5 font-mono flex-1 focus:outline-none select-all truncate"
            />
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all shrink-0 active:scale-95"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-[11px] text-purple-400/70">
            Cookie duration: 60 days. First-click attribution with automatic monthly payouts.
          </p>
        </div>

        {/* Share buttons */}
        <div className="pt-4 border-t border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-purple-300/70 font-mono">
            Zero minimum payout threshold
          </span>

          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => cyberSound.playClick()}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>𝕏</span>
            <span>Share on X / Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
}
