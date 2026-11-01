'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { templates } from '@/data/templates';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaletteItem {
  name: string;
  sub?: string;
  href: string;
  icon: string;
  type: string;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
          setSelectedIndex(0);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const quickLinks: PaletteItem[] = [
    { name: 'Browse All 56 Masterpieces', href: '/templates', icon: '💎', type: 'Archive' },
    { name: 'Store Auto-Edit Studio', href: '/templates/astral-aerospace', icon: '🪄', type: 'Studio' },
    { name: 'AI Template Generator', href: '/ai-generator', icon: '🤖', type: 'AI' },
    { name: 'Side-by-Side Comparison', href: '/compare', icon: '⚖️', type: 'Tool' },
    { name: 'Visual No-Code Customizer', href: '/builder', icon: '✏️', type: 'Tool' },
    { name: 'Developer Subscriptions', href: '/#pricing', icon: '💳', type: 'Plans' },
  ];

  const searchResults = query.trim()
    ? templates.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      }).slice(0, 8)
    : [];

  const allItems: PaletteItem[] = query.trim()
    ? searchResults.map((t) => ({
        name: t.name,
        sub: `${t.category} · ${t.tier.toUpperCase()}`,
        href: `/templates/${t.id}`,
        icon: t.logo?.split(' ')[0] || '⚡',
        type: 'Template',
      }))
    : quickLinks;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % allItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        handleSelect(allItems[selectedIndex].href);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0d0622] border border-purple-500/35 rounded-2xl shadow-[0_0_60px_rgba(168,85,247,0.35)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleModalKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-purple-500/20 bg-[#140838]/80">
          <svg className="w-5 h-5 text-purple-400 shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 56 templates, tools, or verticals... (e.g. 'f1', 'biotech', 'arcade', 'spa')"
            className="w-full bg-transparent text-sm text-white placeholder-purple-300/40 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-[#070314] text-purple-300 border border-purple-500/30 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-purple-400/80 font-bold">
            {query.trim() ? `Search Results (${allItems.length})` : 'Quick Navigation'}
          </div>

          {allItems.length > 0 ? (
            allItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 text-white border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                      : 'text-purple-200 hover:bg-[#1a0b3b]/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-white">{item.name}</div>
                      {item.sub && <div className="text-[10px] text-purple-300/60 font-mono mt-0.5">{item.sub}</div>}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#070314] border border-purple-500/30 text-purple-300">
                    {item.type}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-purple-400/70 font-mono">
              No matching templates or tools found for &quot;{query}&quot;.
            </div>
          )}
        </div>

        {/* Footer command helper */}
        <div className="px-4 py-2.5 bg-[#070314] border-t border-purple-500/20 flex items-center justify-between text-[11px] text-purple-400/70 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
          <span className="text-purple-300 font-bold">TemplateHub v3.0 Amethyst</span>
        </div>
      </div>
    </div>
  );
}
