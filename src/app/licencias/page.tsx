import type { Metadata } from 'next';
import content from '@/content/content.json';
import { CheckIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Licencias',
  description: 'Compara las licencias de BUKOFLOW: Básica, Standard, Ilimitada y Exclusiva. MP3, WAV y Stems para uso comercial en Spotify, YouTube y más.',
  alternates: { canonical: '/licencias' },
};

export default function LicenciasPage() {
  return (
    <main id="main" className="px-[var(--gutter)] pb-[var(--section-y)] pt-32">
      <div className="mx-auto max-w-[var(--container)]">
        <h1 className="text-center font-display text-3xl font-light tracking-tight text-fg">
          Licencias
        </h1>
        <p className="mx-auto mt-4 max-w-[var(--measure)] text-center font-body text-lg text-muted">
          Elige cómo vas a usar el beat. ¿No estás seguro? Revisa la{' '}
          <a href="/ayuda" className="text-accent hover:underline">
            ayuda para elegir tu licencia
          </a>
          .
        </p>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.licenses.map((license) => (
            <li
              key={license.id}
              className={`relative flex flex-col rounded-[var(--r-sm)] border p-6 ${
                license.popular ? 'border-accent bg-accent/5 lg:scale-105' : 'border-line bg-surface'
              }`}
            >
              {license.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[var(--r-pill)] bg-accent px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[var(--tr-mono)] text-accent-fg">
                  Más popular
                </span>
              )}
              <p className="font-mono text-mono uppercase tracking-[var(--tr-mono)] text-accent">
                {license.title}
              </p>
              <p className="mt-3 font-display text-4xl font-light text-fg">{license.price}</p>
              <ul className="mt-6 flex-1 space-y-3 text-left">
                {license.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
