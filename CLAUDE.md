# CLAUDE.md — reglas permanentes de este repositorio

> Claude Code lee este archivo en cada sesión: es la memoria del proyecto.

---

## Proyecto

- **Cliente:** BUKOFLOW
- **Sector / zona:** Producción musical / venta de beats (Trap, Reggaeton, Drill) · online, Panamá
- **Objetivo principal del sitio:** Venta directa (beats + licencias) y captación de encargos de producción/mezcla/mastering
- **Familia de ADN:** A (Dark Cinematic Luxury), adaptada — ver `docs/DECISION.md`
- **Signature:** Halo difuminado estático detrás del H1 del Hero (se probaron partículas 3D, el cliente prefirió quitarlas)
- **Arquitectura:** Multipágina (Next.js App Router, SSG)
- **Versión del kit:** zera-kit v1.0.0 (primera instancia)

## Documentos de referencia (léelos antes de codificar)

1. `docs/ZERA-DNA-MASTER.md` — el genoma: tokens, familias, bloques, estándares.
2. `docs/DECISION.md` — qué se decidió para este cliente y por qué.
3. `src/content/content.json` — el contenido real. **Única fuente de verdad del texto.**
4. `brand.json` — tokens de esta marca. **Única fuente de verdad del estilo.**
5. `docs/SISTEMA-DE-PRODUCCION.md` — el pipeline de fases y las 4 pasadas de calidad.

---

## Stack

Next.js (App Router) · Tailwind · Lenis · GSAP (ScrollTrigger, Flip, Observer) · split-type · Groq (chatbot)
Despliegue: GitHub → Netlify (preview en cada PR, producción en `main`).

## Comandos

```bash
npm run dev       # desarrollo
npm run build     # build de producción
npm run start     # servir el build
```

---

## Reglas innegociables

1. **No inventes contenido.** Si un dato no está en `content.json`, el bloque no se renderiza.
   Nunca cifras de relleno, testimonios ficticios ni logotipos de terceros.
2. **Cero placeholders en el código.** Ningún `lorem`, `your-…-code`, `G-XXXXXXXXXX`, `href="#"`.
   Los IDs de analítica van en variables de entorno.
3. **Accesibilidad = 100** en Lighthouse. `:focus-visible` en todo lo interactivo,
   contraste ≥4.5:1, `prefers-reduced-motion` real, teclado de principio a fin.
   (Ojo: botones con fondo `--accent` usan texto `--accent-fg` oscuro, no blanco — ver `docs/DECISION.md` §2.)
4. **Rendimiento:** LCP ≤1.8s · INP ≤150ms · CLS ≤0.02 · JS inicial ≤140 KB gz.
5. **Animar sólo `transform` y `opacity`.** Nunca `width`, `height`, `top`, `left`.
6. **Máximo 2 secciones con `pin`** por página, y ninguna con `pin` en móvil sin adaptar.
7. **Un solo `<h1>` por página** y jerarquía semántica real.
8. **Un solo acento cromático** (`--accent`, el naranja de marca). Todo sale de tokens, nunca hardcodeado.
9. **Un momento orquestado por sitio**: el spotlight del hero. El resto del movimiento es sobrio.
10. **Un commit por bloque**, con mensaje `feat(Sxx): descripción`.
11. **La API key de Groq nunca se expone al cliente** — solo en `src/app/api/chat/route.ts` vía `process.env.GROQ_API_KEY`, configurada en Netlify.

## Antes de escribir código

Muéstrame primero el plan (composición de bloques, decisiones de tipografía y movimiento)
en no más de 10 líneas, y espera mi visto bueno.

## Antes de decir que algo está terminado

Ejecuta las cuatro pasadas de calidad en este orden: **SEO → Accesibilidad → Rendimiento → Copy**
(ver `docs/SISTEMA-DE-PRODUCCION.md` §7) y entrégame el resultado de cada una.

## Nunca

- Añadir dependencias no listadas sin preguntar.
- Cambiar tokens globales para resolver un caso concreto.
- Copiar la paleta y el par tipográfico de otro proyecto del mismo sector.
- Publicar `aggregateRating` u otros datos estructurados sin evidencia real.

---

## Estado actual

**2026-07-24 — Netlify conectado, sitio en producción en tienda.bukoflow.com.**

Hecho:
- Proyecto anterior (Vite + AI Studio, con `@google/genai` sin usar) movido íntegro a `legacy-vite/` como referencia — nada se perdió.
- Sitio completo en Next.js App Router: Home (Nav con dropdown de Servicios, Hero, Player ancho, CatalogIntro, Offers, PurchaseProcess, Pricing, Testimonials 3D, ServicesTeaser, CTA) + `/servicios/[mezcla|mastering|dolby-atmos|beat-personalizado]` + `/produccion-musical` + `/ayuda` + `/licencias` + `/privacidad` (política real de bukoflow.com, traducida).
- Las 4 pasadas de calidad (SEO, A11y, Rendimiento, Copy) — ver commits.
- Ronda de feedback del cliente (7 puntos) resuelta: Hero a pantalla completa, player ancho, tarjetas de Testimonials arregladas (sin costura, efecto 3D restaurado), FAQ solo en /ayuda, quitado el link a bukoflow.com.
- Se probaron partículas 3D (Three.js) en el Hero y un efecto de disolución en partículas para los títulos (H1/H2) al hacer scroll; ambas se construyeron, verificaron y funcionaban bien, pero el cliente decidió no usarlas — se revirtieron. El Hero quedó con un halo difuminado estático (sin movimiento) detrás del H1, que es lo que gustó.
- Nav "Servicios" era un link roto a una página inexistente — ahora es un dropdown con los 4 servicios reales.
- Testimonials: carrusel 3D con 8 tarjetas (se agregaron "CONEJO MALO" y "LICENCIA P" de Avalon Davies, verificadas en Spotify antes de agregarlas), espaciado ajustado según feedback del cliente.
- Contenido verificado contra bukoflow.com/services en vivo — corregido precio real de Beat Personalizado ($150).
- Chatbot: base de conocimiento completa (servicios, licencias, FAQ, producción a medida), memoria de conversación (historial completo por sesión), respuestas cortas y persuasivas (60-100 caracteres, tono de venta), sin la palabra "asistente" en el UI. Probado de punta a punta en local y en producción.
- `GROQ_API_KEY` configurada como secreto en Netlify (proyecto `rad-dasik-34f774`), confirmada funcionando en vivo.
- **Netlify conectado a este repo** (reemplazó el "Netlify Drop" anterior). Deploy de producción verificado: estado `ready`, build de Next.js exitoso, función server-side desplegada, sin secretos filtrados en el scan de Netlify.
- Git propio en esta carpeta (aislado del repo roto de nivel superior en `C:\Users\MIPC`), remoto `Tienda_Bukoflow`, todo pusheado.

Falta:
- Imagen OG 1200×630 real (no inventada) para redes sociales — `content.meta.ogImage` sigue vacío a propósito.
- Bloqueado esperando al cliente: cifras verificables para un bloque de estadísticas (S07), IDs reales de GA4/Meta Pixel si se van a usar.
