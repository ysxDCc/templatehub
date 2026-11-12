import { PricingPlan } from '@/types';

export const SINGLE_TEMPLATE_PRODUCT_ID = 'pdt_0NrAVl49cJx0ieQvv8P07';
export const SINGLE_TEMPLATE_PRICE = 9;

/** Dodo product ids → plan. Shared by the webhook and the entitlement check. */
export const PRODUCT_TO_TIER: Record<string, 'basic' | 'pro' | 'enterprise'> = {
  // Live mode products
  pdt_0NrADRDfp8T2zDVsEGRI1: 'basic',
  pdt_0NrADRIRwLn8v87737eXX: 'pro',
  pdt_0NrADRKsIRfzGl1RtXlG7: 'enterprise',
  // Test mode products
  pdt_0NpgItSPPrLwWxL1VNu5h: 'basic',
  pdt_0NpgIuba73JMfBWvtkFHg: 'pro',
  pdt_0NpgIueDKNSywrCSEg3EN: 'enterprise',
};

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Signup',
    price: 0,
    interval: 'month',
    description: 'Create an account and download one free starter template. No card needed.',
    features: [
      '1 free template download',
      'Live previews of every template',
      'Full HTML & CSS source of your free template',
      'Personal-use licence (non-commercial)',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 3,
    interval: 'month',
    dodoProductId: 'pdt_0NrADRDfp8T2zDVsEGRI1',
    description: 'For personal sites, blogs and your own freelance projects.',
    features: [
      'All Free and Basic templates',
      'Up to 5 downloads per month',
      'Full HTML & CSS source of every download',
      'Auto-Edit Studio for Basic templates',
      'Licence: personal + your own freelance projects',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    interval: 'month',
    dodoProductId: 'pdt_0NrADRIRwLn8v87737eXX',
    trialDays: 3,
    description: '3 days free, then €10/month. Cancel before the trial ends and you pay nothing.',
    features: [
      'Every template, unlimited downloads',
      'Full source + JSX / Vue / Astro export',
      'Auto-Edit Studio on every template',
      'All-templates ZIP bundle',
      'Licence: commercial use incl. client sites',
      'Priority email support',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29.99,
    interval: 'month',
    dodoProductId: 'pdt_0NrADRKsIRfzGl1RtXlG7',
    description: 'For agencies building sites for many clients.',
    features: [
      'Everything in Pro',
      'Figma source files & design tokens',
      'Licence: unlimited client projects for your agency',
      'Custom template requests',
      'Top-priority support',
    ],
  },
];
