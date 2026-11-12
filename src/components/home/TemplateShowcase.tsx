'use client';

import { useMemo, useState } from 'react';
import Section from '@/components/ui/Section';
import ChipScroller from '@/components/ui/ChipScroller';
import Chip from '@/components/ui/Chip';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import TemplateCard from '@/components/TemplateCard';
import { templates } from '@/data/templates';
import { TEMPLATE_COUNT } from '@/lib/site';
import { SHOWCASE_FILTERS } from './showcase-filters';

export default function TemplateShowcase() {
  const [active, setActive] = useState('all');
  const shown = useMemo(() => {
    const f = SHOWCASE_FILTERS.find((x) => x.id === active);
    const list = f?.match ? templates.filter((t) => f.match!.includes(t.category)) : templates;
    return list.slice(0, 8);
  }, [active]);

  return (
    <Section id="templates" eyebrow="Templates" title="Find a template for your business" intro="Every template works on phones, tablets and desktops, and needs no build tools.">
      <ChipScroller label="Filter templates by industry">
        {SHOWCASE_FILTERS.map((f) => (
          <Chip key={f.id} selected={active === f.id} onClick={() => setActive(f.id)}>
            {f.label}
          </Chip>
        ))}
      </ChipScroller>
      <ul
        className="mt-6 -mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 hide-scrollbar sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
        aria-live="polite"
        aria-label="Featured templates"
      >
        {shown.map((t, i) => (
          <Reveal as="li" key={`${active}-${t.id}`} delay={(i % 4) * 60} className="snap-start shrink-0 w-[80%] sm:w-auto">
            <TemplateCard template={t} />
          </Reveal>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <Button href="/templates" variant="secondary">See all {TEMPLATE_COUNT} templates</Button>
      </div>
    </Section>
  );
}
