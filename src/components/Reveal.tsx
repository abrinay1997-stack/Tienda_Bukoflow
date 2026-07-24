'use client';

import { LazyMotion, m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const loadFeatures = () => import('@/lib/framerFeatures').then((mod) => mod.default);

export function Reveal({
  children,
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const trigger = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' } };

  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        initial={{ opacity: 0, y: 24 }}
        {...trigger}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          delay: reduceMotion ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
