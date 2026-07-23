import Link from 'next/link';
import content from '@/content/content.json';

export function Footer() {
  return (
    <footer className="border-t border-line px-[var(--gutter)] py-16">
      <div className="mx-auto max-w-[var(--container)]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-fg">BUKOFLOW</p>
            <p className="mt-3 max-w-xs font-body text-sm text-muted">
              Beats de Trap, Rap, Drill y Reggaeton, y licencias de música para artistas, marcas
              y creadores.
            </p>
          </div>

          <div>
            <p className="font-mono text-mono uppercase tracking-[var(--tr-mono)] text-accent">
              Servicios
            </p>
            <ul className="mt-4 space-y-2">
              {content.services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/servicios/${service.id}`}
                    className="font-body text-sm text-muted transition-colors hover:text-fg"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-mono uppercase tracking-[var(--tr-mono)] text-accent">
              Contacto
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${content.nap.email}`}
                  className="font-body text-sm text-muted transition-colors hover:text-fg"
                >
                  {content.nap.email}
                </a>
              </li>
              <li>
                <a
                  href={content.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted transition-colors hover:text-fg"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={content.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted transition-colors hover:text-fg"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={content.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted transition-colors hover:text-fg"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} {content.legal.company}
          </p>
          <Link
            href={content.legal.privacyUrl}
            className="font-body text-xs text-muted transition-colors hover:text-fg"
          >
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
