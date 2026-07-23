import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Evita que Next.js confunda el package-lock.json del repo roto en
  // C:\Users\MIPC con la raíz real de este proyecto.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
