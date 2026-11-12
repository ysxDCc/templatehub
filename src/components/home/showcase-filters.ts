export interface ShowcaseFilter {
  id: string;
  label: string;
  match?: string[];
}

/** Homepage industry filters. `match` lists template categories. */
export const SHOWCASE_FILTERS: ShowcaseFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'business', label: 'Business & landing', match: ['landing-page', 'agency', 'portfolio', 'blog', 'podcast', 'photography', 'education'] },
  { id: 'shops-food', label: 'Shops, food & fitness', match: ['e-commerce', 'restaurant', 'dining', 'food', 'fitness', 'beauty', 'spa', 'travel'] },
  { id: 'saas-ai', label: 'SaaS & AI', match: ['saas', 'ai', 'cloud', 'dashboard', 'quantum'] },
  { id: 'architecture-luxury', label: 'Property & luxury', match: ['architecture', 'furniture', 'luxury', 'real-estate', 'yachts', 'auction'] },
  { id: 'aerospace-defense', label: 'Tech & security', match: ['aerospace', 'space', 'astronomy', 'security', 'cybersecurity', 'cyberpunk'] },
  { id: 'motorsport-gaming', label: 'Motorsport & gaming', match: ['motorsport', 'hypercar', 'gaming', 'arcade', 'spatial'] },
  { id: 'biotech-fintech', label: 'Health, science & finance', match: ['biotech', 'bionics', 'healthcare', 'fintech', 'crypto', 'energy', 'green', 'geothermal', 'industrial', 'agriculture', 'oceanic', 'audio', 'culture'] },
];
