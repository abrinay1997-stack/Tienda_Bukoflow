import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { CatalogIntro } from '@/components/CatalogIntro';
import { Offers } from '@/components/Offers';
import { PurchaseProcess } from '@/components/PurchaseProcess';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';
import { ServicesTeaser } from '@/components/ServicesTeaser';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <CatalogIntro />
      <Offers />
      <PurchaseProcess />
      <Pricing />
      <Testimonials />
      <ServicesTeaser />
      <FAQ />
      <CTA />
    </main>
  );
}
