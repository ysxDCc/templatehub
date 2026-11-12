import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { TEMPLATE_COUNT } from '@/lib/site';
import HeroPreviewCarousel from './HeroPreviewCarousel';

const HERO_TEMPLATES = ['astral-aerospace', 'vortex-fitness', 'osteria-bella', 'cloudscale-saas', 'minimal-folio'];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.35),transparent)]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-20 md:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-surface text-sm text-lilac">
            <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
            {TEMPLATE_COUNT} templates · edit in your browser
          </p>
          <h1 className="mt-5 text-[40px] leading-[1.05] sm:text-5xl lg:text-[64px] font-bold tracking-tight text-ink text-balance">
            Launch a beautiful website this afternoon.
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed max-w-xl">
            Pick a ready-made template, add your name, photos and products right in the browser, and download plain HTML you can host anywhere. No code, no build step.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href="/templates" size="lg">Browse templates</Button>
            <Button href="/studio" size="lg" variant="secondary">Try the Studio free</Button>
          </div>
          <p className="mt-4 text-sm text-muted">Free starter template · plans from €3/month · cancel anytime</p>
        </Reveal>
        <Reveal delay={120}>
          <HeroPreviewCarousel templateIds={HERO_TEMPLATES} />
        </Reveal>
      </div>
    </section>
  );
}
