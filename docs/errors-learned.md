# Bitácora de errores — BUKOFLOW TIENDA

## [2026-07-23] — `whileInView` no dispara para contenido ya visible al cargar la página

**Contexto:** Se agregó animación de entrada (`Reveal`/`RevealGroup`, framer-motion `whileInView`) a las páginas internas (`/servicios/[slug]`, `/produccion-musical`, `/ayuda`, `/privacidad`), replicando el patrón ya usado en los bloques de Home (Offers, Pricing, etc.).

**Error:** Al cargar directamente cualquiera de esas páginas (sin hacer scroll), el contenido quedaba completamente invisible (`opacity: 0` permanente) hasta que el usuario hacía scroll manualmente, momento en el que aparecía de golpe. Reproducible en recargas limpias del dev server, sin errores en consola.

**Causa raíz:** `whileInView` + `viewport={{ once: true }}` de framer-motion depende de que un `IntersectionObserver` calcule la intersección inicial. Para elementos que ya están dentro del viewport en el momento del montaje (contenido "above the fold", como el H1 de una página de servicio), ese primer cálculo no se disparaba de forma fiable sin un evento de scroll/resize posterior — el sitio funcionaba en Home porque ahí los bloques con `Reveal` están todos debajo del fold (el usuario necesita scrollear para verlos de todos modos, lo cual dispara el observer de forma natural).

**Fix aplicado:** Se agregó una prop `immediate` a `Reveal` y `RevealGroup` (`src/components/Reveal.tsx`, `src/components/RevealGroup.tsx`). Cuando `immediate` está presente, el componente usa `animate` (dispara al montar) en vez de `whileInView` (dispara al entrar en el viewport). Se aplicó `immediate` a todos los usos de `Reveal`/`RevealGroup` en las 4 páginas internas nuevas, ya que su contenido puede estar parcial o totalmente visible sin scroll dependiendo del largo de cada servicio.

**Prevención:** Nunca usar `whileInView` para el primer bloque de contenido de una página (lo que se ve sin hacer scroll). Usar `whileInView` únicamente para secciones que el usuario alcanza scrolleando desde una posición inicial donde el elemento está fuera del viewport — como ya ocurre naturalmente en Home. Para contenido "above the fold", usar `animate` (disparo inmediato al montar).

**Archivos:** `src/components/Reveal.tsx`, `src/components/RevealGroup.tsx`, `src/app/servicios/[slug]/page.tsx`, `src/app/produccion-musical/page.tsx`, `src/app/ayuda/page.tsx`, `src/app/privacidad/page.tsx`
