# CLAUDE.md — reglas permanentes de este repositorio

> Claude Code lee este archivo en cada sesión: es la memoria del proyecto.

---

## Proyecto

- **Cliente:** BUKOFLOW
- **Sector / zona:** Producción musical / venta de beats (Trap, Reggaeton, Drill) · online, Panamá
- **Objetivo principal del sitio:** Venta directa (beats + licencias) y captación de encargos de producción/mezcla/mastering
- **Familia de ADN:** A (Dark Cinematic Luxury), adaptada — ver `docs/DECISION.md`
- **Signature:** Spotlight sweep sobre el reproductor de BeatStars
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

**2026-07-23 — Fase 3 completada (scaffold).**

Hecho:
- Proyecto anterior (Vite + AI Studio, con `@google/genai` sin usar) movido íntegro a `legacy-vite/` como referencia — nada se perdió.
- Next.js App Router scaffolded: tokens.css, brand.json, content.json con todo el contenido real extraído (servicios, precios, FAQ completo, testimonios, contacto, redes).
- Git propio inicializado en esta carpeta (aislado del repo roto de nivel superior en `C:\Users\MIPC`), remoto apuntando a `Tienda_Bukoflow`.
- `docs/DECISION.md` documenta la decisión de Fase 1 completa.

Falta:
- Fase 4: construir el Hero (S02c) real — se muestra al usuario antes de seguir con el resto de bloques.
- Migrar el resto de bloques (servicios, pricing, testimonios, FAQ, footer) desde `legacy-vite/components/` al sistema de tokens/bloques nuevo.
- Conectar el chatbot de Groq a una UI real (el API route es solo el plumbing server-side).
- Bloqueado esperando del cliente: cifras verificables para el bloque de stats (S07), IDs reales de GA4/Meta Pixel si se van a usar, confirmación de si `bukoflow.com` (dominio actual apuntando a otro sitio) migra a este proyecto o coexisten.
