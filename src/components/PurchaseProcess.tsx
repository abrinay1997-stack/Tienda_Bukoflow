import content from '@/content/content.json';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { CreditCardIcon, DownloadIcon, MousePointerIcon } from './Icons';

const icons = [MousePointerIcon, CreditCardIcon, DownloadIcon];

export function PurchaseProcess() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-y)]">
      <Reveal>
        <div className="mx-auto max-w-[var(--container)]">
          <SectionHeading kicker="Cómo funciona" title="De la búsqueda al archivo final" />
          <ol className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            {content.purchaseProcess.map((step, i) => {
              const Icon = icons[i];
              return (
                <li key={step.stage} className="flex flex-col items-center gap-4 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line text-accent">
                    <Icon />
                  </span>
                  <span className="font-mono text-mono uppercase tracking-[var(--tr-mono)] text-accent">
                    {step.stage}
                  </span>
                  <h3 className="font-display text-lg font-medium text-fg">{step.title}</h3>
                  <p className="max-w-xs font-body text-sm text-muted">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
