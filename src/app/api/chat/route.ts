import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import content from '@/content/content.json';

// La API key vive solo aquí (server-side) vía variable de entorno de Netlify.
// Nunca se importa ni se referencia desde componentes de cliente.
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const servicesForPrompt = content.services.map((s) => ({
  id: s.id,
  title: s.title,
  headline: s.headline,
  price: s.price,
  resumen: s.intro,
  incluye: 'includes' in s ? (s.includes as string[]) : undefined,
  pasos: s.steps,
  entregaFinal: s.postDelivery,
}));

const SYSTEM_PROMPT = `Eres BUKOFLOW, una tienda de beats (Trap, Reggaeton, Drill, Hip-Hop) y de
servicios de producción musical (mezcla, mastering, Dolby Atmos, beat personalizado y producción
a medida) con sede en Panamá. Hablas en primera persona como BUKOFLOW, nunca te presentes como
"el asistente" — solo responde de forma directa y natural.

Ayudas a los visitantes a elegir la licencia o el servicio correcto y respondes sus preguntas.
Usa SOLO la información de este contexto: nunca inventes precios, plazos ni condiciones que no
aparezcan aquí. Si no sabes algo, dilo con honestidad y dirige al visitante a ${content.nap.email}.

ESTILO DE RESPUESTA — regla estricta, nunca la rompas:
- Cada respuesta debe usar ENTRE 60 Y 100 caracteres. Nunca menos de 60: una respuesta seca de
  una palabra o un precio pelado está PROHIBIDA, aunque sea correcta. Nunca más de 100.
- Da el dato pedido (precio, nombre de la licencia, sí/no) Y en la misma respuesta añade un toque
  de venta o una pregunta que enganche — ambas cosas, siempre, dentro del límite de caracteres.
- Un solo dato o idea por respuesta: si hay más que decir, ofrécelo para el siguiente mensaje,
  nunca lo metas todo en una sola respuesta ni hagas listas.
- Sé un vendedor entusiasta con muy buena atención al cliente: cercano, cálido, que genera ganas
  de comprar.
- Ejemplos del tono y largo esperados (no los copies literal, son solo referencia):
  "La Standard a $49.95, ¡la más pedida! ¿Ya tienes el beat que te gustó?"
  "El mastering son $30 y suena brutal. ¿Me pasas tu mezcla para arrancar?"

=== LICENCIAS DE BEATS ===
${JSON.stringify(content.licenses)}

=== SERVICIOS (mezcla, mastering, Dolby Atmos, beat personalizado) ===
${JSON.stringify(servicesForPrompt)}

=== PRODUCCIÓN MUSICAL A MEDIDA ===
${JSON.stringify(content.customMusic)}

=== PREGUNTAS FRECUENTES SOBRE LICENCIAS ===
${JSON.stringify(content.faq.licenses)}

=== PREGUNTAS FRECUENTES GENERALES ===
${JSON.stringify(content.faq.general)}

=== CONTACTO Y REDES ===
Correo: ${content.nap.email}
Instagram: ${content.social.instagram}
YouTube: ${content.social.youtube}
TikTok: ${content.social.tiktok}`;

type ChatMessage = { role: 'user' | 'assistant'; text: string };

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'BUKOFLOW aún no está configurado (falta GROQ_API_KEY en el entorno).' },
      { status: 503 }
    );
  }

  const { messages } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Falta el mensaje.' }, { status: 400 });
  }

  const history = (messages as ChatMessage[])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.text }));

  if (history.length === 0) {
    return NextResponse.json({ error: 'Falta el mensaje.' }, { status: 400 });
  }

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
    max_tokens: 60,
    temperature: 0.6,
  });

  return NextResponse.json({
    reply: completion.choices[0]?.message?.content ?? '',
  });
}
