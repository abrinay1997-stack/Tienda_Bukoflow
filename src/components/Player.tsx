import content from '@/content/content.json';

export function Player() {
  return (
    <section id="player" className="px-[var(--gutter)] py-[var(--section-y)]">
      <div className="mx-auto max-w-[var(--container-wide)]">
        <div className="overflow-hidden rounded-[var(--r-sm)] border border-line bg-surface shadow-2xl">
          <iframe
            title="Reproductor de beats BUKOFLOW"
            src={content.player.embedUrl}
            className="h-[600px] w-full border-0 md:h-[750px]"
            allowFullScreen
            loading="lazy"
          >
            {`Tu navegador no soporta iframes. Visita la tienda en ${content.player.fallbackUrl}`}
          </iframe>
        </div>
      </div>
    </section>
  );
}
