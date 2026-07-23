
import React, { forwardRef } from 'react';

export const Player = forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref} className="bg-card-bg border-2 border-glass-border rounded-2xl p-4 shadow-2xl shadow-primary-orange/20 backdrop-blur-lg transition-all duration-400 ease-in-out hover:border-primary-orange hover:shadow-primary-orange/40 hover:-translate-y-1">
        <iframe
            className="w-full h-[500px] md:h-[700px] border-none rounded-xl block"
            src="https://player.beatstars.com/?storeId=77460"
            allowFullScreen>
            Tu navegador no soporta iframes. <a href="https://www.beatstars.com/player/?storeId=77460" target="_blank" rel="noopener noreferrer">Visita mi tienda aquí</a>.
        </iframe>
    </div>
));