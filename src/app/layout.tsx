import type { Metadata } from 'next';
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google';
import content from '@/content/content.json';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
  display: 'swap',
});

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: content.legal.company,
  url: SITE_URL,
  email: content.nap.email,
  sameAs: [content.social.instagram, content.social.youtube, content.social.tiktok],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: content.meta.title,
    template: '%s | BUKOFLOW',
  },
  description: content.meta.description,
  openGraph: {
    type: 'website',
    locale: 'es_PA',
    siteName: 'BUKOFLOW',
    title: content.meta.title,
    description: content.meta.description,
  },
  twitter: {
    card: 'summary',
    title: content.meta.title,
    description: content.meta.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Ir al contenido
        </a>
        <Nav
          navItems={content.nav}
          services={content.services.map((service) => ({ id: service.id, title: service.title }))}
          tools={content.tools}
        />
        {children}
        <Footer />
        <ChatWidget fallbackEmail={content.nap.email} />
      </body>
    </html>
  );
}
