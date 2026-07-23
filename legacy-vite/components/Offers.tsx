
import React from 'react';

// Updated design to trigger "Perceived Value" bias. 
// Instead of plain text, we use iconography and distinct "Badge" styling.
const OfferCard = ({ title, subtext, iconClass, highlight = false }: { title: string, subtext: string, iconClass: string, highlight?: boolean }) => (
    <div className={`relative group overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 cursor-default ${highlight ? 'bg-gradient-to-br from-primary-orange/20 to-black border-primary-orange shadow-[0_0_20px_rgba(255,61,0,0.3)]' : 'bg-card-bg border-glass-border hover:border-primary-orange/50'} border-2`}>
        
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-orange/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-all group-hover:bg-primary-orange/20"></div>
        
        <div className="flex flex-col items-center text-center relative z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl ${highlight ? 'bg-primary-orange text-white' : 'bg-white/10 text-primary-orange'}`}>
                <i className={iconClass}></i>
            </div>
            <h3 className="text-xl font-black italic uppercase tracking-wider text-white mb-1">{title}</h3>
            <p className="text-sm text-zinc-300 font-medium">{subtext}</p>
            
            {highlight && (
                <div className="absolute top-3 right-3">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-orange"></span>
                    </span>
                </div>
            )}
        </div>
    </div>
);

export const Offers = () => (
    <section className="pb-20 -mt-5 relative z-20">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <OfferCard 
                    title="COMPRA 2, LLÉVATE 1" 
                    subtext="Pack Inicial (3 Beats)" 
                    iconClass="fas fa-music" 
                />
                <OfferCard 
                    title="COMPRA 3, LLÉVATE 2" 
                    subtext="Pack Creador (5 Beats)" 
                    iconClass="fas fa-fire" 
                    highlight={true}
                />
                <OfferCard 
                    title="COMPRA 4, LLÉVATE 3" 
                    subtext="Pack Pro (7 Beats)" 
                    iconClass="fas fa-gem" 
                />
            </div>
        </div>
    </section>
);
