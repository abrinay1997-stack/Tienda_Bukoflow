import type { Metadata } from 'next';
import content from '@/content/content.json';
import { Hero } from '@/components/Hero';
import { Player } from '@/components/Player';
import { CatalogIntro } from '@/components/CatalogIntro';
import { Offers } from '@/components/Offers';
import { PurchaseProcess } from '@/components/PurchaseProcess';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';
import { ServicesTeaser } from '@/components/ServicesTeaser';
import { CTA } from '@/components/CTA';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero
        kicker={content.hero.kicker}
        h1={content.hero.h1}
        sub={content.hero.sub}
        ctaLabel={content.hero.cta.label}
        secondaryCta={content.hero.secondaryCta}
      />
      <Player />
      <CatalogIntro />
      <Offers />
      <PurchaseProcess />
      <Pricing />
      <Testimonials testimonials={content.testimonials} />
      <ServicesTeaser />
      <CTA />
    </main>
  );
}
