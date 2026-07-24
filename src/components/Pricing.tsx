import content from '@/content/content.json';
import { CheckIcon } from './Icons';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { RevealGroup, RevealItem } from './RevealGroup';

export function Pricing() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-y)]">
      <div className="mx-auto max-w-[var(--container)]">
        <Reveal>
          <SectionHeading kicker="Licencias" title="Elige cómo vas a usar el beat" />
        </Reveal>
        <RevealGroup>
          <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.licenses.map((license) => (
              <RevealItem
                key={license.id}
                className={`relative flex flex-col rounded-[var(--r-sm)] border p-6 ${
                  license.popular ? 'border-accent bg-accent/5 lg:scale-105' : 'border-line bg-surface'
                }`}
              >
                {license.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[var(--r-pill)] bg-accent px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[var(--tr-mono)] text-accent-fg">
                    Más popular
                  </span>
                )}
                <p className="font-mono text-mono uppercase tracking-[var(--tr-mono)] text-accent">
                  {license.title}
                </p>
                <p className="mt-3 font-display text-4xl font-light text-fg">{license.price}</p>
                <ul className="mt-6 flex-1 space-y-3 text-left">
                  {license.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>
      </div>
    </section>
  );
}
