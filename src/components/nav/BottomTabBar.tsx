'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const activeIndex = accountActive ? 4 : TAB_LINKS.findIndex((t) => isActive(pathname, t.href));
  // Re-trigger the icon bounce whenever the active tab changes.
  const [bounceKey, setBounceKey] = useState(0);
  useEffect(() => setBounceKey((k) => k + 1), [activeIndex]);

  return (
    <nav
      aria-label="Quick navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-bg/92 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="relative flex">
        {activeIndex >= 0 && (
          <li aria-hidden="true" className="th-tab-pill pointer-events-none absolute top-0 left-0 h-full w-1/5 flex items-start justify-center" style={{ transform: `translateX(${activeIndex * 100}%)` }}>
            <span className="block w-12 h-7 mt-[5px] rounded-full bg-primary/30" />
          </li>
        )}
        {TAB_LINKS.map((t) => {
          const active = isActive(pathname, t.href);
          return (
            <li key={t.href} className="flex-1 flex">
              <Link href={t.href} aria-current={active ? 'page' : undefined} className={tabCls(active)}>
                <span key={active ? `on-${bounceKey}` : 'off'} className={`relative flex items-center justify-center w-12 h-7 ${active ? 'text-lilac th-bounce' : ''}`}>
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
