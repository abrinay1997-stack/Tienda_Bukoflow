import React from 'react';
import type { Page } from './types';

interface CustomMusicCTAProps {
    onNavigate: (page: Page) => void;
}

export const CustomMusicCTA: React.FC<CustomMusicCTAProps> = ({ onNavigate }) => (
    <section className="relative text-center p-12 border-2 border-glass-border rounded-2xl mt-10 overflow-hidden group transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-primary-orange/30">
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
            style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2020/02/11/14/11/cable-4839694_1280.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative z-10">
            <h4 className="font-semibold text-primary-orange text-lg mb-2.5 uppercase tracking-widest">Servicios Premium</h4>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-wider uppercase text-white">
                ¿Buscas un Sonido Único?
            </h2>
            <p className="text-zinc-300 font-light leading-relaxed max-w-xl mx-auto mb-8 text-lg">
                No suenes como el resto. Diseñamos tu <strong>identidad sonora</strong> desde cero. Producción de beats a medida (Custom), 
                <strong>mezcla y mastering</strong> profesional para que tus canciones compitan en las grandes ligas.
            </p>
            <button onClick={() => onNavigate('produccion')} className="cta-primario group">
                <i className="fas fa-magic"></i>
                <span>Crear mi Sonido</span>
            </button>
        </div>
    </section>
);