import content from '@/content/content.json';

export default function HomePage() {
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-mono uppercase tracking-[0.14em] text-accent">{content.hero.kicker}</p>
      <h1 className="font-display text-3xl font-light tracking-tight md:text-5xl">{content.hero.h1}</h1>
      <p className="max-w-[68ch] font-body text-muted">{content.hero.sub}</p>
      <p className="mt-8 text-sm text-muted">Fase 3 — scaffold. El Hero definitivo (S02c) llega en la siguiente fase.</p>
    </main>
  );
}
