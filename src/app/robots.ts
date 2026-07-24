import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Requerido por next export (STATIC_PREVIEW=1 en GitHub Pages): sin esto,
// el build estatico falla porque robots.txt se trata como ruta dinamica.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
