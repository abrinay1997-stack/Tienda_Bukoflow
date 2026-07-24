import content from '@/content/content.json';
import { Reveal } from './Reveal';

export function CTA() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-y-lg)] text-center">
      <Reveal>
        <div className="mx-auto max-w-[var(--measure)]">
          <h2 className="font-display text-3xl font-light tracking-tight text-fg md:text-5xl">
            Para colaboraciones, contáctanos
          </h2>
          <div className="mt-10 flex justify-center">
            <a href={`mailto:${content.nap.email}`} className="btn-primary">
              Escribir por correo
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
