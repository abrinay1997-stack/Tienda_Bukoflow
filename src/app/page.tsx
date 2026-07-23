import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { CatalogIntro } from '@/components/CatalogIntro';
import { Offers } from '@/components/Offers';
import { PurchaseProcess } from '@/components/PurchaseProcess';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <CatalogIntro />
        <Offers />
        <PurchaseProcess />
        <Pricing />
        <Testimonials />
      </main>
    </>
  );
}
