import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { CatalogIntro } from '@/components/CatalogIntro';
import { Offers } from '@/components/Offers';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <CatalogIntro />
        <Offers />
      </main>
    </>
  );
}
