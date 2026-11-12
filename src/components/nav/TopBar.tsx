'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Show, UserButton, useUser } from '@clerk/nextjs';
import Logo from '@/components/Logo';
import CommandPalette from '@/components/CommandPalette';
import ReferralModal from '@/components/ReferralModal';
import Button from '@/components/ui/Button';
import { cyberSound } from '@/lib/sound';
import { PRIMARY_LINKS, isActive } from './nav-links';
import { Icon } from './TabIcons';

const ADMIN_EMAIL = 'leogregus9@gmail.com';

/** Sticky top navigation. Phones show logo + search + account; desktop adds links. */
export default function TopBar() {
  const pathname = usePathname() || '/';
  const { user } = useUser();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Changing the key re-mounts the logo, replaying its assemble animation.
  const [logoKey, setLogoKey] = useState(0);
  const paletteOpenRef = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);

  paletteOpenRef.current = paletteOpen;
  const plan = ((user?.publicMetadata?.subscription as string) || 'free').toLowerCase();
  const isAdmin = user?.primaryEmailAddress?.emailAddress?.toLowerCase() === ADMIN_EMAIL;

  useEffect(() => setSoundOn(cyberSound.isEnabled()), []);

  // ⌘K / Ctrl+K opens search (the palette itself handles closing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !paletteOpenRef.current) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the overflow menu on outside click / Escape / navigation.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const iconBtn =
    'inline-flex items-center justify-center w-11 h-11 rounded-control text-muted hover:text-ink hover:bg-white/5 transition-colors';

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-[background-color,border-color] duration-300 border-b ${
          scrolled ? 'bg-bg/85 backdrop-blur-xl border-line' : 'bg-bg/60 backdrop-blur-md border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" aria-label="TemplateHub home" className="flex items-center min-h-11 shrink-0" onClick={() => setLogoKey((k) => k + 1)}>
            <Logo key={logoKey} size="sm" />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
            {PRIMARY_LINKS.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex items-center min-h-11 px-3 rounded-control text-[15px] font-medium transition-colors ${
                    active ? 'text-ink bg-white/5' : 'text-muted hover:text-ink'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden md:inline-flex items-center gap-2 min-h-11 px-3 rounded-control border border-line text-sm text-muted hover:text-ink hover:border-line-strong transition-colors"
            >
              <Icon name="search" className="w-4 h-4" />
              <span>Search</span>
              <kbd className="hidden lg:inline text-[11px] px-1.5 py-0.5 rounded border border-line">⌘K</kbd>
            </button>
            <button type="button" onClick={() => setPaletteOpen(true)} aria-label="Search templates" className={`${iconBtn} md:hidden`}>
              <Icon name="search" />
            </button>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-label="More options"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={() => setMenuOpen((o) => !o)}
                className={iconBtn}
              >
                <Icon name={menuOpen ? 'close' : 'menu'} />
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-64 rounded-card border border-line bg-raised p-2 shadow-[0_24px_48px_-12px_rgb(0_0_0/0.6)]"
                >
                  <div className="lg:hidden">
                    {PRIMARY_LINKS.map((l) => (
                      <Link key={l.href} role="menuitem" href={l.href} className="flex items-center min-h-11 px-3 rounded-control text-ink hover:bg-white/5">
                        {l.label}
                      </Link>
                    ))}
                    <div className="my-2 border-t border-line" />
                  </div>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setReferralOpen(true);
                    }}
                    className="w-full flex items-center gap-3 min-h-11 px-3 rounded-control text-ink hover:bg-white/5 text-left"
                  >
                    <Icon name="gift" /> Earn 30% as a partner
                  </button>
                  <button
                    type="button"
                    role="menuitemcheckbox"
                    aria-checked={soundOn}
                    onClick={() => setSoundOn(cyberSound.toggle())}
                    className="w-full flex items-center gap-3 min-h-11 px-3 rounded-control text-ink hover:bg-white/5 text-left"
                  >
                    <Icon name={soundOn ? 'sound' : 'mute'} /> Sound effects: {soundOn ? 'on' : 'off'}
                  </button>
                  {isAdmin && (
                    <Link role="menuitem" href="/admin" className="flex items-center min-h-11 px-3 rounded-control text-ink hover:bg-white/5">
                      Admin
                    </Link>
                  )}
                  <div className="my-2 border-t border-line" />
                  {['/about', '/contact'].map((h) => (
                    <Link key={h} role="menuitem" href={h} className="flex items-center min-h-11 px-3 rounded-control text-muted hover:text-ink hover:bg-white/5 capitalize">
                      {h.slice(1)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Show when="signed-out">
              <Link href="/login" className="hidden sm:inline-flex items-center min-h-11 px-3 text-sm font-medium text-muted hover:text-ink">
                Log in
              </Link>
              <Button href="/signup" size="sm" className="hidden sm:inline-flex">
                Start free
              </Button>
            </Show>
            <Show when="signed-in">
              {plan === 'free' ? (
                <Link
                  href="/#pricing"
                  className="hidden sm:inline-flex items-center min-h-11 px-3 text-sm font-semibold text-lilac hover:text-ink"
                >
                  Upgrade
                </Link>
              ) : (
                <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold capitalize border border-line text-lilac">
                  {plan}
                </span>
              )}
              <div className="inline-flex items-center justify-center w-11 h-11">
                <UserButton />
              </div>
            </Show>
          </div>
        </div>
      </header>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <ReferralModal isOpen={referralOpen} onClose={() => setReferralOpen(false)} />
    </>
  );
}
