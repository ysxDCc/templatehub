import { templateStatsLabel } from '@/lib/template-stats';

export default function TemplateStats({ rating, downloads, className = 'text-xs' }: { rating: number; downloads: number; className?: string }) {
  const s = templateStatsLabel({ rating, downloads });
  if (s.isNew) {
    return (
      <span className={`${className} inline-flex items-center rounded-full bg-success/15 px-2 py-0.5 font-semibold text-success`}>
        New
      </span>
    );
  }
  return (
    <span className={`${className} text-muted`}>
      <span className="text-amber-300">★ {s.rating}</span> · {s.downloads} downloads
    </span>
  );
}
