import content from '@/content/content.json';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export function CatalogIntro() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-y)] text-center">
      <Reveal>
        <div className="mx-auto max-w-[var(--container)]">
          <SectionHeading title={content.catalogIntro.h2} />
          <p className="mx-auto mt-6 max-w-[var(--measure)] font-body text-lg leading-[var(--lh-body)] text-muted">
            {content.catalogIntro.text}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
