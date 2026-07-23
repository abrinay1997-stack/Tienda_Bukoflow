
import React from 'react';
import type { Page } from './types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => (
    <footer className="pt-16 pb-8 px-5 mt-10 border-t border-glass-border bg-gradient-to-t from-primary-orange/5 to-transparent">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-between gap-10 mb-10">
                <div className="flex-1 basis-full md:basis-1/3 max-w-lg">
                    <img src="https://hostedimages-cdn.aweber-static.com/MjM0MTQ0NQ==/thumbnail/188302f5ca5241bd9111d44862883f63.png" alt="Logo BUKOFLOW" className="w-16 mb-5 filter drop-shadow-[0_0_10px_#FF3D00]" />
                    <p className="text-zinc-300 font-light leading-relaxed">Beats de Trap, Rap, Drill, Regaeton y licencias de música para artistas, marcas y creadores. Llevando tu visión al siguiente nivel con sonido de alta calidad.</p>
                </div>
                <div className="flex-1 basis-1/2 md:basis-auto">
                    <h4 className="font-bold text-xl text-white mb-5">Navegación</h4>
                    <ul className="list-none">
                        <li className="mb-3"><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('main'); }} className="footer-link">Inicio</a></li>
                        <li className="mb-3"><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('servicios'); }} className="footer-link">Servicios</a></li>
                        <li className="mb-3"><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('ayuda'); }} className="footer-link">Ayuda</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('produccion'); }} className="footer-link">Producción Musical</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-full h-px bg-glass-border mb-8"></div>
            <div className="flex flex-wrap justify-between items-center gap-5">
                <p className="text-zinc-300 font-light">&copy; {new Date().getFullYear()} | BUKOFLOW LLC</p>
                <div className="flex gap-5">
                    <a href="https://www.instagram.com/bukoflow/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/AbrinayStudios" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-social"><i className="fab fa-youtube"></i></a>
                    <a href="https://www.tiktok.com/@bukoflow_?lang=es-419" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer-social"><i className="fab fa-tiktok"></i></a>
                </div>
            </div>
        </div>
    </footer>
);
