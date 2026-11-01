'use client';

import Image from 'next/image';
import Link from 'next/link';
import { templates } from '@/data/templates';

export default function ShowcaseMarquee() {
  // Select 12 visually stunning templates across distinct verticals
  const showcaseList = templates.slice(0, 14);

  return (
    <section className="py-14 border-b border-white/[0.08] bg-zinc-950/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Visual Archive // 36 Authentic Masterpieces</span>
        </div>
        <Link
          href="/templates"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
        >
          <span>Explore Entire Catalog</span>
          <span>→</span>
        </Link>
      </div>

      {/* Infinite scrolling track container */}
      <div className="relative w-full overflow-hidden mask-fade-edges">
        <div className="flex w-max gap-5 animate-marquee hover:pause">
          {[...showcaseList, ...showcaseList].map((t, idx) => (
            <Link
              key={`${t.id}-${idx}`}
              href={`/templates/${t.id}`}
              className="group relative w-72 sm:w-80 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 transition-all hover:border-indigo-500/60 hover:scale-[1.02] shadow-xl block"
            >
              <div className="relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                <Image
                  src={t.previewImage}
                  alt={t.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-xs font-semibold text-white bg-indigo-600/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-lg">
                    Launch Sandbox ↗
                  </span>
                </div>
              </div>
              <div className="p-3 bg-zinc-950 flex items-center justify-between border-t border-white/[0.06]">
                <div>
                  <div className="text-xs font-bold text-zinc-200 truncate">{t.name}</div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">{t.category}</div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase font-mono border border-white/10 bg-zinc-900 text-zinc-300">
                  {t.tier}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}
