import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

/** Looping CSS-only animation of a template being edited in the Studio. */
export default function StudioDemo() {
  return (
    <Section
      eyebrow="Auto-Edit Studio"
      title="Make it yours without touching code"
      intro="Fill in a form, upload your photos and watch the template change live. Everything stays on your device until you download."
    >
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        <Reveal className="rounded-section border border-line bg-surface p-4 sm:p-6">
          <div aria-hidden="true" className="grid grid-cols-[1fr_1.3fr] gap-4">
            <div className="space-y-3">
              {['Business name', 'Headline', 'Brand colour'].map((l) => (
                <div key={l}>
                  <div className="text-[11px] text-muted mb-1">{l}</div>
                  <div className="h-8 rounded-md border border-line bg-bg px-2 flex items-center text-xs text-ink overflow-hidden">
                    {l === 'Business name' && <span className="th-type inline-block overflow-hidden whitespace-nowrap border-r-2 border-lilac">Leo&apos;s Coffee</span>}
                    {l === 'Headline' && <span className="opacity-80">Fresh roasts daily</span>}
                    {l === 'Brand colour' && <span className="th-swatch inline-block w-4 h-4 rounded" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-line bg-bg p-3">
              <div className="flex items-center justify-between">
                <span className="th-name text-xs font-bold">Leo&apos;s Coffee</span>
                <span className="th-swatch-bg h-4 w-10 rounded" />
              </div>
              <div className="mt-4 h-3 w-4/5 rounded bg-white/20" />
              <div className="mt-2 h-3 w-3/5 rounded bg-white/10" />
              <div className="mt-4 th-swatch-bg h-6 w-20 rounded" />
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                <div className="h-10 rounded bg-white/5" />
                <div className="h-10 rounded bg-white/5" />
                <div className="h-10 rounded bg-white/5" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">Type, pick a colour, and the preview updates instantly.</p>
        </Reveal>
        <Reveal delay={100}>
          <ul className="space-y-4 text-[15px] text-ink/90">
            {['Swap in your business name, headline and products', 'Upload your own logo and photos', 'Pick your brand colour', 'Download a ready-to-host ZIP'].map((f) => (
              <li key={f} className="flex gap-3">
                <svg aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 text-lilac" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href="/studio" size="lg">Try the Studio free</Button>
            <p className="text-sm text-muted self-center">No account needed to try.</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
