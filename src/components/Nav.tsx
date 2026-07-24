'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import content from '@/content/content.json';

export function Nav() {
  const [open, setOpen] = useState(false);

  // Cierra el menú móvil con Escape, sin importar dónde esté el foco.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-nav border-b border-line bg-bg/70 backdrop-blur-lg">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-20 max-w-[var(--container)] items-center justify-between px-[var(--gutter)]"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg font-semibold tracking-tight text-fg"
        >
          BUKOFLOW
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {content.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-body text-sm font-medium text-fg transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="group relative">
            <button
              type="button"
              className="flex items-center gap-1.5 font-body text-sm font-medium text-fg transition-colors hover:text-accent"
              aria-haspopup="true"
            >
              Tools
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <ul className="invisible absolute right-0 top-full mt-2 w-56 rounded-[var(--r-sm)] border border-line bg-surface py-1 opacity-0 shadow-xl transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {content.tools.map((tool) => (
                <li key={tool.href}>
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-fg hover:bg-bg hover:text-accent"
                  >
                    {tool.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={`border-t border-line bg-bg md:hidden ${open ? 'block' : 'hidden'}`}
      >
        <ul className="flex flex-col px-[var(--gutter)] py-4">
          {content.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-body text-base text-fg hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {content.tools.map((tool) => (
            <li key={tool.href}>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 font-body text-sm text-muted hover:text-accent"
              >
                {tool.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
