export interface Review {
  id: string;
  templateId: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  createdAt: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
}

export const SEED_REVIEWS: Record<string, Review[]> = {
  'apex-landing': [
    {
      id: 'rev-apex-1',
      templateId: 'apex-landing',
      authorName: 'Marcus Vance',
      authorRole: 'Founder @ SynthOS',
      rating: 5,
      title: 'Converted 14.8% on our ProductHunt launch day',
      comment: 'The hero typography and CTA layout are mathematically tuned for conversions. We ripped out our bloated Next.js starter and replaced it with Apex Landing in 45 minutes.',
      createdAt: '2026-10-18',
      verifiedBuyer: true,
      helpfulCount: 38,
    },
    {
      id: 'rev-apex-2',
      templateId: 'apex-landing',
      authorName: 'Elena Rostova',
      authorRole: 'Senior Design Engineer',
      rating: 5,
      title: 'Zero dependencies, true 100/100 Lighthouse score',
      comment: 'Finally a modern dark-mode aesthetic that does not pull in 80MB of node_modules. Clean, vanilla HTML and CSS that boots in 12ms.',
      createdAt: '2026-10-24',
      verifiedBuyer: true,
      helpfulCount: 22,
    },
  ],
  'astral-aerospace': [
    {
      id: 'rev-astral-1',
      templateId: 'astral-aerospace',
      authorName: 'Julian Thorne',
      authorRole: 'Propulsion Systems Lead',
      rating: 5,
      title: 'Deep technical aesthetic done right',
      comment: 'The telemetry HUD panels, mono typography, and grid backgrounds give exactly the defense-grade feel our investors wanted to see.',
      createdAt: '2026-10-14',
      verifiedBuyer: true,
      helpfulCount: 45,
    },
    {
      id: 'rev-astral-2',
      templateId: 'astral-aerospace',
      authorName: 'Sarah Lin',
      authorRole: 'VP Product @ Orbital Dynamics',
      rating: 5,
      title: 'Responsive layout holds up flawlessly on iPhone 16 Pro',
      comment: 'Tested on physical hardware using the QR code sandbox — the mobile drawer and spec tables are buttery smooth.',
      createdAt: '2026-10-29',
      verifiedBuyer: true,
      helpfulCount: 19,
    },
  ],
};

// Global in-memory storage for newly submitted reviews during runtime
export const runtimeReviews: Record<string, Review[]> = {};

export function getReviewsForTemplate(templateId: string): Review[] {
  const seeds = SEED_REVIEWS[templateId] || [
    {
      id: `rev-default-${templateId}-1`,
      templateId,
      authorName: 'Devon Hayes',
      authorRole: 'Full-Stack Architect',
      rating: 5,
      title: 'Production quality craftsmanship',
      comment: 'Clean structure, responsive breakpoints are dialed in, and the color token system made rebranding take under 10 minutes.',
      createdAt: '2026-10-20',
      verifiedBuyer: true,
      helpfulCount: 14,
    },
    {
      id: `rev-default-${templateId}-2`,
      templateId,
      authorName: 'Camila Morales',
      authorRole: 'Agency Creative Director',
      rating: 5,
      title: 'Delivered to client with zero revisions',
      comment: 'Our client was blown away by the micro-interactions and dark-mode palette. Saved our team at least 40 hours of front-end dev.',
      createdAt: '2026-10-28',
      verifiedBuyer: true,
      helpfulCount: 9,
    },
  ];

  const added = runtimeReviews[templateId] || [];
  return [...added, ...seeds];
}

export function addReviewForTemplate(templateId: string, review: Omit<Review, 'id' | 'createdAt' | 'helpfulCount'>): Review {
  const newReview: Review = {
    ...review,
    id: `rev-usr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString().split('T')[0],
    helpfulCount: 1,
  };

  if (!runtimeReviews[templateId]) {
    runtimeReviews[templateId] = [];
  }
  runtimeReviews[templateId].unshift(newReview);
  return newReview;
}
