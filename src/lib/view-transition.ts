/**
 * Runs `update` inside a View Transition when the browser supports it and the
 * visitor hasn't asked for reduced motion; otherwise just runs it.
 */
export function withViewTransition(update: () => void | Promise<void>): void {
  const doc = document as Document & { startViewTransition?: (cb: () => void | Promise<void>) => unknown };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!doc.startViewTransition || reduce) {
    void update();
    return;
  }
  doc.startViewTransition(update);
}

/** Resolves once `location.pathname` equals `path` (or after `timeout` ms). */
export function waitForPath(path: string, timeout = 3000): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      if (location.pathname === path || performance.now() - start > timeout) {
        requestAnimationFrame(() => resolve());
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}
