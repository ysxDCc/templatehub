'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeMap = {
    sm: { icon: 32, text: 'text-base', badge: 'text-[9px] px-1.5 py-0.2' },
    md: { icon: 40, text: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { icon: 48, text: 'text-2xl', badge: 'text-xs px-2.5 py-0.5' },
    xl: { icon: 64, text: 'text-3xl', badge: 'text-xs px-3 py-1' },
  };

  const { icon, text, badge } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3.5 group select-none ${className}`}>
      {/* Cool Cybernetic Nexus Vortex Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Multi-layered Neon Ambient Aura */}
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-600 opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl group-hover:scale-125" />
        <div className="absolute -inset-0.5 rounded-xl bg-[#0a0319] border border-purple-500/40" />

        <svg
          width={icon}
          height={icon}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_16px_rgba(168,85,247,0.8)]"
        >
          <defs>
            {/* Holographic Glow Filters */}
            <filter id="hyperGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="coreBlast" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur2" />
              <feComposite in="SourceGraphic" in2="blur2" operator="over" />
            </filter>

            {/* Kinetic Gradients */}
            <linearGradient id="bladeGrad1" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="45%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            <linearGradient id="bladeGrad2" x1="70" y1="10" x2="10" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>

            <linearGradient id="bladeGrad3" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>

            <radialGradient id="fusionCore" cx="40" cy="40" r="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f43f5e" />
              <stop offset="70%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#1e0847" />
            </radialGradient>

            <linearGradient id="cyberBorder" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Outer Cyber Hexagonal Ring */}
          <polygon
            points="40,4 72,22 72,58 40,76 8,58 8,22"
            stroke="url(#cyberBorder)"
            strokeWidth="1.75"
            strokeDasharray="6 4 14 4"
            className="animate-spin-slow origin-center"
          />

          {/* Inner Geometric Shield Shards */}
          <polygon
            points="40,12 66,27 66,53 40,68 14,53 14,27"
            fill="#090317"
            stroke="url(#bladeGrad1)"
            strokeWidth="1.2"
            opacity="0.9"
          />

          {/* Kinetic Energy Blade A (Top-Left Angle) */}
          <path
            d="M40 16L60 28L40 40L20 28Z"
            fill="url(#bladeGrad1)"
            stroke="#ffffff"
            strokeWidth="0.5"
            strokeOpacity="0.7"
          />

          {/* Kinetic Energy Blade B (Bottom-Left Angle) */}
          <path
            d="M20 28L40 40L40 64L20 52Z"
            fill="url(#bladeGrad2)"
            stroke="#a855f7"
            strokeWidth="0.5"
            strokeOpacity="0.8"
          />

          {/* Kinetic Energy Blade C (Right Angle) */}
          <path
            d="M40 40L60 28L60 52L40 64Z"
            fill="url(#bladeGrad3)"
            stroke="#e879f9"
            strokeWidth="0.5"
            strokeOpacity="0.8"
          />

          {/* Central Reactor / Fusion Core */}
          <circle
            cx="40"
            cy="40"
            r="9"
            fill="url(#fusionCore)"
            filter="url(#hyperGlow)"
          />

          {/* Core White Pulse Center */}
          <circle
            cx="40"
            cy="40"
            r="3.5"
            fill="#ffffff"
            filter="url(#coreBlast)"
          />

          {/* Holographic Specular Cross Flare */}
          <path
            d="M40 18L41.5 35L47 38.5L41.5 42L40 59L38.5 42L33 38.5L38.5 35Z"
            fill="#ffffff"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Typography with Cyber Aesthetics */}
      {showText && (
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className={`${text} font-black tracking-tight text-white flex items-center`}>
                <span className="tracking-tight">TEMPLATE</span>
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent ml-1 drop-shadow-[0_0_18px_rgba(168,85,247,0.7)]">
                  HUB
                </span>
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-purple-400/80 uppercase font-bold mt-0.5">
              SOVEREIGN REGISTRY
            </span>
          </div>

          <span
            className={`${badge} font-mono uppercase font-extrabold tracking-wider rounded-lg bg-gradient-to-r from-purple-600/30 via-fuchsia-600/30 to-violet-600/30 border border-purple-400/50 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.35)] self-center`}
          >
            56 LIVE
          </span>
        </div>
      )}
    </div>
  );
}
