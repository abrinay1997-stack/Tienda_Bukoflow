import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import content from '@/content/content.json';

// La API key vive solo aquí (server-side) vía variable de entorno de Netlify.
// Nunca se importa ni se referencia desde componentes de cliente.
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Eres el asistente de BUKOFLOW, una tienda de beats (Trap, Reggaeton, Drill) y
servicios de producción musical. Ayudas a los visitantes a elegir la licencia o el servicio adecuado,
y respondes preguntas frecuentes. Responde solo con información real de este contexto — si no sabes
algo, dirige al visitante a bukoflowpanama@gmail.com. Nunca inventes precios ni condiciones.

Licencias disponibles: ${JSON.stringify(content.licenses)}
Servicios: ${JSON.stringify(content.services.map((s) => ({ title: s.title, price: s.price })))}
FAQ de licencias: ${JSON.stringify(content.faq.licenses)}`;

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'El asistente aún no está configurado (falta GROQ_API_KEY en el entorno).' },
      { status: 503 }
    );
  }

  const { message } = await req.json();

  if (typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Falta el mensaje.' }, { status: 400 });
  }

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message },
    ],
  });

  return NextResponse.json({
    reply: completion.choices[0]?.message?.content ?? '',
  });
}
