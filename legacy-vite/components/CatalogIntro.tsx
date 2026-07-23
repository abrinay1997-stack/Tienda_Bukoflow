import React from 'react';

export const CatalogIntro = () => (
    <section className="pt-20 pb-10 text-center">
        <div className="max-w-3xl mx-auto px-5">
            {/* H2 Optimized for Secondary Keyword Search Intent */}
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-primary-orange to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                Catálogo de Beats Urbanos
            </h2>
            
            {/* LSI Keywords Integrated Naturally: "WAV", "Stems", "Sin Tag", "Uso Comercial" */}
            <p className="text-lg sm:text-xl text-zinc-200 font-light mt-6 drop-shadow-md leading-relaxed">
                Encuentra la base perfecta para tu letra. Disponemos de <strong>Instrumentales de Trap, Reggaeton, Drill y Hip Hop</strong> con sonido profesional. 
                <br className="hidden md:block" />
                Al comprar tu licencia, recibirás acceso inmediato a archivos de alta fidelidad (<strong>WAV 24-bit y Trackouts/Stems</strong>), 
                <strong>sin tags de voz</strong> y con derechos para <strong>uso comercial</strong> en Spotify y Apple Music.
            </p>
            
            {/* UX Improvement: Directional Cue */}
            <div className="mt-8 flex justify-center opacity-80">
                <div className="animate-float-arrow text-primary-orange text-2xl">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
        </div>
    </section>
);