'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Show, UserButton } from '@clerk/nextjs';
import { useFavorites } from '@/context/FavoritesContext';
import CommandPalette from '@/components/CommandPalette';
import Logo from '@/components/Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { favoritesCount } = useFavorites();

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
                    46
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
              {/* Purple-Glow Search Command Trigger */}
              <button
                onClick={() => setIsCommandOpen(true)}
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
                <div className="ring-2 ring-purple-500/40 rounded-full p-0.5 bg-[#0e0624]">
                  <UserButton />
                </div>
              </Show>
            </div>

            {/* Mobile hamburger & search */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsCommandOpen(true)}
                className="p-2 text-purple-300 hover:text-white border border-purple-500/30 rounded-xl bg-[#0e0624]"
                aria-label="Open search palette"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 text-purple-300 hover:text-white focus:outline-none border border-purple-500/20 rounded-xl bg-[#0e0624]"
                aria-label="Toggle navigation menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div className="md:hidden bg-[#070314]/95 backdrop-blur-2xl border-b border-purple-500/25 px-4 pt-3 pb-6 space-y-3">
            <Link 
              href="/templates" 
              onClick={() => setIsOpen(false)}
              className="block text-sm font-semibold text-purple-200 hover:text-white py-1.5 flex items-center justify-between"
            >
              <span>Explore Templates</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold">
                46 Total
              </span>
            </Link>
            <Link 
              href="/ai-generator" 
              onClick={() => setIsOpen(false)}
              className="block text-sm font-semibold text-purple-200 hover:text-white py-1.5 flex items-center justify-between"
            >
              <span>AI Template Studio</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                PRO
              </span>
            </Link>
            <Link 
              href="/compare" 
              onClick={() => setIsOpen(false)}
              className="block text-sm font-semibold text-purple-200 hover:text-white py-1.5"
            >
              Compare Specifications
            </Link>
            <Link 
              href="/builder" 
              onClick={() => setIsOpen(false)}
              className="block text-sm font-semibold text-purple-200 hover:text-white py-1.5 flex items-center justify-between"
            >
              <span>Visual Customizer</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live
              </span>
            </Link>
            <Link 
              href="/#pricing" 
              onClick={() => setIsOpen(false)}
              className="block text-sm font-semibold text-purple-200 hover:text-white py-1.5"
            >
              Subscription Tiers
            </Link>
            <Link 
              href="/#license" 
              onClick={() => setIsOpen(false)}
              className="block text-sm font-semibold text-purple-200 hover:text-white py-1.5"
            >
              Commercial License
            </Link>

            <div className="pt-4 border-t border-purple-500/20 flex flex-col gap-2">
              <Show when="signed-out">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-purple-500/30 bg-[#0e0624] text-xs font-semibold text-purple-200"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  Get Started Free
                </Link>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-purple-300">Account Session</span>
                  <UserButton />
                </div>
              </Show>
            </div>
          </div>
        )}
      </nav>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
}
