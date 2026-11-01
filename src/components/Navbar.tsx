'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Show, UserButton } from '@clerk/nextjs';
import { useFavorites } from '@/context/FavoritesContext';
import CommandPalette from '@/components/CommandPalette';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-[#060609]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo brand */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center transition-transform group-hover:scale-105">
                  <img
                    src="/logo.jpg"
                    alt="TemplateHub Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  <span>TemplateHub</span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold">
                    Masterpiece
                  </span>
                </span>
              </Link>

              <div className="hidden md:flex items-center space-x-6 text-sm">
                <Link href="/templates" className="text-zinc-400 hover:text-white transition-colors font-medium">
                  Templates (36)
                </Link>
                {favoritesCount > 0 && (
                  <Link
                    href="/templates"
                    className="text-rose-400 hover:text-rose-300 transition-colors font-medium flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20"
                  >
                    <span>❤️</span>
                    <span>Saved ({favoritesCount})</span>
                  </Link>
                )}
                <Link 
                  href="/ai-generator" 
                  className="text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>AI Generator</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                    New
                  </span>
                </Link>
                <Link 
                  href="/compare" 
                  className="text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Compare</span>
                </Link>
                <Link 
                  href="/builder" 
                  className="text-white hover:text-zinc-200 transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Visual Customizer</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    No-Code
                  </span>
                </Link>
                <Link href="/#pricing" className="text-zinc-400 hover:text-white transition-colors font-medium">
                  Pricing
                </Link>
                <Link href="/#license" className="text-zinc-400 hover:text-white transition-colors font-medium">
                  Licensing
                </Link>
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="hidden md:flex items-center space-x-3 text-sm font-medium">
              {/* Quick Search Command Trigger */}
              <button
                onClick={() => setIsCommandOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-zinc-900/60 hover:bg-zinc-800 text-xs text-zinc-400 hover:text-white transition-all shadow-inner"
                title="Search templates (Cmd+K)"
              >
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
                <kbd className="px-1.5 py-0.2 text-[9px] font-mono bg-zinc-950 text-zinc-400 border border-white/10 rounded">
                  ⌘K
                </kbd>
              </button>

              <Show when="signed-out">
                <Link 
                  href="/login" 
                  className="px-3.5 py-1.5 text-zinc-300 hover:text-white transition-colors text-xs"
                >
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-white text-zinc-950 font-semibold text-xs rounded-lg hover:bg-zinc-200 transition-colors shadow-xs"
                >
                  Get started
                </Link>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsCommandOpen(true)}
                className="p-1.5 text-zinc-400 hover:text-white border border-white/10 rounded-lg bg-zinc-900"
                aria-label="Open search palette"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-1.5 text-zinc-400 hover:text-white focus:outline-none"
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

        {isOpen && (
          <div className="md:hidden bg-[#060609] border-b border-white/[0.08] px-4 pt-3 pb-5 space-y-3">
            <Link href="/templates" className="block text-sm text-zinc-300 hover:text-white py-1">Templates (36)</Link>
            <Link href="/ai-generator" className="block text-sm text-zinc-300 hover:text-white py-1 flex items-center gap-1.5">
              AI Generator <span className="px-1.5 rounded-full text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">New</span>
            </Link>
            <Link href="/compare" className="block text-sm text-zinc-300 hover:text-white py-1">Compare Matrix</Link>
            <Link href="/builder" className="block text-sm text-zinc-300 hover:text-white py-1">Visual Customizer</Link>
            <Link href="/#pricing" className="block text-sm text-zinc-300 hover:text-white py-1">Pricing</Link>
            <Link href="/#license" className="block text-sm text-zinc-300 hover:text-white py-1">Licensing</Link>
            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
              <Show when="signed-out">
                <Link href="/login" className="w-full text-center py-2 text-sm text-zinc-300 border border-white/10 rounded-lg">Log in</Link>
                <Link href="/signup" className="w-full text-center py-2 text-sm bg-white text-zinc-950 font-medium rounded-lg">Get started free</Link>
              </Show>
              <Show when="signed-in">
                <div className="py-2 flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Account</span>
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
