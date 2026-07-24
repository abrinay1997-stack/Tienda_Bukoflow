'use client';

import { useId, useState } from 'react';
import content from '@/content/content.json';

type ChatMessage = { role: 'user' | 'assistant'; text: string };

const GREETING: ChatMessage = {
  role: 'assistant',
  text: '¡Hola! Soy BUKOFLOW. Pregúntame sobre licencias, servicios o precios.',
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const panelId = useId();
  const inputId = `${panelId}-input`;

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      if (!res.ok) throw new Error('respuesta no válida');
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: data.reply || 'No tengo una respuesta para eso todavía.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `BUKOFLOW no está disponible en este momento. Escríbenos directamente a ${content.nap.email}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Cerrar chat de BUKOFLOW' : 'Abrir chat de BUKOFLOW'}
        className="fixed bottom-6 right-6 z-overlay flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-fg shadow-2xl transition-transform duration-[var(--d-fast)] hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Chat de BUKOFLOW"
          className="fixed bottom-24 right-6 z-overlay flex h-[480px] w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-[var(--r-sm)] border border-line bg-surface shadow-2xl"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="font-display text-sm font-medium text-fg">BUKOFLOW</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3" aria-live="polite">
            {messages.map((message, i) => (
              <p
                key={i}
                className={`max-w-[85%] rounded-[var(--r-sm)] px-3 py-2 font-body text-sm leading-[var(--lh-body)] ${
                  message.role === 'user'
                    ? 'ml-auto bg-accent text-accent-fg'
                    : 'bg-bg text-muted'
                }`}
              >
                {message.text}
              </p>
            ))}
            {loading && <p className="font-body text-xs text-muted">Escribiendo…</p>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-line p-3"
          >
            <label htmlFor={inputId} className="sr-only">
              Tu mensaje
            </label>
            <input
              id={inputId}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              autoComplete="off"
              className="flex-1 rounded-[var(--r-pill)] border border-line bg-bg px-4 py-2 font-body text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Enviar mensaje"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-opacity disabled:opacity-40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
