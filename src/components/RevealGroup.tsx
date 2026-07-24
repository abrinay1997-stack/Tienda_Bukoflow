'use client';

import { LazyMotion, m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const loadFeatures = () => import('@/lib/framerFeatures').then((mod) => mod.default);

const container = {
  hidden: {},
  show: {},
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function RevealGroup({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        transition={{ staggerChildren: reduceMotion ? 0 : 0.06 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <m.li
      className={className}
      variants={item}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.li>
  );
}
