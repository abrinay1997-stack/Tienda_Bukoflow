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

ESTILO DE RESPUESTA — muy importante:
- Máximo 2-3 frases cortas por respuesta. Nada de párrafos largos.
- Ve directo al dato pedido (precio, sí/no, el paso que preguntó) antes que nada.
- No repitas toda la información disponible de una vez: si hay más detalle, ofrece darlo si lo
  pide ("¿Quieres que te cuente los pasos?") en vez de escribirlo todo de entrada.
- Nada de listas largas ni de reexplicar todo el catálogo salvo que te lo pidan explícitamente.
- Tono directo y natural, como un mensaje de chat real, no como un correo o un folleto.

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
    max_tokens: 180,
    temperature: 0.5,
  });

  return NextResponse.json({
    reply: completion.choices[0]?.message?.content ?? '',
  });
}
