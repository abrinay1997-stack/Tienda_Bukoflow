import Link from 'next/link';
import content from '@/content/content.json';
import { SectionHeading } from './SectionHeading';

export function ServicesTeaser() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-y)]">
      <div className="mx-auto max-w-[var(--container)]">
        <SectionHeading kicker="Servicios" title="Producción, mezcla y mastering a medida" />

        <ul className="mt-16 divide-y divide-line border-y border-line">
          {content.services.map((service) => (
            <li key={service.id}>
              <Link
                href={`/servicios/${service.id}`}
                className="group flex items-center gap-6 py-8 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-lg text-accent">{service.n}</span>
                <span className="flex-1">
                  <span className="block font-display text-xl font-medium text-fg md:text-2xl">
                    {service.title}
                  </span>
                  <span className="mt-1 block max-w-[var(--measure)] font-body text-sm text-muted">
                    {service.headline}
                  </span>
                </span>
                {service.price && (
                  <span className="hidden font-mono text-sm text-muted sm:block">{service.price}</span>
                )}
                <svg
                  className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
