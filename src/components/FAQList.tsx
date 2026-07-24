'use client';

import { useId, useState } from 'react';
import { LazyMotion, m, useReducedMotion } from 'framer-motion';

const loadFeatures = () => import('@/lib/framerFeatures').then((mod) => mod.default);

export function FAQList({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const uid = useId();

  return (
    <LazyMotion features={loadFeatures}>
      <div className="divide-y divide-line border-y border-line">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const triggerId = `${uid}-trigger-${i}`;
          const panelId = `${uid}-panel-${i}`;

          return (
            <div key={item.q} className="py-5">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-display text-lg text-fg"
              >
                <span>{item.q}</span>
                <span
                  className="shrink-0 font-mono text-xl text-accent transition-transform duration-[var(--d-fast)]"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <m.div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="mt-3 max-w-[var(--measure)] font-body text-sm leading-[var(--lh-body)] text-muted">
                  {item.a}
                </p>
              </m.div>
            </div>
          );
        })}
      </div>
    </LazyMotion>
  );
}
