export interface NavLink {
  href: string;
  label: string;
}

/** Links shown in the desktop top bar (≥1024px) and the phone "More" sheet. */
export const PRIMARY_LINKS: NavLink[] = [
  { href: '/templates', label: 'Templates' },
  { href: '/studio', label: 'Studio' },
  { href: '/ai-generator', label: 'AI Studio' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/licensing', label: 'Licensing' },
];

export type TabIcon = 'home' | 'grid' | 'wand' | 'tag' | 'user';

/** Tabs in the phone bottom bar. Account is resolved by sign-in state. */
export const TAB_LINKS: (NavLink & { icon: TabIcon })[] = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/templates', label: 'Templates', icon: 'grid' },
  { href: '/studio', label: 'Studio', icon: 'wand' },
  { href: '/#pricing', label: 'Pricing', icon: 'tag' },
];

/** True when `href` is the current section (so /templates/x highlights Templates). */
export function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return false;
  return pathname === href || pathname.startsWith(href + '/');
}
