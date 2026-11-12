'use client';

import { useEffect, useState } from 'react';
import Celebrate from './Celebrate';

/** Fires one confetti burst shortly after the page appears. */
export default function CelebrateOnMount() {
  const [k, setK] = useState(0);
  useEffect(() => {
    const t = window.setTimeout(() => setK(1), 250);
    return () => window.clearTimeout(t);
  }, []);
  return <Celebrate burstKey={k} />;
}
