import Reveal from '@/components/ui/Reveal';

const POINTS = [
  { title: 'Nothing to install', body: 'Plain HTML and CSS. No npm packages to update, so your site keeps working for years.' },
  { title: 'Fast on every phone', body: 'No framework to download. Check any template yourself with Google PageSpeed.' },
  { title: 'Your brand in one place', body: 'Colours live in a few CSS variables, so rebranding takes minutes.' },
  { title: 'Host it anywhere', body: 'Netlify, Vercel, GitHub Pages or a normal web host — your choice.' },
];

export default function WhyStrip() {
  return (
    <section aria-labelledby="why-title" className="py-16 md:py-20 border-y border-line bg-surface/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 id="why-title" className="sr-only">Why TemplateHub</h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 60}>
              <h3 className="text-base font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-[15px] text-muted leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
