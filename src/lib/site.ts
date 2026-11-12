import { templates } from '@/data/templates';

/** Single source of truth for facts shown across the site. */
export const SITE_NAME = 'TemplateHub';
export const SITE_URL = 'https://www.templatehub.website';
export const SITE_DESCRIPTION =
  'Fast, dependency-free HTML website templates. Preview any template live, customise it in your browser, and download clean files you can host anywhere.';

/** The real number of templates in the catalogue. Never hard-code this. */
export const TEMPLATE_COUNT = templates.length;

/**
 * Contact details. Change these to your real inbox before going live.
 * Every legal page and the contact page reads from here.
 */
export const SUPPORT_EMAIL = 'support@templatehub.website';
export const LEGAL_EMAIL = 'legal@templatehub.website';
export const AFFILIATE_EMAIL = 'partners@templatehub.website';

/** Legal operator shown on legal pages. Fill in your registered business details. */
export const OPERATOR = {
  name: 'TemplateHub',
  country: 'Slovakia',
};

export const LEGAL_LAST_UPDATED = '12 November 2026';
