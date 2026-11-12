import type { MetadataRoute } from 'next';
import { templates } from '@/data/templates';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: Array<[string, number, MetadataRoute.Sitemap[number]['changeFrequency']]> = [
    ['', 1, 'weekly'],
    ['/templates', 0.9, 'weekly'],
    ['/studio', 0.8, 'monthly'],
    ['/ai-generator', 0.6, 'monthly'],
    ['/compare', 0.5, 'monthly'],
    ['/builder', 0.4, 'monthly'],
    ['/licensing', 0.5, 'yearly'],
    ['/about', 0.4, 'yearly'],
    ['/contact', 0.4, 'yearly'],
    ['/affiliate', 0.4, 'yearly'],
    ['/terms', 0.2, 'yearly'],
    ['/privacy', 0.2, 'yearly'],
    ['/refunds', 0.2, 'yearly'],
  ];

  return [
    ...staticPages.map(([path, priority, changeFrequency]) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...templates.map((t) => ({
      url: `${SITE_URL}/templates/${t.id}`,
      lastModified: new Date(t.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [`${SITE_URL}${t.previewImage}`],
    })),
  ];
}
