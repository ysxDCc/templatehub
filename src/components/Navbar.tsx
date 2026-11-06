'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Show, UserButton, useUser } from '@clerk/nextjs';
import { useFavorites } from '@/context/FavoritesContext';
import CommandPalette from '@/components/CommandPalette';
import Logo from '@/components/Logo';
import { cyberSound } from '@/lib/sound';
import ReferralModal from '@/components/ReferralModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const { user } = useUser();

  const rawSub = (user?.publicMetadata?.subscription as string) || '';
  const subscription = rawSub.toLowerCase();

  useEffect(() => {
    setIsSoundActive(cyberSound.isEnabled());
  }, []);

  const handleToggleSound = () => {
    const active = cyberSound.toggle();
    setIsSoundActive(active);
  };

  // Prevent background body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-[#070314]/85 backdrop-blur-2xl border-b border-purple-500/20 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Brand */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                <Logo size="md" />
              </Link>

              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <Link 
                  href="/templates" 
                  className="text-purple-200/80 hover:text-white transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Templates</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300">
                    56
                  </span>
                </Link>

                {favoritesCount > 0 && (
                  <Link
                    href="/templates"
                    className="text-rose-300 hover:text-white transition-colors font-medium flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]"
                  >
                    <span>❤️</span>
                    <span>Saved ({favoritesCount})</span>
                  </Link>
                )}

                <Link 
                  href="/ai-generator" 
                  className="text-purple-200/80 hover:text-white transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>AI Studio</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 text-purple-200 border border-purple-400/30 font-semibold shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                    New
                  </span>
                </Link>

                <Link 
                  href="/compare" 
                  className="text-purple-200/80 hover:text-white transition-colors font-medium"
                >
                  Compare
                </Link>

                <Link 
                  href="/builder" 
                  className="text-purple-200/80 hover:text-white transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Visual Customizer</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                    Live
                  </span>
                </Link>

                <Link href="/#pricing" className="text-purple-200/80 hover:text-white transition-colors font-medium">
                  Pricing
                </Link>

                <Link href="/#license" className="text-purple-200/80 hover:text-white transition-colors font-medium">
                  Licensing
                </Link>
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="hidden md:flex items-center space-x-3 text-sm font-medium">
              {/* Subtle Cyber Audio Engine Toggle */}
              <button
                onClick={handleToggleSound}
                className={`p-1.5 rounded-xl border text-xs transition-all flex items-center justify-center w-8 h-8 ${
                  isSoundActive
                    ? 'border-purple-400/60 bg-purple-950/80 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'border-purple-500/20 bg-[#0e0624]/70 text-purple-400/60 hover:text-purple-300'
                }`}
                title={isSoundActive ? 'Cyber Sound FX: Active' : 'Cyber Sound FX: Muted'}
                aria-label="Toggle cyber audio effects"
              >
                {isSoundActive ? '🔊' : '🔇'}
              </button>

              {/* Purple-Glow Search Command Trigger */}
              <button
                onClick={() => {
                  cyberSound.playClick();
                  setIsCommandOpen(true);
                }}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-purple-500/25 bg-[#0e0624]/90 hover:bg-[#1a0b3b] text-xs text-purple-200/90 hover:text-white transition-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.25)] hover:border-purple-400/50"
                title="Search templates (Cmd+K)"
              >
                <svg className="w-3.5 h-3.5 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search archive</span>
                <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-[#070314] text-purple-300 border border-purple-500/30 rounded shadow-xs">
                  ⌘K
                </kbd>
              </button>

              {/* Creator Partner / Affiliate Trigger */}
              <button
                onClick={() => {
                  cyberSound.playClick();
                  setIsReferralOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-500/25 bg-[#0e0624]/90 hover:bg-[#1a0b3b] text-xs text-purple-200 hover:text-white transition-all shadow-sm"
                title="30% Creator Partner Program"
              >
                <span>💸</span>
                <span className="hidden xl:inline">Affiliate</span>
                <span className="text-[10px] px-1 py-0.2 rounded font-mono font-bold bg-purple-500/20 text-purple-300">
                  30%
                </span>
              </button>

              <Show when="signed-out">
                <Link 
                  href="/login" 
                  className="px-3.5 py-1.5 text-purple-200 hover:text-white transition-colors text-xs font-semibold"
                >
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 hover:from-purple-500 hover:via-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-[1.02] active:scale-95 flex items-center gap-1.5 shimmer-active"
                >
                  <span>Get Started</span>
                  <span>→</span>
                </Link>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center gap-2.5">
                  {subscription === 'pro' && (
                    <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-400/50 flex items-center gap-1">
                      <span>✦</span>
                      <span>PRO PLAN</span>
                    </span>
                  )}
                  {subscription === 'enterprise' && (
                    <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold text-[10px] tracking-wider uppercase shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-300 flex items-center gap-1">
                      <span>👑</span>
                      <span>ENTERPRISE</span>
                    </span>
                  )}
                  {subscription === 'basic' && (
                    <span className="px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-200 font-bold text-[10px] tracking-wider uppercase border border-purple-500/40">
                      BASIC PLAN
                    </span>
                  )}
                  {(!subscription || subscription === 'free') && (
                    <Link
                      href="/#pricing"
                      className="px-2.5 py-1 rounded-full bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 hover:text-white font-semibold text-[10px] border border-purple-500/30 transition-all flex items-center gap-1"
                    >
                      <span>FREE PLAN</span>
                      <span className="text-purple-400 font-bold">· Upgrade</span>
                    </Link>
                  )}
                  <div className="ring-2 ring-purple-500/40 rounded-full p-0.5 bg-[#0e0624]">
                    <UserButton />
                  </div>
                </div>
              </Show>
            </div>

            {/* Mobile hamburger & search */}
            <div className="md:hidden flex items-center gap-1.5">
              <button
                onClick={handleToggleSound}
                className={`w-10 h-10 flex items-center justify-center border rounded-xl text-xs transition-transform active:scale-95 ${
                  isSoundActive
                    ? 'border-purple-400/60 bg-purple-950/80 text-purple-200'
                    : 'border-purple-500/20 bg-[#0e0624] text-purple-400/70'
                }`}
                aria-label="Toggle cyber audio"
              >
                {isSoundActive ? '🔊' : '🔇'}
              </button>
              <button
                onClick={() => setIsCommandOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-purple-300 hover:text-white border border-purple-500/30 rounded-xl bg-[#0e0624] active:scale-95 transition-transform"
                aria-label="Open search palette"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-10 h-10 flex items-center justify-center text-purple-300 hover:text-white focus:outline-none border border-purple-500/30 rounded-xl bg-[#0e0624] active:scale-95 transition-transform"
                aria-label="Toggle navigation menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu with smooth touch scrolling */}
        {isOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-[#070314]/98 backdrop-blur-3xl border-b border-purple-500/25 px-5 pt-4 pb-12 overflow-y-auto space-y-2 z-50">
            <Link 
              href="/templates" 
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-3 rounded-xl text-sm font-semibold text-purple-100 hover:text-white hover:bg-purple-950/40 flex items-center justify-between border border-purple-500/10 active:bg-purple-900/30 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span>💎</span>
                <span>Explore Templates</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold">
                56 Total
              </span>
            </Link>

            {favoritesCount > 0 && (
              <Link 
                href="/templates" 
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-3 rounded-xl text-sm font-semibold text-rose-300 hover:text-white hover:bg-rose-950/30 flex items-center justify-between border border-rose-500/20 active:bg-rose-900/30 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span>❤️</span>
                  <span>Saved Templates</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-200 font-bold">
                  {favoritesCount}
                </span>
              </Link>
            )}

            <Link 
              href="/ai-generator" 
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-3 rounded-xl text-sm font-semibold text-purple-100 hover:text-white hover:bg-purple-950/40 flex items-center justify-between border border-purple-500/10 active:bg-purple-900/30 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span>🤖</span>
                <span>AI Template Studio</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 font-bold">
                PRO
              </span>
            </Link>

            <Link 
              href="/compare" 
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-3 rounded-xl text-sm font-semibold text-purple-100 hover:text-white hover:bg-purple-950/40 flex items-center justify-between border border-purple-500/10 active:bg-purple-900/30 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span>⚖️</span>
                <span>Compare Specifications</span>
              </span>
            </Link>

            <Link 
              href="/builder" 
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-3 rounded-xl text-sm font-semibold text-purple-100 hover:text-white hover:bg-purple-950/40 flex items-center justify-between border border-purple-500/10 active:bg-purple-900/30 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span>✏️</span>
                <span>Visual Customizer</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                Live
              </span>
            </Link>

            <Link 
              href="/#pricing" 
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-3 rounded-xl text-sm font-semibold text-purple-100 hover:text-white hover:bg-purple-950/40 flex items-center justify-between border border-purple-500/10 active:bg-purple-900/30 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span>💳</span>
                <span>Subscription Tiers</span>
              </span>
            </Link>

            <Link 
              href="/#license" 
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-3 rounded-xl text-sm font-semibold text-purple-100 hover:text-white hover:bg-purple-950/40 flex items-center justify-between border border-purple-500/10 active:bg-purple-900/30 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span>📜</span>
                <span>Commercial License</span>
              </span>
            </Link>

            <div className="pt-6 border-t border-purple-500/20 flex flex-col gap-3">
              <Show when="signed-out">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-xl border border-purple-500/30 bg-[#0e0624] text-xs font-semibold text-purple-200 active:bg-purple-900/40"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-98 transition-transform"
                >
                  Get Started Free →
                </Link>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center justify-between py-2 px-3 bg-[#0e0624] border border-purple-500/20 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-purple-300 font-medium">Your Plan:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      subscription === 'pro'
                        ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                        : subscription === 'enterprise'
                        ? 'bg-amber-400 text-black font-black'
                        : 'bg-purple-900/60 text-purple-200 border border-purple-500/30'
                    }`}>
                      {subscription ? `${subscription} plan` : 'free plan'}
                    </span>
                  </div>
                  <UserButton />
                </div>
              </Show>
            </div>
          </div>
        )}
      </nav>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      {/* Creator Partner / Referral Modal */}
      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
    </>
  );
}
