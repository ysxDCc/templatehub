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
    { name: 'Browse All 36 Templates', href: '/templates', icon: '🎨', type: 'Page' },
    { name: 'AI Template Generator', href: '/ai-generator', icon: '🤖', type: 'Tool' },
    { name: 'Side-by-Side Template Comparison', href: '/compare', icon: '⚖️', type: 'Tool' },
    { name: 'Visual No-Code Customizer', href: '/builder', icon: '✏️', type: 'Tool' },
    { name: 'Transparent Pricing & Plans', href: '/#pricing', icon: '💳', type: 'Plan' },
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleModalKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-zinc-900/60">
          <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 36 templates, tools, industries, or codebases... (e.g. 'f1', 'biotech', 'saas')"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected ? 'bg-indigo-600/20 text-white border border-indigo-500/40' : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-zinc-100">{item.name}</div>
                      {item.sub && <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{item.sub}</div>}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400">
                    {item.type}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-zinc-500">
              No matching templates or tools found for "{query}".
            </div>
          )}
        </div>

        {/* Footer command helper */}
        <div className="px-4 py-2.5 bg-zinc-900/40 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
          <span className="text-indigo-400 font-mono">TemplateHub Registry v2.4</span>
        </div>
      </div>
    </div>
  );
}
