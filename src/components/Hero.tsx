'use client';

import { useEffect, useRef } from 'react';
import content from '@/content/content.json';

export function Hero() {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !h1Ref.current) return;

    let cancelled = false;
    let revertSplit: (() => void) | undefined;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { default: SplitType }] = await Promise.all([
        import('gsap'),
        import('split-type'),
      ]);
      if (cancelled || !h1Ref.current) return;

      const split = new SplitType(h1Ref.current, { types: 'words' });
      revertSplit = () => split.revert();

      ctx = gsap.context(() => {
        gsap.from(split.words, {
          yPercent: 120,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.045,
        });
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
      revertSplit?.();
    };
  }, []);

  const scrollToPlayer = () => {
    document.getElementById('player')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-[var(--gutter)] pb-24 pt-32">
      <div aria-hidden="true" className="spotlight" />

      <div className="relative z-content mx-auto flex max-w-[var(--container)] flex-col items-center gap-8 text-center">
        <p className="font-mono text-mono uppercase tracking-[var(--tr-mono)] text-accent">
          {content.hero.kicker}
        </p>

        <h1
          ref={h1Ref}
          className="font-display text-[clamp(2.5rem,1.2rem+7vw,7rem)] font-extralight leading-[var(--lh-tight)] tracking-[var(--tr-display)] text-fg"
        >
          {content.hero.h1}
        </h1>

        <p className="max-w-[var(--measure)] font-body text-lg text-muted">{content.hero.sub}</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <button type="button" onClick={scrollToPlayer} className="btn-primary">
            {content.hero.cta.label}
          </button>
          <a href={content.hero.secondaryCta.href} className="btn-ghost">
            {content.hero.secondaryCta.label}
          </a>
        </div>

        <div className="mt-8 w-full max-w-2xl">
          <div className="overflow-hidden rounded-[var(--r-sm)] border border-line bg-surface shadow-2xl">
            <iframe
              id="player"
              title="Reproductor de beats BUKOFLOW"
              src={content.player.embedUrl}
              className="h-[400px] w-full border-0 md:h-[500px]"
              allowFullScreen
              loading="lazy"
            >
              {`Tu navegador no soporta iframes. Visita la tienda en ${content.player.fallbackUrl}`}
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
