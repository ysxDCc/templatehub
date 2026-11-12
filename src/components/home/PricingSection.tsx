'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import PricingCard from '@/components/PricingCard';
import { pricingPlans } from '@/data/pricing';

export default function PricingSection() {
  const scroller = useRef<HTMLUListElement>(null);

  // On phones the plans swipe sideways; start with the highlighted plan in view.
  useEffect(() => {
    const el = scroller.current;
    if (!el || window.matchMedia('(min-width: 768px)').matches) return;
    const target = el.querySelector<HTMLElement>('[data-highlighted="true"]');
    if (target) el.scrollLeft = target.offsetLeft - (el.clientWidth - target.clientWidth) / 2;
  }, []);

  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Simple monthly plans"
      intro={
        <>
          Cancel anytime. Templates you download stay licensed to you.{' '}
          <Link href="/licensing" className="text-lilac underline underline-offset-4">Compare licences</Link>
        </>
      }
    >
      <ul
        ref={scroller}
        aria-label="Plans"
        className="-mx-4 px-4 pt-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 hide-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible"
      >
        {pricingPlans.map((plan) => (
          <li key={plan.id} data-highlighted={plan.highlighted ? 'true' : undefined} className="snap-center shrink-0 w-[85%] max-w-sm md:w-auto md:max-w-none">
            <PricingCard plan={plan} />
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted text-center">
        Secure checkout by Dodo Payments · Visa, Mastercard, Apple Pay, Google Pay ·{' '}
        <Link href="/refunds" className="text-lilac underline underline-offset-4">Refund policy</Link>
      </p>
    </Section>
  );
}
