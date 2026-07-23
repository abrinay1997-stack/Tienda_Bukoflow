import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { CatalogIntro } from '@/components/CatalogIntro';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <CatalogIntro />
      </main>
    </>
  );
}
