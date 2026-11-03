'use client';

import { useState } from 'react';
import { templates, categories } from '@/data/templates';
import TemplateCard from '@/components/TemplateCard';
import QuickViewModal from '@/components/QuickViewModal';
import { useFavorites } from '@/context/FavoritesContext';
import { cyberSound } from '@/lib/sound';
import { Template } from '@/types';

type PaletteHue = 'all' | 'purple' | 'cyan' | 'emerald' | 'amber' | 'fuchsia' | 'slate';

const PALETTE_FILTERS: { id: PaletteHue; label: string; dotClass: string }[] = [
  { id: 'all', label: 'All Hues', dotClass: 'bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400' },
  { id: 'purple', label: 'Amethyst', dotClass: 'bg-purple-500 shadow-[0_0_8px_#a855f7]' },
  { id: 'cyan', label: 'Cyan / Aqua', dotClass: 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' },
  { id: 'emerald', label: 'Emerald', dotClass: 'bg-emerald-400 shadow-[0_0_8px_#34d399]' },
  { id: 'amber', label: 'Gold / Amber', dotClass: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' },
  { id: 'fuchsia', label: 'Fuchsia / Rose', dotClass: 'bg-fuchsia-400 shadow-[0_0_8px_#e879f9]' },
  { id: 'slate', label: 'Dark / Mono', dotClass: 'bg-slate-400 shadow-[0_0_8px_#94a3b8]' },
];

function getTemplatePalette(template: { category: string }): PaletteHue {
  const cat = template.category.toLowerCase();
  if (['crypto', 'cyberpunk', 'quantum', 'space', 'spatial', 'security', 'cybersecurity', 'oceanic'].includes(cat)) {
    return 'cyan';
  }
  if (['green', 'agriculture', 'geothermal', 'biotech', 'fitness', 'healthcare'].includes(cat)) {
    return 'emerald';
  }
  if (['luxury', 'auction', 'motorsport', 'dining', 'food', 'yachts', 'hypercar'].includes(cat)) {
    return 'amber';
  }
  if (['beauty', 'podcast', 'culture', 'arcade', 'spa', 'bionics'].includes(cat)) {
    return 'fuchsia';
  }
  if (['portfolio', 'blog', 'architecture', 'industrial', 'furniture'].includes(cat)) {
    return 'slate';
  }
  return 'purple';
}

export default function TemplatesPage() {
  const { favorites, favoritesCount } = useFavorites();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTier, setActiveTier] = useState('All');
  const [activePalette, setActivePalette] = useState<PaletteHue>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');
  const [quickViewTemplate, setQuickViewTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates
    .filter((template) => {
      if (onlyFavorites && !favorites.includes(template.id)) {
        return false;
      }
      const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
      const matchesTier = activeTier === 'All' || template.tier.toLowerCase() === activeTier.toLowerCase();
      const matchesPalette = activePalette === 'all' || getTemplatePalette(template) === activePalette;

      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        template.name.toLowerCase().includes(searchLower) ||
        template.description.toLowerCase().includes(searchLower) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      return matchesCategory && matchesTier && matchesPalette && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.downloads - a.downloads;
    });

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16">
      {/* Header with Purple Aesthetic Glows */}
      <div className="relative text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-purple-500/35 bg-purple-500/10 text-purple-300 text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.25)]">
          <span>✦ Explore 56 Hand-Crafted Production Masterpieces</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3 sm:mb-4">
          Browse{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-fuchsia-200 to-violet-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
            Template Registry
          </span>
        </h1>
        <p className="text-purple-200/75 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Find the ideal sovereign codebase for your startup, agency, SaaS, or client project. Filter by industry, accent palette, or subscription tier.
        </p>
      </div>

      <div className="flex flex-col gap-5 mb-12">
        {/* Search, Tier & Sort Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 justify-between items-stretch lg:items-center bg-[#0d0622]/90 backdrop-blur-xl p-3 sm:p-3.5 rounded-2xl border border-purple-500/25 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 sm:pl-4 text-purple-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search 56 templates by keyword, tags, or industry..."
              className="w-full bg-[#070314] border border-purple-500/30 rounded-xl py-2 sm:py-2.5 pl-10 sm:pl-11 pr-4 text-xs sm:text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#070314] px-2.5 sm:px-3 py-1.5 rounded-xl border border-purple-500/25 text-xs">
              <span className="text-purple-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  cyberSound.playClick();
                  setSortBy(e.target.value as 'popular' | 'rating' | 'newest');
                }}
                className="bg-transparent text-purple-200 font-semibold focus:outline-none cursor-pointer text-xs"
              >
                <option value="popular" className="bg-[#0e0624] text-white">Most Popular</option>
                <option value="rating" className="bg-[#0e0624] text-white">Highest Rated</option>
                <option value="newest" className="bg-[#0e0624] text-white">Newest Release</option>
              </select>
            </div>

            {/* Tier Pills */}
            <div className="flex items-center gap-1 bg-[#070314] p-1.5 rounded-xl border border-purple-500/25 overflow-x-auto hide-scrollbar max-w-full">
              {['All', 'Free', 'Basic', 'Pro', 'Enterprise'].map((tier) => {
                const isSelected = activeTier === tier;
                return (
                  <button
                    key={tier}
                    onClick={() => {
                      cyberSound.playClick();
                      setActiveTier(tier);
                    }}
                    className={`px-2.5 sm:px-3 py-1 text-xs font-bold rounded-lg transition-all capitalize whitespace-nowrap ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                        : 'text-purple-300/70 hover:text-white hover:bg-[#1a0b3b]'
                    }`}
                  >
                    {tier}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Palette / Accent Color Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar bg-[#0d0622]/60 backdrop-blur-md p-2 rounded-2xl border border-purple-500/20 text-xs">
          <span className="text-purple-400/90 font-mono text-[11px] uppercase tracking-wider pl-2 pr-1 font-semibold flex items-center gap-1 shrink-0">
            <span>🎨</span>
            <span>Palette:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {PALETTE_FILTERS.map((palette) => {
              const isSelected = activePalette === palette.id;
              return (
                <button
                  key={palette.id}
                  onClick={() => {
                    cyberSound.playClick();
                    setActivePalette(palette.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border whitespace-nowrap ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'bg-[#070314] border-purple-500/20 text-purple-300/75 hover:text-white hover:border-purple-400/50'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${palette.dotClass} shrink-0`} />
                  <span>{palette.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills Bar & Favorites Filter */}
        <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar py-1">
          {/* Saved / Bookmarked filter pill */}
          <button
            onClick={() => {
              cyberSound.playClick();
              setOnlyFavorites(!onlyFavorites);
              if (!onlyFavorites) setActiveCategory('all');
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              onlyFavorites
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'bg-[#0e0624] border-purple-500/20 text-purple-300 hover:text-rose-300 hover:border-purple-400'
            }`}
          >
            <span>❤️</span>
            <span>Saved Favorites</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${onlyFavorites ? 'bg-rose-500/30 text-rose-200' : 'bg-[#070314] text-purple-400'}`}>
              {favoritesCount}
            </span>
          </button>

          <button
            onClick={() => {
              cyberSound.playClick();
              setOnlyFavorites(false);
              setActiveCategory('all');
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              !onlyFavorites && activeCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-[#0e0624] border border-purple-500/20 text-purple-200 hover:border-purple-400 hover:text-white'
            }`}
          >
            <span>✨</span>
            <span>All Categories ({templates.length})</span>
          </button>

          {categories
            .filter((c) => c.id !== 'all')
            .map((category) => {
              const isSelected = !onlyFavorites && activeCategory === category.id;
              const count = templates.filter((t) => t.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    cyberSound.playClick();
                    setOnlyFavorites(false);
                    setActiveCategory(category.id);
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'bg-[#0e0624] border border-purple-500/20 text-purple-200 hover:border-purple-400 hover:text-white'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20' : 'bg-[#070314] text-purple-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-purple-500/20 text-sm">
        <span className="text-purple-300/80 font-medium">
          Showing <span className="text-white font-bold">{filteredTemplates.length}</span> curated masterworks
          {onlyFavorites && <span className="ml-2 text-rose-300 font-bold">(Saved in your favorites)</span>}
          {activePalette !== 'all' && (
            <span className="ml-2 text-purple-300 font-semibold capitalize">
              • {activePalette} Palette
            </span>
          )}
        </span>
        {(searchQuery || activeCategory !== 'all' || activeTier !== 'All' || activePalette !== 'all' || onlyFavorites) && (
          <button
            onClick={() => {
              cyberSound.playClick();
              setSearchQuery('');
              setActiveCategory('all');
              setActiveTier('All');
              setActivePalette('all');
              setOnlyFavorites(false);
            }}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            Reset Filters ✕
          </button>
        )}
      </div>

      {/* Templates Responsive Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onQuickView={(t) => setQuickViewTemplate(t)}
            />
          ))}
        </div>
      ) : onlyFavorites ? (
        <div className="text-center py-20 bg-[#0d0622]/80 backdrop-blur-md rounded-3xl border border-purple-500/25 max-w-lg mx-auto shadow-2xl">
          <div className="text-5xl mb-4">❤️</div>
          <h3 className="text-xl font-bold text-white mb-2">No Saved Templates Yet</h3>
          <p className="text-purple-200/70 text-sm mb-6 max-w-sm mx-auto">
            Click the heart button on any template card in the catalog to pin it to your personal favorites collection.
          </p>
          <button
            onClick={() => {
              cyberSound.playClick();
              setOnlyFavorites(false);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all hover:scale-105"
          >
            Browse All {templates.length} Templates
          </button>
        </div>
      ) : (
        <div className="text-center py-24 bg-[#0d0622]/80 backdrop-blur-md rounded-3xl border border-purple-500/25 max-w-lg mx-auto shadow-2xl">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No Matching Templates</h3>
          <p className="text-purple-200/70 text-sm mb-6">
            We couldn&apos;t find any templates matching your current filter combination.
          </p>
          <button
            onClick={() => {
              cyberSound.playClick();
              setSearchQuery('');
              setActiveCategory('all');
              setActiveTier('All');
              setActivePalette('all');
              setOnlyFavorites(false);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all hover:scale-105"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Quick View Interactive Drawer Modal */}
      <QuickViewModal
        template={quickViewTemplate}
        isOpen={!!quickViewTemplate}
        onClose={() => setQuickViewTemplate(null)}
      />
    </div>
  );
}
