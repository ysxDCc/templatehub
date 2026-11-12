import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';

const STEPS = [
  { n: 1, title: 'Pick a template', body: 'Browse by industry and open a full live preview — not just a screenshot.', icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
  { n: 2, title: 'Add your details', body: 'Type your business name, products and contact info, and upload photos. The preview updates as you go.', icon: 'M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z' },
  { n: 3, title: 'Download & publish', body: 'Get a ZIP with index.html and upload it to Netlify, Vercel or any web host.', icon: 'M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2' },
];

export default function HowItWorks() {
  return (
    <Section eyebrow="How it works" title="From template to live site in three steps">
      <ol className="grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 80} className="rounded-card border border-line bg-surface p-6">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-control bg-primary/20 text-lilac">
                <svg aria-hidden="true" className="w-5 h-5 motion-safe:animate-[th-float_3s_ease-in-out_infinite]" style={{ animationDelay: `${i * 300}ms` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </span>
              <span className="text-sm font-semibold text-muted">Step {s.n}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
