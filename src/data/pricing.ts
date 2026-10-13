import { PricingPlan } from '@/types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Signup',
    price: 0,
    interval: 'month',
    description: 'Get started for free. Pick and download 1 free starter template upon registration.',
    features: [
      '1 free website template upon signup',
      'Interactive in-browser live sandboxes',
      'Standard responsive layouts',
      'Personal use license',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 3,
    interval: 'month',
    dodoProductId: 'pdt_0NpgItSPPrLwWxL1VNu5h',
    description: 'Affordable entry plan for creators, blogs, and freelancers.',
    features: [
      'Access to all Basic & Free templates',
      'Download up to 5 templates per month',
      'Full live interactive sandboxes',
      'Personal & freelance project license',
      'Email support assistance',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    interval: 'month',
    dodoProductId: 'pdt_0NpgIuba73JMfBWvtkFHg',
    description: 'Unlock our entire template library, updates, and commercial usage.',
    features: [
      'Unlimited access to ALL templates',
      'Full source code & asset files',
      'Full commercial client license',
      'Monthly new template drops',
      'Priority support & setup guides',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29.99,
    interval: 'month',
    dodoProductId: 'pdt_0NpgIueDKNSywrCSEg3EN',
    description: 'For design agencies and teams needing custom source files and 24/7 support.',
    features: [
      'Everything in Pro tier',
      'Figma source files & tokens',
      'Extended enterprise multi-client license',
      'Custom template requests',
      'Dedicated 24/7 priority support',
    ],
  },
];
