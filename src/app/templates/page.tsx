'use client';

import { useState } from 'react';
import { templates, categories } from '@/data/templates';
import TemplateCard from '@/components/TemplateCard';
import { useFavorites } from '@/context/FavoritesContext';

export default function TemplatesPage() {
  const { favorites, favoritesCount } = useFavorites();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTier, setActiveTier] = useState('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const filteredTemplates = templates
    .filter((template) => {
      if (onlyFavorites && !favorites.includes(template.id)) {
        return false;
      }
      const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
      const matchesTier = activeTier === 'All' || template.tier.toLowerCase() === activeTier.toLowerCase();

      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        template.name.toLowerCase().includes(searchLower) ||
        template.description.toLowerCase().includes(searchLower) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      return matchesCategory && matchesTier && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.downloads - a.downloads;
    });

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header with Purple Aesthetic Glows */}
      <div className="relative text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/35 bg-purple-500/10 text-purple-300 text-xs font-semibold mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.25)]">
          <span>✦ Explore 46 Hand-Crafted Production Masterpieces</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
          Browse{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-fuchsia-200 to-violet-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
            Template Registry
          </span>
        </h1>
        <p className="text-purple-200/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Find the ideal sovereign codebase for your startup, agency, SaaS, or client project. Filter by category, subscription tier, or bookmarked favorites.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        {/* Search, Tier & Sort Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-[#0d0622]/90 backdrop-blur-xl p-3.5 rounded-2xl border border-purple-500/25 shadow-[0_4px_30px_rgba(7,3,20,0.8)]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-purple-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search 46 templates by keyword, tags, or industry..."
              className="w-full bg-[#070314] border border-purple-500/30 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#070314] px-3 py-1.5 rounded-xl border border-purple-500/25 text-xs">
              <span className="text-purple-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'newest')}
                className="bg-transparent text-purple-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-[#0e0624] text-white">Most Popular</option>
                <option value="rating" className="bg-[#0e0624] text-white">Highest Rated</option>
                <option value="newest" className="bg-[#0e0624] text-white">Newest Release</option>
              </select>
            </div>

            {/* Tier Pills */}
            <div className="flex flex-wrap gap-1 bg-[#070314] p-1.5 rounded-xl border border-purple-500/25">
              {['All', 'Free', 'Basic', 'Pro', 'Enterprise'].map((tier) => {
                const isSelected = activeTier === tier;
                return (
                  <button
                    key={tier}
                    onClick={() => setActiveTier(tier)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all capitalize ${
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

        {/* Category Pills Bar & Favorites Filter */}
        <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar py-1">
          {/* Saved / Bookmarked filter pill */}
          <button
            onClick={() => {
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
              setOnlyFavorites(false);
              setActiveCategory('all');
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              !onlyFavorites && activeCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-[#0e0624] border border-purple-500/20 text-purple-200 hover:border-purple-400 hover:text-white'
            }`}
          >
            <span>🎨</span>
            <span>All Templates (46)</span>
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
        </span>
        {(searchQuery || activeCategory !== 'all' || activeTier !== 'All' || onlyFavorites) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setActiveTier('All');
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
            <TemplateCard key={template.id} template={template} />
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
            onClick={() => setOnlyFavorites(false)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all hover:scale-105"
          >
            Browse All 46 Templates
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
              setSearchQuery('');
              setActiveCategory('all');
              setActiveTier('All');
              setOnlyFavorites(false);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all hover:scale-105"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
