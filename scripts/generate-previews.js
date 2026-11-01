const fs = require('fs');
const path = require('path');

const previewConfigs = {
  'apex-landing': {
    title: 'Apex Landing',
    tag: 'SaaS & AI Tech',
    color1: '#0a0a1a', color2: '#1e1b4b', accent: '#3b82f6',
    icon: '⚡', subtitle: 'Launch Your Next Big Idea'
  },
  'minimal-folio': {
    title: 'MinimalFolio',
    tag: 'Minimal Portfolio',
    color1: '#09090b', color2: '#18181b', accent: '#a1a1aa',
    icon: '✦', subtitle: 'Alex Morgan — Senior Product Designer'
  },
  'dev-chronicle': {
    title: 'DevChronicle',
    tag: 'Technical Blog',
    color1: '#022c22', color2: '#064e3b', accent: '#10b981',
    icon: '⟨/⟩', subtitle: 'Modern Software Engineering & MDX'
  },
  'vortex-fitness': {
    title: 'Vortex Fitness',
    tag: 'High-Impact Athletic',
    color1: '#09090b', color2: '#18181b', accent: '#ccff00',
    icon: '⚡', subtitle: 'Transform Your Body & Conditioning'
  },
  'osteria-bella': {
    title: 'L’Osteria Bella',
    tag: 'Rustic Luxury Dining',
    color1: '#261109', color2: '#3d1b10', accent: '#c9a96e',
    icon: '🍷', subtitle: 'Tasting Menus, Cellar & Cucina'
  },
  'velvet-beauty': {
    title: 'Velvet & Bloom',
    tag: 'Botanical Skincare',
    color1: '#1f1618', color2: '#3d252a', accent: '#f472b6',
    icon: '🌸', subtitle: 'Clean Organic Formulations & Serums'
  },
  'storefront-pro': {
    title: 'Storefront Pro',
    tag: 'Next-Gen E-Commerce',
    color1: '#0b132b', color2: '#1c2541', accent: '#06b6d4',
    icon: '🛍️', subtitle: 'Curated Apparel & Instant Cart Drawer'
  },
  'cloudscale-saas': {
    title: 'CloudScale SaaS',
    tag: 'Enterprise Cloud Platform',
    color1: '#180d2e', color2: '#3b185f', accent: '#a855f7',
    icon: '☁️', subtitle: 'Scale Cloud Workloads With Zero Latency'
  },
  'pulse-metrics': {
    title: 'PulseMetrics',
    tag: 'Analytics Dashboard',
    color1: '#051923', color2: '#003554', accent: '#00a6fb',
    icon: '📈', subtitle: 'Real-Time KPI Telemetry & Data Tables'
  },
  'aether-ai': {
    title: 'Aether.AI Platform',
    tag: 'Autonomous Agent Engine',
    color1: '#050508', color2: '#0d0d1a', accent: '#00fff7',
    icon: '🤖', subtitle: 'Distributed LLM Orchestration & Edge'
  },
  'prestige-estates': {
    title: 'Prestige Estates',
    tag: 'Ultra-Luxury Real Estate',
    color1: '#141414', color2: '#242424', accent: '#eab308',
    icon: '🏛️', subtitle: 'Exclusive Villas & Prime Penthouses'
  },
  'krypton-agency': {
    title: 'Krypton Studio',
    tag: 'Avant-Garde Creative Agency',
    color1: '#0a0a0a', color2: '#1c1917', accent: '#ff4d00',
    icon: '⚡', subtitle: 'Neo-Brutalist Kinetic Web Experiences'
  },
  'nexus-enterprise': {
    title: 'Nexus Enterprise',
    tag: 'Zero-Trust Governance',
    color1: '#030712', color2: '#0f172a', accent: '#0284c7',
    icon: '🛡️', subtitle: 'RBAC Access Matrix & Security Audit'
  },
  'nova-saas-platform': {
    title: 'Nova SaaS Platform',
    tag: 'B2B Multi-Tenant Workspaces',
    color1: '#07070a', color2: '#161622', accent: '#9333ea',
    icon: '🚀', subtitle: 'Team Governance & Stripe Seat Billing'
  },
  'zenith-podcast': {
    title: 'Zenith Podcast',
    tag: 'Audio & Media Network',
    color1: '#090d16', color2: '#1e293b', accent: '#38bdf8',
    icon: '🎙️', subtitle: 'Episode Archive, Waveforms & Host Bios'
  },
  'cipher-crypto': {
    title: 'Cipher DeFi',
    tag: 'Web3 & Decentralized Finance',
    color1: '#020b08', color2: '#052e16', accent: '#00ff88',
    icon: '₿', subtitle: 'Live Price Tickers, Swaps & Staking'
  },
  'atlas-travel': {
    title: 'Atlas Travel',
    tag: 'Luxury Bespoke Travel',
    color1: '#0c2d4a', color2: '#1a4a6b', accent: '#c9a96e',
    icon: '✈️', subtitle: 'Curated Itineraries & Private Escapes'
  },
  'luma-photography': {
    title: 'Luma Photography',
    tag: 'Fine Art & Editorial',
    color1: '#0a0a0a', color2: '#1c150c', accent: '#d4a843',
    icon: '📸', subtitle: 'Masonry Portfolio & Commercial Shoots'
  },
  'pixel-gaming': {
    title: 'Pixel Esports',
    tag: 'Competitive Gaming Org',
    color1: '#06060e', color2: '#1e1035', accent: '#00fff7',
    icon: '🎮', subtitle: 'Championship Roster & Trophy Vault'
  },
  'medica-health': {
    title: 'Medica Health',
    tag: 'Hospital & Clinical Care',
    color1: '#0a2540', color2: '#0d3566', accent: '#00a86b',
    icon: '⚕️', subtitle: 'Specialist Consultations & Telehealth'
  },
  'eduspark-academy': {
    title: 'EduSpark Academy',
    tag: 'Interactive Tech LMS',
    color1: '#0b0f19', color2: '#1e1b4b', accent: '#6366f1',
    icon: '🎓', subtitle: 'Engineering Cohorts & Live Projects'
  },
  'verdant-eco': {
    title: 'Verdant Eco',
    tag: 'Climate Tech & ESG Auditing',
    color1: '#06231a', color2: '#064e3b', accent: '#10b981',
    icon: '🌿', subtitle: 'Scope 1-3 Telemetry & Circular Passports'
  },
  'artisan-bakery': {
    title: 'Le Petit Artisan',
    tag: 'Boutique Patisserie & Hearth',
    color1: '#291811', color2: '#5c3a21', accent: '#c59b27',
    icon: '🥐', subtitle: 'Wild Levain Sourdough & Pure Viennoiserie'
  },
  'quantum-fintech': {
    title: 'Quantum Fintech',
    tag: 'Core Banking Infrastructure',
    color1: '#07090e', color2: '#0e131f', accent: '#f59e0b',
    icon: '⚡', subtitle: 'ISO 20022 Clearing & Sub-ms Settlement'
  },
  'hyperion-ai-studio': {
    title: 'Hyperion AI Studio',
    tag: 'Generative Video Lab',
    color1: '#0d0417', color2: '#280c44', accent: '#e11d48',
    icon: '✨', subtitle: 'Neural Video Diffusion & Voice Cloning'
  },
  'solaris-clean-energy': {
    title: 'Solaris Grid',
    tag: 'Clean Energy & Smart Microgrid',
    color1: '#021e1a', color2: '#064e3b', accent: '#10b981',
    icon: '☀️', subtitle: 'Megawatt Battery Storage & Solar Telemetry'
  },
  'vanguard-security': {
    title: 'Vanguard SecOps',
    tag: 'SOC & Red Team Defense',
    color1: '#08080c', color2: '#181824', accent: '#ef4444',
    icon: '🛡️', subtitle: 'Threat Hunting, SIEM & Penetration Mesh'
  },
  'solana-launchpad': {
    title: 'Solana Launchpad',
    tag: 'High-Throughput Web3 DEX',
    color1: '#0f051d', color2: '#240847', accent: '#14f195',
    icon: '⚡', subtitle: 'Sub-Second Bonding Curves & Token Factory'
  },
  'chronos-luxury-watches': {
    title: 'Chronos Horology',
    tag: 'Haute Horlogerie Atelier',
    color1: '#0f0c08', color2: '#261c0d', accent: '#d4af37',
    icon: '⌚', subtitle: 'Tourbillon Masterpieces & Atelier Heritage'
  },
  'aurora-cloud': {
    title: 'Aurora Edge Cloud',
    tag: 'Serverless Distributed Mesh',
    color1: '#02182b', color2: '#05386b', accent: '#5cdb95',
    icon: '🌐', subtitle: 'Sub-5ms Global Edge Functions & Key-Value'
  }
};

