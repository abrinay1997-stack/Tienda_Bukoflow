import type { Metadata } from 'next';
import content from '@/content/content.json';
import { FAQList } from '@/components/FAQList';
import { buildFaqJsonLd } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Centro de Ayuda',
  description: 'Ayuda para elegir tu licencia y respuestas a las preguntas más frecuentes sobre beats, stems y licencias de BUKOFLOW.',
  alternates: { canonical: '/ayuda' },
};

export default function AyudaPage() {
  return (
    <main id="main" className="px-[var(--gutter)] pb-[var(--section-y)] pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd([...content.faq.licenses, ...content.faq.general])),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal immediate>
          <h1 className="text-center font-display text-3xl font-light tracking-tight text-fg">
            Centro de Ayuda
          </h1>
        </Reveal>

        <Reveal immediate>
          <section className="mt-16">
            <h2 className="text-center font-display text-xl font-light text-fg">
              Ayuda para elegir tu licencia
            </h2>
            <div className="mt-8">
              <FAQList items={content.faq.licenses} />
            </div>
          </section>
        </Reveal>

        <Reveal immediate>
          <section className="mt-20">
            <h2 className="text-center font-display text-xl font-light text-fg">
              Preguntas y respuestas
            </h2>
            <div className="mt-8">
              <FAQList items={content.faq.general} />
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
