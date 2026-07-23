import type { Metadata } from 'next';
import content from '@/content/content.json';
import { FAQList } from '@/components/FAQList';

export const metadata: Metadata = {
  title: `${content.customMusic.h1} | BUKOFLOW`,
  description: content.customMusic.intro[0],
};

export default function ProduccionMusicalPage() {
  return (
    <main id="main" className="px-[var(--gutter)] pb-[var(--section-y)] pt-32">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-center font-display text-3xl font-light tracking-tight text-fg">
          {content.customMusic.h1}
        </h1>

        <div className="mt-8 space-y-4 font-body text-base leading-[var(--lh-body)] text-muted">
          {content.customMusic.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h2 className="mt-10 font-display text-lg font-medium text-fg">Servicios ofrecidos</h2>
        <ul className="mt-4 space-y-3">
          {content.customMusic.offered.map((item) => (
            <li key={item} className="flex items-start gap-3 font-body text-sm text-muted">
              <span className="text-accent" aria-hidden="true">
                &#10003;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center font-body text-muted">{content.customMusic.closing}</p>

        <div className="mt-8 text-center">
          <a href={content.customMusic.cta.href} className="btn-primary">
            {content.customMusic.cta.label}
          </a>
        </div>

        <section className="mt-16 border-t border-line pt-12">
          <h2 className="text-center font-display text-xl font-light text-fg">
            Preguntas frecuentes
          </h2>
          <div className="mt-8">
            <FAQList items={content.customMusic.faq} />
          </div>
        </section>
      </article>
    </main>
  );
}
