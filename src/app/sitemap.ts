import type { MetadataRoute } from 'next';
import content from '@/content/content.json';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/produccion-musical', '/ayuda', '/licencias', '/privacidad'];
  const serviceRoutes = content.services.map((service) => `/servicios/${service.id}`);

  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
