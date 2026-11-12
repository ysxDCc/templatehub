import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Spotlight from '@/components/fx/Spotlight';
import Magnetic from '@/components/fx/Magnetic';

export default function FinalCta() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-section border border-line-strong bg-raised">
          <Spotlight className="px-6 py-12 md:py-16 text-center">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.4),transparent)]" />
          <h2 className="relative text-[28px] md:text-[40px] font-bold tracking-tight text-ink text-balance">Your next website is one download away</h2>
          <p className="relative mt-3 text-base md:text-lg text-muted max-w-xl mx-auto">Sign up free and download a starter template today. Upgrade only when you need more.</p>
          <div className="relative mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Magnetic><Button href="/signup" size="lg" className="w-full sm:w-auto">Start free</Button></Magnetic>
            <Button href="/templates" size="lg" variant="secondary">Browse templates</Button>
          </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