function generateSvg(cfg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${cfg.color1}" />
      <stop offset="100%" stop-color="${cfg.color2}" />
    </linearGradient>
    <radialGradient id="glow" cx="75%" cy="25%" r="60%">
      <stop offset="0%" stop-color="${cfg.accent}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${cfg.accent}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="url(#bgGrad)" />
  <circle cx="620" cy="150" r="280" fill="url(#glow)" />

  <!-- Grid Pattern -->
  <g stroke="rgba(255,255,255,0.04)" stroke-width="1">
    <line x1="0" y1="100" x2="800" y2="100" />
    <line x1="0" y1="200" x2="800" y2="200" />
    <line x1="0" y1="300" x2="800" y2="300" />
    <line x1="0" y1="400" x2="800" y2="400" />
    <line x1="160" y1="0" x2="160" y2="500" />
    <line x1="320" y1="0" x2="320" y2="500" />
    <line x1="480" y1="0" x2="480" y2="500" />
    <line x1="640" y1="0" x2="640" y2="500" />
  </g>

  <!-- Window Frame -->
  <g filter="url(#shadow)">
    <rect x="60" y="50" width="680" height="400" rx="14" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.14)" stroke-width="1.5" />
    
    <!-- Top Bar -->
    <rect x="60" y="50" width="680" height="44" rx="14" fill="rgba(0,0,0,0.45)" />
    <circle cx="86" cy="72" r="5.5" fill="#ef4444" />
    <circle cx="104" cy="72" r="5.5" fill="#f59e0b" />
    <circle cx="122" cy="72" r="5.5" fill="#10b981" />
    <rect x="220" y="62" width="360" height="20" rx="6" fill="rgba(255,255,255,0.06)" />
    <text x="400" y="76" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="600" fill="rgba(255,255,255,0.4)" text-anchor="middle">templatehub.website/preview/${cfg.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}</text>
  </g>

  <!-- Tag Badge -->
  <g transform="translate(100, 130)">
    <rect width="180" height="26" rx="13" fill="rgba(255,255,255,0.08)" stroke="${cfg.accent}" stroke-opacity="0.4" stroke-width="1" />
    <text x="90" y="17" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="${cfg.accent}" text-anchor="middle" letter-spacing="0.5">${cfg.tag.toUpperCase()}</text>
  </g>

  <!-- Title & Subtitle -->
  <text x="100" y="200" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="34" font-weight="800" fill="#ffffff" letter-spacing="-0.5">${cfg.title}</text>
  <text x="100" y="235" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="500" fill="rgba(255,255,255,0.65)">${cfg.subtitle}</text>

  <!-- Buttons Row -->
  <g transform="translate(100, 270)">
    <rect width="130" height="36" rx="8" fill="${cfg.accent}" />
    <text x="65" y="22" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#000000" text-anchor="middle">Live Preview →</text>

    <rect x="145" width="110" height="36" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
    <text x="200" y="22" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#ffffff" text-anchor="middle">Inspect Code</text>
  </g>

  <!-- Feature Cards Preview Mockup -->
  <g transform="translate(100, 335)">
    <rect width="180" height="85" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
    <circle cx="24" cy="24" r="12" fill="${cfg.accent}" fill-opacity="0.2" />
    <text x="24" y="28" font-family="system-ui" font-size="12" text-anchor="middle">${cfg.icon}</text>
    <rect x="44" y="18" width="80" height="8" rx="4" fill="rgba(255,255,255,0.7)" />
    <rect x="16" y="46" width="145" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
    <rect x="16" y="58" width="110" height="6" rx="3" fill="rgba(255,255,255,0.15)" />

    <rect x="195" width="180" height="85" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
    <circle cx="219" cy="24" r="12" fill="${cfg.accent}" fill-opacity="0.2" />
    <text x="219" y="28" font-family="system-ui" font-size="12" text-anchor="middle">⚡</text>
    <rect x="239" y="18" width="70" height="8" rx="4" fill="rgba(255,255,255,0.7)" />
    <rect x="211" y="46" width="145" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
    <rect x="211" y="58" width="100" height="6" rx="3" fill="rgba(255,255,255,0.15)" />

    <rect x="390" width="180" height="85" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
    <circle cx="414" cy="24" r="12" fill="${cfg.accent}" fill-opacity="0.2" />
    <text x="414" y="28" font-family="system-ui" font-size="12" text-anchor="middle">🛡️</text>
    <rect x="434" y="18" width="85" height="8" rx="4" fill="rgba(255,255,255,0.7)" />
    <rect x="406" y="46" width="145" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
    <rect x="406" y="58" width="90" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
  </g>

  <!-- Large Embellished Graphic Icon on Right -->
  <g transform="translate(620, 200)">
    <circle cx="0" cy="0" r="65" fill="rgba(255,255,255,0.03)" stroke="${cfg.accent}" stroke-width="1.5" stroke-dasharray="6 6" />
    <circle cx="0" cy="0" r="50" fill="url(#glow)" />
    <text x="0" y="18" font-size="50" text-anchor="middle">${cfg.icon}</text>
  </g>
</svg>`;
}

const outDir = path.join(__dirname, '..', 'public', 'previews');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const [id, cfg] of Object.entries(previewConfigs)) {
  const svg = generateSvg(cfg);
  fs.writeFileSync(path.join(outDir, `${id}.svg`), svg, 'utf8');
}
console.log('Successfully generated 30 unique, distinct SVG previews!');
