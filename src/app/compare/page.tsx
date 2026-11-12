'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { templates } from '@/data/templates';

export default function ComparePage() {
  const [templateAId, setTemplateAId] = useState(templates[0]?.id || 'apex-landing');
  const [templateBId, setTemplateBId] = useState(templates[1]?.id || 'minimal-folio');

  const templateA = templates.find((t) => t.id === templateAId) || templates[0];
  const templateB = templates.find((t) => t.id === templateBId) || templates[1];

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'basic':
        return 'bg-raised text-zinc-300 border-zinc-700';
      case 'pro':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';
      default:
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
    }
  };

  const getScoreBadge = (score?: string) => {
    if (score === 'AAA') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (score === 'AA') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  };

  return (
    <div className="min-h-screen bg-[#09090b] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur-md">
            <span>✦ Interactive Comparison Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Compare <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300">Templates Side-by-Side</span>
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Inspect architecture, WCAG scores, included modules, and licensing before downloading.
          </p>
        </div>

        {/* Selection Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-surface border border-line rounded-2xl p-5">
            <label htmlFor="com-f1" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Select Primary Template (A)
            </label>
            <select
 id="com-f1"
              value={templateAId}
              onChange={(e) => setTemplateAId(e.target.value)}
              className="min-h-11 w-full bg-bg border border-line rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category} · {t.tier.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-surface border border-line rounded-2xl p-5">
            <label htmlFor="com-f2" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Select Comparative Template (B)
            </label>
            <select
 id="com-f2"
              value={templateBId}
              onChange={(e) => setTemplateBId(e.target.value)}
              className="min-h-11 w-full bg-bg border border-line rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category} · {t.tier.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-surface border border-line rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-2 divide-x divide-white/[0.08] border-b border-white/[0.08] bg-surface">
            {/* Header Column A */}
            <div className="p-6 text-center">
              <div className="relative aspect-[16/10] w-full max-w-sm mx-auto rounded-xl overflow-hidden mb-4 border border-line bg-bg">
                <Image
                  src={templateA.previewImage}
                  alt={templateA.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{templateA.name}</h2>
              <span className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${getTierBadge(templateA.tier)}`}>
                {templateA.tier} Tier
              </span>
            </div>

            {/* Header Column B */}
            <div className="p-6 text-center">
              <div className="relative aspect-[16/10] w-full max-w-sm mx-auto rounded-xl overflow-hidden mb-4 border border-line bg-bg">
                <Image
                  src={templateB.previewImage}
                  alt={templateB.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{templateB.name}</h2>
              <span className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${getTierBadge(templateB.tier)}`}>
                {templateB.tier} Tier
              </span>
            </div>
          </div>

          {/* Metric Rows */}
          <div className="divide-y divide-white/[0.06] text-xs sm:text-sm">
            {/* Category */}
            <div className="grid grid-cols-2 divide-x divide-white/[0.08] p-4 bg-bg">
              <div className="px-4">
                <span className="text-muted block text-[11px] uppercase tracking-wider mb-1">Target Industry</span>
                <span className="font-semibold text-zinc-200 capitalize">{templateA.category}</span>
              </div>
              <div className="px-4">
                <span className="text-muted block text-[11px] uppercase tracking-wider mb-1">Target Industry</span>
                <span className="font-semibold text-zinc-200 capitalize">{templateB.category}</span>
              </div>
            </div>

            {/* WCAG Accessibility */}
            <div className="grid grid-cols-2 divide-x divide-white/[0.08] p-4">
              <div className="px-4 flex items-center justify-between">
                <span className="text-muted text-[11px] uppercase tracking-wider">WCAG Compliance</span>
                <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${getScoreBadge(templateA.accessibilityScore)}`}>
                  WCAG {templateA.accessibilityScore || 'AA'}
                </span>
              </div>
              <div className="px-4 flex items-center justify-between">
                <span className="text-muted text-[11px] uppercase tracking-wider">WCAG Compliance</span>
                <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${getScoreBadge(templateB.accessibilityScore)}`}>
                  WCAG {templateB.accessibilityScore || 'AA'}
                </span>
              </div>
            </div>

            {/* Community Rating & Downloads */}
            <div className="grid grid-cols-2 divide-x divide-white/[0.08] p-4 bg-bg">
              <div className="px-4 flex items-center justify-between">
                <span className="text-muted text-[11px] uppercase tracking-wider">Downloads & Rating</span>
                <span className="text-zinc-200 font-medium">
                  ★ {templateA.rating.toFixed(1)} · {templateA.downloads.toLocaleString()} dl
                </span>
              </div>
              <div className="px-4 flex items-center justify-between">
                <span className="text-muted text-[11px] uppercase tracking-wider">Downloads & Rating</span>
                <span className="text-zinc-200 font-medium">
                  ★ {templateB.rating.toFixed(1)} · {templateB.downloads.toLocaleString()} dl
                </span>
              </div>
            </div>

            {/* Included Features List */}
            <div className="grid grid-cols-2 divide-x divide-white/[0.08] p-6">
              <div className="px-2">
                <span className="text-muted block text-[11px] uppercase tracking-wider mb-3">Included Modules</span>
                <ul className="space-y-2">
                  {templateA.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-xs">
                      <span className="text-emerald-400 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-2">
                <span className="text-muted block text-[11px] uppercase tracking-wider mb-3">Included Modules</span>
                <ul className="space-y-2">
                  {templateB.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-xs">
                      <span className="text-emerald-400 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Row */}
            <div className="grid grid-cols-2 divide-x divide-white/[0.08] p-3 sm:p-6 bg-bg">
              <div className="px-1.5 sm:px-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link
                  href={`/templates/${templateA.id}`}
                  className="min-h-11 flex-1 text-center py-2.5 px-2 sm:px-4 bg-white text-zinc-950 font-semibold rounded-lg text-[11px] sm:text-xs hover:bg-zinc-200 transition-colors"
                >
                  View Details →
                </Link>
                <Link
                  href={`/builder?template=${templateA.id}`}
                  className="min-h-11 text-center py-2 sm:py-2.5 px-2.5 sm:px-3 bg-raised text-zinc-300 hover:text-white rounded-lg text-[11px] sm:text-xs border border-line"
                >
                  Editor
                </Link>
              </div>
              <div className="px-1.5 sm:px-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link
                  href={`/templates/${templateB.id}`}
                  className="min-h-11 flex-1 text-center py-2.5 px-2 sm:px-4 bg-white text-zinc-950 font-semibold rounded-lg text-[11px] sm:text-xs hover:bg-zinc-200 transition-colors"
                >
                  View Details →
                </Link>
                <Link
                  href={`/builder?template=${templateB.id}`}
                  className="min-h-11 text-center py-2 sm:py-2.5 px-2.5 sm:px-3 bg-raised text-zinc-300 hover:text-white rounded-lg text-[11px] sm:text-xs border border-line"
                >
                  Editor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
