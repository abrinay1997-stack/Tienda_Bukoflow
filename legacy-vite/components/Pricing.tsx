import React from 'react';
import { SectionTitle } from './SectionTitle';

const PricingCard = ({ title, price, features, highlighted = false, popular = false }: { title: string, price: string, features: string[], highlighted?: boolean, popular?: boolean }) => (
    <div className={`relative bg-card-bg border-2 rounded-2xl p-7 flex flex-col transition-all duration-300 ease-in-out backdrop-blur-md hover:-translate-y-2 hover:shadow-2xl hover:shadow-hover-glow ${highlighted ? 'border-primary-orange shadow-lg shadow-hover-glow' : 'border-glass-border'} ${popular ? 'lg:scale-105' : ''}`}>
        {popular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary-orange text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg z-10">
                MÁS POPULAR
            </div>
        )}
        <h4 className="font-semibold text-primary-orange text-lg mb-2.5">{title}</h4>
        <h3 className="font-black text-5xl text-white mb-5">{price}</h3>
        <ul className="list-none mb-5 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="text-zinc-300 mb-3 font-light leading-snug border-b border-glass-border pb-3 last:border-b-0 last:mb-0">
                    {feature}
                </li>
            ))}
        </ul>
    </div>
);


export const Pricing = () => (
    <section className="w-full py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-5">
            <SectionTitle>Licencias y Precios</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <PricingCard title="🎤LICENCIA BASICA" price="$39.95" features={["Beat en MP3 sin tag.", "Uso para canciones, álbumes, eventos.", "Sube a Spotify, iTunes, etc.", "No requiere actualizar.", "Se requiere acreditación."]} />
                <PricingCard title="🎹LICENCIA STANDARD" price="$49.95" features={["Beat en MP3 y WAV sin tag.", "Uso para canciones, álbumes, eventos.", "Sube a Spotify, iTunes, etc.", "No requiere actualizar.", "Se requiere acreditación."]} highlighted popular />
                <PricingCard title="🔥LICENCIA ILIMITADA" price="$99.95" features={["MP3 + WAV + STEM.", "Uso para canciones, álbumes, eventos.", "Sube a Spotify, iTunes, etc.", "Monetizar en YouTube.", "Actuaciones en vivo.", "Distribuir en TV y radio.", "No requiere actualizar.", "Se requiere acreditación."]} />
                <PricingCard title="👑LICENCIA EXCLUSIVA" price="$1,000.00" features={["MP3 + WAV + STEM.", "Todo lo anterior + EL BEAT ES SOLO TUYO.", "Nadie más lo podrá comprar.", "No requiere actualizar.", "Se requiere acreditación."]} />
            </div>
        </div>
    </section>
);