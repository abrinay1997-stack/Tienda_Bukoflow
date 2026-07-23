import type { Metadata } from 'next';
import content from '@/content/content.json';
import { FAQList } from '@/components/FAQList';

export const metadata: Metadata = {
  title: 'Centro de Ayuda | BUKOFLOW',
  description: 'Ayuda para elegir tu licencia y respuestas a las preguntas más frecuentes sobre beats, stems y licencias de BUKOFLOW.',
};

export default function AyudaPage() {
  return (
    <main id="main" className="px-[var(--gutter)] pb-[var(--section-y)] pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center font-display text-3xl font-light tracking-tight text-fg">
          Centro de Ayuda
        </h1>

        <section className="mt-16">
          <h2 className="text-center font-display text-xl font-light text-fg">
            Ayuda para elegir tu licencia
          </h2>
          <div className="mt-8">
            <FAQList items={content.faq.licenses} />
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center font-display text-xl font-light text-fg">
            Preguntas y respuestas
          </h2>
          <div className="mt-8">
            <FAQList items={content.faq.general} />
          </div>
        </section>
      </div>
    </main>
  );
}
