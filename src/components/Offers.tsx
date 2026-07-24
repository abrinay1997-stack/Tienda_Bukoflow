import content from '@/content/content.json';
import { TagIcon } from './Icons';
import { RevealGroup, RevealItem } from './RevealGroup';

export function Offers() {
  return (
    <section className="px-[var(--gutter)] pb-[var(--section-y)]">
      <RevealGroup>
        <ul className="mx-auto grid max-w-[var(--container)] grid-cols-1 gap-6 md:grid-cols-3">
          {content.offers.map((offer) => (
            <RevealItem
              key={offer.title}
              className={`rounded-[var(--r-sm)] border p-6 text-center transition-transform duration-[var(--d-fast)] ease-[var(--ease-soft)] hover:-translate-y-1 ${
                offer.highlight ? 'border-accent bg-accent/5' : 'border-line bg-surface'
              }`}
            >
              <span
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                  offer.highlight ? 'bg-accent text-accent-fg' : 'bg-bg text-accent'
                }`}
              >
                <TagIcon />
              </span>
              <p className="mt-4 font-display text-xl font-medium uppercase tracking-tight text-fg">
                {offer.title}
              </p>
              <p className="mt-1 font-body text-sm text-muted">{offer.subtext}</p>
            </RevealItem>
          ))}
        </ul>
      </RevealGroup>
    </section>
  );
}
