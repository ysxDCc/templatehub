'use client';

import Image from 'next/image';
import Link from 'next/link';
import { templates } from '@/data/templates';

export default function ShowcaseMarquee() {
  // Select 14 visually stunning templates across distinct verticals
  const showcaseList = templates.slice(0, 14);

  return (
    <section className="py-14 border-b border-purple-500/20 bg-[#09041a] overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-purple-600/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-purple-300">
          <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping"></span>
          <span>Live Visual Archive // 56 Authentic Masterpieces</span>
        </div>
        <Link
          href="/templates"
          className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
        >
          <span>Explore Entire Catalog</span>
          <span>→</span>
        </Link>
      </div>

      {/* Infinite scrolling track container with purple mask fade */}
      <div className="relative w-full overflow-hidden mask-fade-purple">
        <div className="flex w-max gap-5 animate-marquee hover:pause">
          {[...showcaseList, ...showcaseList].map((t, idx) => (
            <Link
              key={`${t.id}-${idx}`}
              href={`/templates/${t.id}`}
              className="group relative w-72 sm:w-80 shrink-0 rounded-2xl overflow-hidden border border-purple-500/25 bg-[#0e0624] transition-all duration-300 hover:border-purple-400/80 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(168,85,247,0.35)] block"
            >
              <div className="relative aspect-[16/10] w-full bg-[#070314] overflow-hidden">
                <Image
                  src={t.previewImage}
                  alt={t.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070314] via-[#070314]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    Launch Sandbox ↗
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#0e0624] flex items-center justify-between border-t border-purple-500/20">
                <div>
                  <div className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                    {t.name}
                  </div>
                  <div className="text-[10px] font-mono text-purple-400/80 uppercase">
                    {t.category}
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase font-mono border border-purple-500/30 bg-[#070314] text-purple-300">
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
        .mask-fade-purple {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
      `}</style>
    </section>
  );
}
