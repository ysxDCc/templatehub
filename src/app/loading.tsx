import Logo from '@/components/Logo';

/** Shown only when a page takes a moment to load (fades in after 300ms). */
export default function Loading() {
  return (
    <div className="th-loading min-h-[60vh] flex flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <Logo size="xl" showText={false} />
      <span className="text-sm text-muted">Loading…</span>
    </div>
  );
}
