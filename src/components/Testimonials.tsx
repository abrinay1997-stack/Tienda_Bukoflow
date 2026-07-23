'use client';

import { useRef } from 'react';
import content from '@/content/content.json';
import { SectionHeading } from './SectionHeading';

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const amount = (card?.clientWidth ?? 300) + 24; // ancho de tarjeta + gap-6
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: amount * direction, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="px-[var(--gutter)] py-[var(--section-y)]">
      <div className="mx-auto max-w-[var(--container)]">
        <SectionHeading kicker="Prueba social" title="Artistas que confían en BUKOFLOW" />

        <div className="relative mt-12">
          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {content.testimonials.map((testimonial, i) => (
              <li
                key={`${testimonial.artist}-${i}`}
                className="w-[280px] shrink-0 snap-center sm:w-[300px]"
              >
                <div className="overflow-hidden rounded-[var(--r-sm)] border border-line bg-surface">
                  <iframe
                    title={`Beat producido para ${testimonial.artist}, en Spotify`}
                    src={testimonial.spotifySrc}
                    className="h-[352px] w-full border-0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center font-display text-fg">{testimonial.artist}</p>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
              aria-label="Testimonio anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
              aria-label="Siguiente testimonio"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
