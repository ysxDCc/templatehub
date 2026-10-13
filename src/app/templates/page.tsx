'use client';

import { useState } from 'react';
import { templates, categories } from '@/data/templates';
import TemplateCard from '@/components/TemplateCard';

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTier, setActiveTier] = useState('All');

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesTier = activeTier === 'All' || template.tier.toLowerCase() === activeTier.toLowerCase();
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      template.name.toLowerCase().includes(searchLower) ||
      template.description.toLowerCase().includes(searchLower) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesTier && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header with aesthetic glows */}
      <div className="relative text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur-md">
          <span>Explore 14 Hand-Crafted Designs</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
          Browse <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300">Template Library</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Find the perfect foundation for your startup, agency, SaaS, or client project. Filter by category or subscription tier.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        {/* Search and Tier Controls Bar */}
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
              placeholder="Search by keywords, tags, or industry..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tier Pills */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800/80">
            {['All', 'Free', 'Basic', 'Pro', 'Enterprise'].map(tier => {
              const isSelected = activeTier === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${
                    isSelected 
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {tier === 'Free' ? 'Free (1)' : tier}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar py-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeCategory === 'all' 
                ? 'bg-white text-slate-950 shadow-lg shadow-white/10' 
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>🎨</span>
            <span>All Templates (14)</span>
          </button>
          {categories.filter(c => c.id !== 'all').map(category => {
            const isSelected = activeCategory === category.id;
            const count = templates.filter(t => t.category === category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20' 
                    : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20' : 'bg-slate-800 text-slate-400'}`}>
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
        </span>
        {(searchQuery || activeCategory !== 'all' || activeTier !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setActiveTier('All');
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
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
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
