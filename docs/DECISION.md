# DECISION.md — BUKOFLOW

> Fase 1 del pipeline (`SISTEMA-DE-PRODUCCION.md` §4). Esto es lo que Claude Code
> debe leer cada vez que se retome el proyecto, para no repetir el debate.

## 1. Familia

**A — Dark Cinematic Luxury**, adaptada.

Justificación: BUKOFLOW vende un producto deseable (beats/producción) a artistas que
buscan sonido de industria — la emoción de la Familia A ("obsesión, precisión, deseo")
encaja mejor que el resto de familias, que apuntan a servicios locales o SaaS.

## 2. Paleta

**No se usa el dorado sugerido por el genoma.** Se conserva el naranja real de marca
(`#FF3D00`), ya reconocido en logo, Instagram, TikTok y YouTube — `brand.json` manda
sobre la sugerencia del genoma (orden de precedencia, §0).

```
--bg: #0a0a0a       --fg: #ededed        --accent: #FF3D00
--surface: #141414  --muted: rgba(255,255,255,.62)   --line: rgba(255,255,255,.12)
```

**Corrección de accesibilidad respecto al diseño anterior:** el sitio original usaba
texto blanco sobre fondo naranja en los botones (`.cta-primario`), lo que da ~3.55:1
de contraste — no pasa el mínimo de 4.5:1 para texto normal (WCAG AA). Se corrige
usando `--accent-fg: #0a0a0a` (texto oscuro sobre relleno naranja), que sí pasa
(~5.5:1). El naranja como texto sobre fondo oscuro (kickers, precios, headings) no
tenía este problema y se mantiene igual.

## 3. Par tipográfico

- Display: **Outfit** (peso 200–300 en tamaños grandes — regla de "peso invertido" §6.3)
- Cuerpo: **Inter**
- Utilidad: **JetBrains Mono** (kickers, precios, labels)

Todo gratuito, autohospedado vía `next/font/google` (descarga en build, sirve desde
el propio dominio, precarga y `font-display: swap` automáticos — cumple §6.4 sin
gestionar `.woff2` a mano).

## 4. Bloques (orden narrativo)

```
S01 Nav → S02c Hero (player + spotlight) → CatalogIntro → Offers →
S16 Proceso de compra (3 pasos, sin pin en esta versión) → S13 Pricing (licencias) →
S11 Testimonios (Spotify embeds) → S05 Servicios numerados (mezcla/mastering/
dolby/custom) → S14 FAQ → S19 CTA → S20 Footer
```

Páginas propias (S22): `/servicios/mezcla`, `/servicios/mastering`,
`/servicios/dolby-atmos`, `/servicios/beat-personalizado`, `/produccion-musical`,
`/ayuda`, `/licencias`.

**No se usa S07 (stats)** — no hay cifras verificables entregadas por el cliente
(beats vendidos, artistas atendidos, años activos). Se añade en cuanto existan.

## 5. Signature

~~Spotlight sweep sobre el reproductor~~ — **reemplazada, ver §9.** El signature
actual es un campo de partículas 3D reactivo en el Hero (el spotlight 2D queda como
fallback para dispositivos débiles / `prefers-reduced-motion`).

## 6. Arquitectura

**Next.js App Router, multipágina, SSG.** El sitio anterior era una SPA de una sola
URL con navegación por estado de React (`/servicios`, `/producción`, `/ayuda` no
eran URLs reales) — invisible para buscadores. Corregido: cada sección vive en su
propia ruta indexable, cumpliendo §12.2 del genoma (negocio de venta ⇒ multipágina).

## 7. IA / Chatbot

Se sustituye el stub de `@google/genai` (nunca implementado) por **Groq** (gratis)
vía API route server-side (`src/app/api/chat/route.ts`). La API key vive solo en
variables de entorno de Netlify — nunca se expone al cliente.

## 8. Deploy

Netlify + `@netlify/plugin-nextjs`. Git propio en esta carpeta, remoto:
`https://github.com/abrinay1997-stack/Tienda_Bukoflow.git`.

**Preview previo a Netlify:** `.github/workflows/pages.yml` construye un build
estático (`next export`) del sitio. En cada PR solo valida que compile (check
verde/rojo, sin desplegar — no pisa la preview viva). Al hacer push/merge a `main`,
despliega la única preview viva de GitHub Pages, visible con su link directo en la
pestaña "Deployments" del repo y en Settings → Pages. No requiere cuenta de Netlify.

Limitación aceptada: solo hay **un** despliegue vivo a la vez (el siguiente merge a
`main` pisa al anterior) — no hay un link independiente por cada PR abierto en
simultáneo. Y al ser export estático, `/api/chat` (Groq) no está disponible ahí,
solo en Netlify o `npm run dev`.

Paso manual pendiente del usuario (una sola vez): en GitHub → Settings → Pages,
poner Source = **"GitHub Actions"**.

## 9. Excepciones al ADN pedidas explícitamente por el cliente (2026-07-23)

El cliente pidió una dirección más inmersiva de lo que marca el genoma por defecto.
Se registran aquí las reglas que se rompen a propósito, y por qué:

| Regla del ADN | Excepción | Motivo |
|---|---|---|
| §0 "un solo acento cromático" / una sola librería de animación | Se suma **framer-motion** encima de GSAP, ya instalado | El cliente pidió framer-motion explícitamente tras conocer el riesgo de duplicar librerías (dos formas de animar el mismo sitio). Mitigado con `LazyMotion` (carga diferida, ~15KB) — sin esto el bundle de la home subía a 150KB, por encima del presupuesto. |
| §16.1 "un momento orquestado por sitio" | El Hero tiene spotlight/partículas 3D **y** las tarjetas de Testimonios tienen su propio efecto 3D de abanico | El cliente prefirió recuperar el efecto 3D original de Testimonios explícitamente, sobre la recomendación de mantener un único momento. Ambos usan solo `transform`/`opacity`, respetan `prefers-reduced-motion`. |
| §8.3 "3D... solo si aporta" (Familia A: objeto de producto) | Se usa 3D real (Three.js) en un sitio sin objeto físico que mostrar | Decisión del cliente tras comparar alternativas (vinilo, ecualizador, shader abstracto, partículas). Partículas elegidas por ser la opción más ligera en rendimiento. |
| Herramientas de terceros no verificadas | Se descartó instalar el skill `ui-ux-pro-max-skill` de GitHub | La verificación automática devolvió cifras de estrellas/forks implausibles (indicio de alucinación o mal fetch) — no se pudo confirmar que fuera seguro. Se prefirió construir el diseño directamente. |
| — | Se instaló el MCP **Magic** (`@21st-dev/magic`), scope de usuario, con API key del cliente | Paquete real y verificado de 21st.dev. Configurado fuera de este repo (`~/.claude.json`), la key nunca se commitea. |

## Estado actual

- [x] Fase 0-1: decisión de ADN (este documento)
- [x] Fase 2 (parcial): contenido real extraído del sitio anterior a `content.json`.
      Pendiente: cifras verificables para S07, ID real de GA4/Meta Pixel si se van a usar.
- [x] Fase 3: scaffold (Next.js + tokens + brand.json + content.json + deploy vacío)
- [ ] Fase 4: construcción de bloques — Hero primero, se aprueba antes de continuar
- [ ] Fase 5: pasadas de calidad (SEO → A11y → Rendimiento → Copy)
- [ ] Fase 6: revisión humana
- [ ] Fase 7: lanzamiento
