import content from '@/content/content.json';
import { SectionHeading } from './SectionHeading';
import { FAQList } from './FAQList';

export function FAQ() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-y)]">
      <div className="mx-auto max-w-[var(--container)]">
        <SectionHeading kicker="Preguntas frecuentes" title="Todo lo que necesitas saber" />
        <div className="mx-auto mt-12 max-w-3xl">
          <FAQList items={content.faq.general} />
        </div>
      </div>
    </section>
  );
}
