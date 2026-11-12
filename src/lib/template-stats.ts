export type TemplateStatsLabel =
  | { isNew: true }
  | { isNew: false; rating: string; downloads: string };

/** Unrated templates show a "New" badge instead of made-up numbers. */
export function templateStatsLabel(t: { rating: number; downloads: number }): TemplateStatsLabel {
  if (!t.rating) return { isNew: true };
  return { isNew: false, rating: t.rating.toFixed(1), downloads: t.downloads.toLocaleString('en-US') };
}
