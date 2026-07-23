import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Evita que Next.js confunda el package-lock.json del repo roto en
  // C:\Users\MIPC con la raíz real de este proyecto.
  outputFileTracingRoot: __dirname,
  // Solo el workflow de preview de GitHub Pages activa esto (build estático,
  // sin servidor). Netlify sigue construyendo en modo normal, con /api/chat vivo.
  ...(process.env.STATIC_PREVIEW === '1' ? { output: 'export' } : {}),
};

export default nextConfig;
