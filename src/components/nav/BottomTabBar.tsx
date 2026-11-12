'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useClerk } from '@clerk/nextjs';
import { TAB_LINKS, isActive } from './nav-links';
import { Icon } from './TabIcons';

const tabCls = (active: boolean) =>
  `flex-1 flex flex-col items-center justify-center gap-0.5 min-h-14 text-[11px] font-medium transition-colors ${
    active ? 'text-ink' : 'text-muted hover:text-ink'
  }`;

/** Phone-only bottom navigation (hidden from 768px up). */
export default function BottomTabBar() {
  const pathname = usePathname() || '/';
  const clerk = useClerk();
  // Default to the signed-out tab so the bar never shifts while Clerk loads.
  const { isSignedIn } = useAuth();
  const accountActive = pathname.startsWith('/login') || pathname.startsWith('/signup');

  return (
    <nav
      aria-label="Quick navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-bg/92 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="flex">
        {TAB_LINKS.map((t) => {
          const active = isActive(pathname, t.href);
          return (
            <li key={t.href} className="flex-1 flex">
              <Link href={t.href} aria-current={active ? 'page' : undefined} className={tabCls(active)}>
                <span className={`relative flex items-center justify-center w-12 h-7 rounded-full transition-colors ${active ? 'bg-primary/30 text-lilac' : ''}`}>
                  <Icon name={t.icon} />
                </span>
                {t.label}
              </Link>
            </li>
          );
        })}
        <li className="flex-1 flex">
          {isSignedIn ? (
            <button type="button" onClick={() => clerk.openUserProfile()} className={tabCls(false)}>
              <span className="flex items-center justify-center w-12 h-7"><Icon name="user" /></span>
              Account
            </button>
          ) : (
            <Link href="/login" aria-current={accountActive ? 'page' : undefined} className={tabCls(accountActive)}>
              <span className="flex items-center justify-center w-12 h-7"><Icon name="user" /></span>
              Account
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
