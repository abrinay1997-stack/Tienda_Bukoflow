import content from '@/content/content.json';

export function CTA() {
  return (
    <section className="px-[var(--gutter)] py-[var(--section-y-lg)] text-center">
      <div className="mx-auto max-w-[var(--measure)]">
        <h2 className="font-display text-3xl font-light tracking-tight text-fg md:text-5xl">
          Para colaboraciones, contáctanos
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={`mailto:${content.nap.email}`} className="btn-primary">
            Escribir por correo
          </a>
          <a
            href={content.social.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Visitar bukoflow.com
          </a>
        </div>
      </div>
    </section>
  );
}
