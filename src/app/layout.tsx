import type { Metadata } from 'next';
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google';
import content from '@/content/content.json';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
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

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Ir al contenido
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
