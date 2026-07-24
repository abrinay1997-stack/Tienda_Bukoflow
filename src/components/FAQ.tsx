import content from '@/content/content.json';
import { buildFaqJsonLd } from '@/lib/seo';
import { SectionHeading } from './SectionHeading';
import { FAQList } from './FAQList';

export function FAQ() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-y)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(content.faq.general)) }}
      />
      <div className="mx-auto max-w-[var(--container)]">
        <SectionHeading kicker="Preguntas frecuentes" title="Todo lo que necesitas saber" />
        <div className="mx-auto mt-12 max-w-3xl">
          <FAQList items={content.faq.general} />
        </div>
      </div>
    </section>
  );
}
