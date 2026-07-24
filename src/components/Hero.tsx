'use client';

import dynamic from 'next/dynamic';
import content from '@/content/content.json';
import { useCanRender3D } from '@/hooks/useCanRender3D';
import { ParticleText } from './ParticleText';

const ParticleCanvas = dynamic(() => import('./hero/ParticleCanvas'), { ssr: false });

export function Hero() {
  const canRender3D = useCanRender3D();

  const scrollToPlayer = () => {
    document.getElementById('player')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-bg px-[var(--gutter)]">
      {canRender3D ? (
        <ParticleCanvas />
      ) : (
        <div aria-hidden="true" className="spotlight" />
      )}

      <div className="relative z-content mx-auto flex max-w-[var(--container)] flex-col items-center gap-8 text-center">
        <p className="font-mono text-mono uppercase tracking-[var(--tr-mono)] text-accent">
          {content.hero.kicker}
        </p>

        <ParticleText
          as="h1"
          className="font-display text-[clamp(2.5rem,1.2rem+7vw,7rem)] font-extralight leading-[var(--lh-tight)] tracking-[var(--tr-display)] text-fg"
        >
          {content.hero.h1}
        </ParticleText>

        <p className="max-w-[var(--measure)] font-body text-lg text-muted">{content.hero.sub}</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <button type="button" onClick={scrollToPlayer} className="btn-primary">
            {content.hero.cta.label}
          </button>
          <a href={content.hero.secondaryCta.href} className="btn-ghost">
            {content.hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
