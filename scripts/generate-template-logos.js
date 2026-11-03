const fs = require('fs');
const path = require('path');

const logos = {
  'solaris-fusion': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="sfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff7a00" />
        <stop offset="50%" stop-color="#ff3d00" />
        <stop offset="100%" stop-color="#ffb300" />
      </linearGradient>
      <radialGradient id="sfCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="40%" stop-color="#ff9100" />
        <stop offset="100%" stop-color="#ff1744" stop-opacity="0.8" />
      </radialGradient>
      <filter id="sfGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <!-- Magnetic Torus Field Rings -->
    <ellipse cx="24" cy="24" rx="20" ry="8" stroke="url(#sfGrad)" stroke-width="2" transform="rotate(-30 24 24)" stroke-dasharray="3 2" />
    <ellipse cx="24" cy="24" rx="20" ry="8" stroke="url(#sfGrad)" stroke-width="2" transform="rotate(30 24 24)" stroke-dasharray="3 2" />
    <circle cx="24" cy="24" r="18" stroke="url(#sfGrad)" stroke-width="2.5" opacity="0.4" />
    <!-- Magnetic Solenoid Coil Markers -->
    <circle cx="24" cy="6" r="2.5" fill="#ff9100" />
    <circle cx="24" cy="42" r="2.5" fill="#ff9100" />
    <circle cx="6" cy="24" r="2.5" fill="#ff7a00" />
    <circle cx="42" cy="24" r="2.5" fill="#ff7a00" />
    <!-- Ultra-Dense Plasma Core -->
    <circle cx="24" cy="24" r="7.5" fill="url(#sfCore)" filter="url(#sfGlow)" />
    <circle cx="24" cy="24" r="3.5" fill="#ffffff" />
  </svg>`,

  'velvet-atelier': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="vaGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5e6b3" />
        <stop offset="50%" stop-color="#d4af37" />
        <stop offset="100%" stop-color="#997b15" />
      </linearGradient>
    </defs>
    <!-- Parisian Crest Frame -->
    <path d="M24 4 L38 12 V24 C38 33 32 40 24 44 C16 40 10 33 10 24 V12 Z" stroke="url(#vaGold)" stroke-width="1.5" fill="none" opacity="0.35" />
    <circle cx="24" cy="24" r="15" stroke="url(#vaGold)" stroke-width="1" stroke-dasharray="2 3" opacity="0.5" />
    <!-- Interlocking V & A Monogram Curves -->
    <path d="M16 16 L24 34 L32 16" stroke="url(#vaGold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18 27 L30 27" stroke="url(#vaGold)" stroke-width="1.8" stroke-linecap="round" />
    <!-- Tailor Needle Finial -->
    <line x1="24" y1="8" x2="24" y2="13" stroke="url(#vaGold)" stroke-width="2" stroke-linecap="round" />
    <circle cx="24" cy="7" r="1.5" fill="url(#vaGold)" />
  </svg>`,

  'aether-neuro': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="anSynapse" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#a855f7" />
        <stop offset="50%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
    </defs>
    <!-- Cortical Electrode Mesh -->
    <polygon points="24,6 38,14 38,34 24,42 10,34 10,14" stroke="url(#anSynapse)" stroke-width="1.5" fill="none" opacity="0.4" />
    <!-- Neural Axon Connectors -->
    <line x1="24" y1="6" x2="24" y2="24" stroke="url(#anSynapse)" stroke-width="1.5" />
    <line x1="38" y1="14" x2="24" y2="24" stroke="url(#anSynapse)" stroke-width="1.5" />
    <line x1="38" y1="34" x2="24" y2="24" stroke="url(#anSynapse)" stroke-width="1.5" />
    <line x1="24" y1="42" x2="24" y2="24" stroke="url(#anSynapse)" stroke-width="1.5" />
    <line x1="10" y1="34" x2="24" y2="24" stroke="url(#anSynapse)" stroke-width="1.5" />
    <line x1="10" y1="14" x2="24" y2="24" stroke="url(#anSynapse)" stroke-width="1.5" />
    <!-- Synaptic Nodes -->
    <circle cx="24" cy="6" r="2.5" fill="#06b6d4" />
    <circle cx="38" cy="14" r="2.5" fill="#8b5cf6" />
    <circle cx="38" cy="34" r="2.5" fill="#06b6d4" />
    <circle cx="24" cy="42" r="2.5" fill="#8b5cf6" />
    <circle cx="10" cy="34" r="2.5" fill="#06b6d4" />
    <circle cx="10" cy="14" r="2.5" fill="#8b5cf6" />
    <!-- Central Cortical Core -->
    <circle cx="24" cy="24" r="5" fill="url(#anSynapse)" />
    <circle cx="24" cy="24" r="2" fill="#ffffff" />
  </svg>`,

  'obsidian-terminal': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="otGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00ff66" />
        <stop offset="100%" stop-color="#008f39" />
      </linearGradient>
    </defs>
    <!-- Faceted Obsidian Monolith -->
    <polygon points="24,4 40,14 36,38 24,44 12,38 8,14" fill="#0c120e" stroke="url(#otGrad)" stroke-width="2" />
    <line x1="24" y1="4" x2="24" y2="44" stroke="url(#otGrad)" stroke-width="1" opacity="0.3" />
    <line x1="8" y1="14" x2="40" y2="14" stroke="url(#otGrad)" stroke-width="1" opacity="0.3" />
    <!-- Terminal Prompt Chevron & Block Cursor -->
    <path d="M17 21 L23 25 L17 29" stroke="#00ff66" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="26" y="27" width="6" height="2.5" fill="#00ff66" />
  </svg>`,

  'valkyrie-aero': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="vaMach" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff4500" />
        <stop offset="50%" stop-color="#ff8c00" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>
    </defs>
    <!-- Mach Shockwave Cones -->
    <path d="M24 4 L42 42 L24 34 L6 42 Z" stroke="url(#vaMach)" stroke-width="1.8" fill="#070b12" />
    <path d="M24 12 L35 37 L24 31 L13 37 Z" fill="url(#vaMach)" opacity="0.25" />
    <!-- Scramjet Intake Spine -->
    <line x1="24" y1="6" x2="24" y2="33" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
    <!-- Mach 7 Thrust Plume -->
    <polygon points="24,35 27,45 24,43 21,45" fill="#ff4500" />
  </svg>`,

  'horology-complication': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="hcGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fce7d2" />
        <stop offset="50%" stop-color="#e2a07f" />
        <stop offset="100%" stop-color="#9a5a3a" />
      </linearGradient>
    </defs>
    <!-- Geneva Caliber Bezel -->
    <circle cx="24" cy="24" r="20" stroke="url(#hcGold)" stroke-width="1.5" />
    <circle cx="24" cy="24" r="17" stroke="url(#hcGold)" stroke-width="1" stroke-dasharray="1 3" opacity="0.6" />
    <!-- Flying Tourbillon Cage -->
    <circle cx="24" cy="24" r="9" stroke="url(#hcGold)" stroke-width="1.5" />
    <line x1="24" y1="15" x2="24" y2="33" stroke="url(#hcGold)" stroke-width="1.5" stroke-linecap="round" />
    <line x1="16.2" y1="28.5" x2="31.8" y2="19.5" stroke="url(#hcGold)" stroke-width="1.5" stroke-linecap="round" />
    <line x1="16.2" y1="19.5" x2="31.8" y2="28.5" stroke="url(#hcGold)" stroke-width="1.5" stroke-linecap="round" />
    <!-- Synthetic Ruby Jewel Pivot -->
    <circle cx="24" cy="24" r="3" fill="#e11d48" stroke="url(#hcGold)" stroke-width="1" />
  </svg>`,

  'arcane-distillery': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="adCopper" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24" />
        <stop offset="50%" stop-color="#d97706" />
        <stop offset="100%" stop-color="#78350f" />
      </linearGradient>
    </defs>
    <!-- Copper Alembic Still Silhouette -->
    <path d="M24 6 C28 6 30 10 30 14 C30 18 36 22 36 28 C36 36 30 42 24 42 C18 42 12 36 12 28 C12 22 18 18 18 14 C18 10 20 6 24 6 Z" stroke="url(#adCopper)" stroke-width="2" fill="none" />
    <!-- Swan Neck Condenser Vapor Tube -->
    <path d="M24 6 C24 4 28 3 32 4 C36 5 39 8 39 12 V18" stroke="url(#adCopper)" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <!-- Oak Cask Hoops -->
    <line x1="15" y1="28" x2="33" y2="28" stroke="url(#adCopper)" stroke-width="1.5" opacity="0.6" />
    <line x1="17" y1="34" x2="31" y2="34" stroke="url(#adCopper)" stroke-width="1.5" opacity="0.6" />
    <circle cx="24" cy="22" r="3" fill="#fbbf24" opacity="0.8" />
  </svg>`,

  'hyperion-robotics': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="hrHazard" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#facc15" />
        <stop offset="50%" stop-color="#eab308" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
    </defs>
    <!-- Actuator Ring Housing -->
    <circle cx="24" cy="24" r="19" stroke="url(#hrHazard)" stroke-width="2" stroke-dasharray="4 2" />
    <polygon points="24,9 37,16 37,32 24,39 11,32 11,16" stroke="#06b6d4" stroke-width="1.5" fill="none" />
    <!-- Humanoid Bionic Iris Aperture -->
    <circle cx="24" cy="24" r="7" stroke="#eab308" stroke-width="2" fill="#0b0b10" />
    <circle cx="24" cy="24" r="3" fill="#06b6d4" />
    <circle cx="25.5" cy="22.5" r="1" fill="#ffffff" />
  </svg>`,

  'magma-deepcore': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="mdThermal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="50%" stop-color="#ef4444" />
        <stop offset="100%" stop-color="#7f1d1d" />
      </linearGradient>
    </defs>
    <!-- Earth Crust Thermal Strata Arc -->
    <path d="M8 12 Q24 6 40 12" stroke="#f59e0b" stroke-width="2" fill="none" />
    <path d="M10 20 Q24 15 38 20" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.7" />
    <path d="M14 28 Q24 24 34 28" stroke="#dc2626" stroke-width="2" fill="none" opacity="0.5" />
    <!-- Deep Penetrating Drill Vector -->
    <polygon points="24,8 28,34 24,42 20,34" fill="url(#mdThermal)" />
    <!-- Supercritical Magma Waves -->
    <circle cx="24" cy="42" r="4" fill="#f59e0b" opacity="0.9" />
  </svg>`,

  'apex-endurance': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="aeVolt" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#84cc16" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
    </defs>
    <!-- Dynamic Aerodynamic Velocity Chevrons -->
    <path d="M10 12 L24 24 L10 36" stroke="url(#aeVolt)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M22 12 L36 24 L22 36" stroke="url(#aeVolt)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Metabolic Pulse Wave -->
    <path d="M14 24 H20 L22 18 L26 30 L28 22 L30 24 H34" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`,

  'monolith-acoustics': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="maGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fb923c" />
        <stop offset="50%" stop-color="#f97316" />
        <stop offset="100%" stop-color="#c2410c" />
      </linearGradient>
    </defs>
    <!-- Vacuum Tube Glass Dome -->
    <path d="M16 16 C16 10 20 6 24 6 C28 6 32 10 32 16 V34 H16 V16 Z" stroke="#a1a1aa" stroke-width="1.8" fill="none" />
    <!-- Glowing Triode Filament Lattice -->
    <line x1="21" y1="16" x2="21" y2="28" stroke="url(#maGlow)" stroke-width="2" stroke-linecap="round" />
    <line x1="27" y1="16" x2="27" y2="28" stroke="url(#maGlow)" stroke-width="2" stroke-linecap="round" />
    <path d="M19 22 H29" stroke="url(#maGlow)" stroke-width="1.5" />
    <!-- Concentric Acoustic Waves -->
    <path d="M37 14 C40 17 41 21 41 24 C41 27 40 31 37 34" stroke="url(#maGlow)" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <path d="M11 14 C8 17 7 21 7 24 C7 27 8 31 11 34" stroke="url(#maGlow)" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <!-- Tube Base Pins -->
    <rect x="18" y="34" width="12" height="4" fill="#52525b" rx="1" />
  </svg>`,

  'terra-mycelium': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="tmSpore" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5f5dc" />
        <stop offset="50%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#047857" />
      </linearGradient>
    </defs>
    <!-- Fungal Spore Core -->
    <circle cx="24" cy="24" r="5" fill="url(#tmSpore)" />
    <!-- Branching Hyphae Network -->
    <path d="M24 19 C24 14 20 10 15 8" stroke="#10b981" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M24 19 C26 12 33 9 37 8" stroke="#10b981" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M28 26 C34 27 38 32 40 38" stroke="#10b981" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M20 26 C15 28 11 33 8 38" stroke="#10b981" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M24 29 V41" stroke="#10b981" stroke-width="2" stroke-linecap="round" />
    <!-- Spore Nodes -->
    <circle cx="15" cy="8" r="2" fill="#f5f5dc" />
    <circle cx="37" cy="8" r="2" fill="#f5f5dc" />
    <circle cx="40" cy="38" r="2" fill="#f5f5dc" />
    <circle cx="8" cy="38" r="2" fill="#f5f5dc" />
    <circle cx="24" cy="41" r="2" fill="#f5f5dc" />
  </svg>`,

  'helios-orbital': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="hoBeaming" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24" />
        <stop offset="50%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>
    </defs>
    <!-- Sun-Synchronous Orbit Ring -->
    <ellipse cx="24" cy="24" rx="20" ry="10" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.6" transform="rotate(-25 24 24)" />
    <!-- Central Solar Power Satellite Array -->
    <rect x="21" y="21" width="6" height="6" fill="#fbbf24" rx="1" />
    <!-- Photovoltaic Wings -->
    <line x1="12" y1="24" x2="21" y2="24" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
    <line x1="27" y1="24" x2="36" y2="24" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
    <!-- Directed Microwave Vector Beaming -->
    <line x1="24" y1="27" x2="24" y2="44" stroke="url(#hoBeaming)" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 2" />
    <circle cx="24" cy="44" r="2" fill="#fbbf24" />
  </svg>`,

  'kaiseki-sanctuary': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="ksGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="50%" stop-color="#d4af37" />
        <stop offset="100%" stop-color="#997b15" />
      </linearGradient>
    </defs>
    <!-- Traditional Japanese Kamon Roundel -->
    <circle cx="24" cy="24" r="20" stroke="url(#ksGold)" stroke-width="1.8" fill="none" />
    <circle cx="24" cy="24" r="17" stroke="url(#ksGold)" stroke-width="0.8" opacity="0.4" />
    <!-- 5-Petal Hinoki Blossom Crest -->
    <circle cx="24" cy="15" r="4.5" stroke="url(#ksGold)" stroke-width="1.5" />
    <circle cx="32.5" cy="21" r="4.5" stroke="url(#ksGold)" stroke-width="1.5" />
    <circle cx="29" cy="31" r="4.5" stroke="url(#ksGold)" stroke-width="1.5" />
    <circle cx="19" cy="31" r="4.5" stroke="url(#ksGold)" stroke-width="1.5" />
    <circle cx="15.5" cy="21" r="4.5" stroke="url(#ksGold)" stroke-width="1.5" />
    <circle cx="24" cy="24" r="2.5" fill="url(#ksGold)" />
  </svg>`,

  'vanguard-quant': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="vqGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="100%" stop-color="#22c55e" />
      </linearGradient>
    </defs>
    <!-- Algorithmic Diamond Frame -->
    <polygon points="24,6 42,24 24,42 6,24" stroke="url(#vqGreen)" stroke-width="1.8" fill="#030712" />
    <!-- Intersecting High-Frequency Delta Bars -->
    <rect x="18" y="18" width="4" height="12" fill="#22c55e" rx="1" />
    <line x1="20" y1="14" x2="20" y2="34" stroke="#22c55e" stroke-width="1.5" />
    <rect x="26" y="14" width="4" height="14" fill="#4ade80" rx="1" />
    <line x1="28" y1="10" x2="28" y2="32" stroke="#4ade80" stroke-width="1.5" />
    <!-- Sub-Microsecond Execution Lightning Line -->
    <path d="M12 28 L22 20 L28 26 L36 16" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`,

  'hydros-foil': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="hfTeal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2dd4bf" />
        <stop offset="50%" stop-color="#14b8a6" />
        <stop offset="100%" stop-color="#0f766e" />
      </linearGradient>
    </defs>
    <!-- Aerodynamic Hull Line -->
    <path d="M8 20 C18 19 32 18 42 16" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
    <!-- Dual Surface Piercing T-Foils -->
    <path d="M16 20 V34 H24" stroke="url(#hfTeal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M30 19 V34 H38" stroke="url(#hfTeal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Oceanic Wave Surface (Zero Wake) -->
    <path d="M6 38 C12 36 18 40 24 38 C30 36 36 40 42 38" stroke="url(#hfTeal)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 3" opacity="0.6" />
  </svg>`,

  'solarium-conservatory': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="scGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bef264" />
        <stop offset="50%" stop-color="#84cc16" />
        <stop offset="100%" stop-color="#065f46" />
      </linearGradient>
    </defs>
    <!-- Geodesic Glass Dome Arc -->
    <path d="M8 38 C8 20 15 8 24 8 C33 8 40 20 40 38 Z" stroke="url(#scGreen)" stroke-width="1.8" fill="none" />
    <line x1="24" y1="8" x2="24" y2="38" stroke="url(#scGreen)" stroke-width="1" opacity="0.4" />
    <line x1="8" y1="38" x2="40" y2="38" stroke="url(#scGreen)" stroke-width="2" stroke-linecap="round" />
    <!-- Living Fern Sprout Frond -->
    <path d="M24 36 C24 26 21 18 17 16" stroke="#84cc16" stroke-width="2" stroke-linecap="round" />
    <path d="M24 32 C26 28 31 26 33 24" stroke="#84cc16" stroke-width="2" stroke-linecap="round" />
    <circle cx="17" cy="16" r="2" fill="#bef264" />
    <circle cx="33" cy="24" r="2" fill="#bef264" />
  </svg>`,

  'sentinel-swarm': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="ssSonar" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34d399" />
        <stop offset="100%" stop-color="#059669" />
      </linearGradient>
    </defs>
    <!-- Tactical Radar Sweep Reticle -->
    <circle cx="24" cy="24" r="19" stroke="url(#ssSonar)" stroke-width="1.8" opacity="0.7" />
    <circle cx="24" cy="24" r="12" stroke="url(#ssSonar)" stroke-width="1.2" stroke-dasharray="2 2" opacity="0.5" />
    <circle cx="24" cy="24" r="5" stroke="url(#ssSonar)" stroke-width="1" opacity="0.4" />
    <!-- Radar Crosshairs -->
    <line x1="24" y1="5" x2="24" y2="43" stroke="url(#ssSonar)" stroke-width="1" opacity="0.4" />
    <line x1="5" y1="24" x2="43" y2="24" stroke="url(#ssSonar)" stroke-width="1" opacity="0.4" />
    <!-- Autonomous Swarm Triad Deltas -->
    <polygon points="24,14 27,19 24,18 21,19" fill="#10b981" />
    <polygon points="33,28 36,33 33,32 30,33" fill="#10b981" />
    <polygon points="15,28 18,33 15,32 12,33" fill="#10b981" />
  </svg>`,

  'brutalist-sanctuary': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="bsConcrete" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e7e5e4" />
        <stop offset="50%" stop-color="#a8a29e" />
        <stop offset="100%" stop-color="#44403c" />
      </linearGradient>
    </defs>
    <!-- Cantilevered Monolithic Concrete Volumes -->
    <polygon points="8,36 40,36 40,30 8,30" fill="#292524" stroke="url(#bsConcrete)" stroke-width="1.5" />
    <polygon points="14,30 34,30 34,22 14,22" fill="#44403c" stroke="url(#bsConcrete)" stroke-width="1.5" />
    <polygon points="10,22 38,22 38,12 10,12" fill="#78716c" stroke="url(#bsConcrete)" stroke-width="1.5" />
    <polygon points="18,12 30,12 30,6 18,6" fill="#a8a29e" stroke="url(#bsConcrete)" stroke-width="1.5" />
    <!-- Strict Architectural Void Slit -->
    <rect x="22" y="16" width="4" height="6" fill="#0c0a09" />
  </svg>`,

  'pulselab-crispr': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
    <defs>
      <linearGradient id="pcHelix" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ec4899" />
        <stop offset="50%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
    </defs>
    <!-- Microfluidic Cartridge Chip Chamber -->
    <rect x="8" y="8" width="32" height="32" rx="6" stroke="url(#pcHelix)" stroke-width="1.8" fill="#090d16" />
    <!-- CRISPR Cas12 DNA Double-Helix Loop -->
    <path d="M16 16 C20 20 28 20 32 16" stroke="#ec4899" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M16 32 C20 28 28 28 32 32" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- RNA Guide & Cleavage Base Pairs -->
    <line x1="20" y1="18" x2="20" y2="30" stroke="url(#pcHelix)" stroke-width="1.5" />
    <line x1="24" y1="19" x2="24" y2="29" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
    <line x1="28" y1="18" x2="28" y2="30" stroke="url(#pcHelix)" stroke-width="1.5" />
    <circle cx="24" cy="24" r="2.5" fill="#ec4899" />
  </svg>`,
};

const logosDir = path.join(__dirname, '..', 'public', 'logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

for (const [id, svg] of Object.entries(logos)) {
  fs.writeFileSync(path.join(logosDir, `${id}.svg`), svg.trim(), 'utf8');
  console.log(`✓ Generated real vector logo: public/logos/${id}.svg`);
}

console.log(`\nSuccessfully created ${Object.keys(logos).length} real vector logos!`);
