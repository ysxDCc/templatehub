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
      {/* Header with aesthetic glows */}
      <div className="relative text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur-md">
          <span>Explore 30 Hand-Crafted Production Templates</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
          Browse{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300">
            Template Library
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Find the perfect foundation for your startup, agency, SaaS, or client project. Filter by category, subscription tier, or bookmarked favorites.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        {/* Search, Tier & Sort Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-slate-900/60 backdrop-blur-xl p-3 rounded-2xl border border-slate-800/80 shadow-xl">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search 30 templates by keyword, tags, or industry..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800/80 text-xs">
              <span className="text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'newest')}
                className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-slate-900 text-white">Most Popular</option>
                <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
                <option value="newest" className="bg-slate-900 text-white">Newest Release</option>
              </select>
            </div>

            {/* Tier Pills */}
            <div className="flex flex-wrap gap-1 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800/80">
              {['All', 'Free', 'Basic', 'Pro', 'Enterprise'].map((tier) => {
                const isSelected = activeTier === tier;
                return (
                  <button
                    key={tier}
                    onClick={() => setActiveTier(tier)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all capitalize ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-lg shadow-rose-500/10'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-rose-300 hover:border-slate-700'
            }`}
          >
            <span>❤️</span>
            <span>Saved Favorites</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${onlyFavorites ? 'bg-rose-500/30 text-rose-200' : 'bg-slate-800 text-slate-400'}`}>
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
                ? 'bg-white text-slate-950 shadow-lg shadow-white/10'
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>🎨</span>
            <span>All Templates (30)</span>
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
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20' : 'bg-slate-800 text-slate-400'
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
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80 text-sm">
        <span className="text-slate-400 font-medium">
          Showing <span className="text-white font-bold">{filteredTemplates.length}</span> curated templates
          {onlyFavorites && <span className="ml-2 text-rose-400">(Saved in your favorites)</span>}
        </span>
        {(searchQuery || activeCategory !== 'all' || activeTier !== 'All' || onlyFavorites) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setActiveTier('All');
              setOnlyFavorites(false);
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
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
        <div className="text-center py-20 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 max-w-lg mx-auto">
          <div className="text-5xl mb-4">❤️</div>
          <h3 className="text-xl font-bold text-white mb-2">No Saved Templates Yet</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Click the heart button on any template card in the catalog to pin it to your personal favorites collection.
          </p>
          <button
            onClick={() => setOnlyFavorites(false)}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all"
          >
            Browse All 30 Templates
          </button>
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 max-w-lg mx-auto">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No Matching Templates</h3>
          <p className="text-slate-400 text-sm mb-6">
            We couldn't find any templates matching your current filter combination.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setActiveTier('All');
              setOnlyFavorites(false);
            }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
