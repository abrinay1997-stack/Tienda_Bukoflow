import content from '@/content/content.json';
import { SectionHeading } from './SectionHeading';

export function FAQ() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-y)]">
      <div className="mx-auto max-w-[var(--container)]">
        <SectionHeading kicker="Preguntas frecuentes" title="Todo lo que necesitas saber" />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {content.faq.general.map((item, i) => (
            <details key={item.q} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-fg [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  className="shrink-0 font-mono text-xl text-accent transition-transform duration-[var(--d-fast)] group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[var(--measure)] font-body text-sm leading-[var(--lh-body)] text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
