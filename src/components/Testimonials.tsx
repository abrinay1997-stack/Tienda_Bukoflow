'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from './SectionHeading';

const AUTOPLAY_MS = 5000;

type Testimonial = { artist: string; spotifySrc: string };

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const length = testimonials.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused]);

  const next = () => setIndex((i) => (i + 1) % length);
  const prev = () => setIndex((i) => (i - 1 + length) % length);

  return (
    <section className="px-[var(--gutter)] py-[var(--section-y)]">
      <div className="mx-auto max-w-[var(--container)]">
        <SectionHeading kicker="Prueba social" title="Artistas que confían en BUKOFLOW" />

        <div
          ref={containerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative mt-16 flex h-[440px] items-center justify-center overflow-hidden"
          style={{ perspective: '1400px' }}
        >
          <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
            {testimonials.map((testimonial, i) => {
              let offset = (i - index + length) % length;
              if (offset > length / 2) offset -= length;
              const abs = Math.abs(offset);
              const isCenter = offset === 0;
              const visible = abs <= 2;
              // Solo se monta el iframe de Spotify para la tarjeta central y sus
              // vecinas inmediatas: evita cargar los 8 reproductores a la vez en móvil.
              const mountPlayer = abs <= 1;

              const translateX = offset * 202.5;
              const translateZ = -abs * 130;
              const rotateY = -offset * 24;
              const scale = 1 - abs * 0.12;
              const opacity = visible ? 1 - abs * 0.28 : 0;

              return (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  key={`${testimonial.artist}-${i}`}
                  onClick={() => setIndex(i)}
                  aria-hidden={!isCenter}
                  className="absolute left-1/2 top-1/2 w-[280px] cursor-pointer transition-all duration-700 ease-[var(--ease-out)] sm:w-[300px]"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex: 50 - abs,
                    pointerEvents: isCenter ? 'none' : 'auto',
                  }}
                >
                  <div
                    className={`overflow-hidden rounded-xl shadow-2xl transition-shadow ${
                      isCenter ? 'shadow-accent/30 ring-2 ring-accent/50' : 'shadow-black/50'
                    }`}
                  >
                    {mountPlayer ? (
                      <iframe
                        title={`Beat producido para ${testimonial.artist}, en Spotify`}
                        src={testimonial.spotifySrc}
                        className="h-[352px] w-full rounded-xl border-0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        tabIndex={-1}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex h-[352px] w-full items-center justify-center bg-surface"
                      >
                        <span className="font-mono text-xs uppercase tracking-[var(--tr-mono)] text-muted">
                          {testimonial.artist}
                        </span>
                      </div>
                    )}
                  </div>
                  <p
                    className={`mt-3 text-center font-display text-lg transition-opacity duration-500 ${
                      isCenter ? 'text-fg opacity-100' : 'text-muted opacity-0'
                    }`}
                  >
                    {testimonial.artist}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
            aria-label="Testimonio anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Testimonios">
            {testimonials.map((testimonial, i) => (
              <button
                key={`${testimonial.artist}-dot-${i}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Ver testimonio de ${testimonial.artist}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? 'bg-accent' : 'bg-line hover:bg-muted'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
            aria-label="Siguiente testimonio"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
