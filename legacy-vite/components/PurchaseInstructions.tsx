
import React from 'react';
import { MousePointerIcon, CreditCardIcon, DownloadIcon } from './Icons';

const InstructionStep = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex flex-col items-center text-center gap-4">
        <div className="flex-shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-zinc-300 font-light mt-1 max-w-xs">{description}</p>
        </div>
    </div>
);


export const PurchaseInstructions = () => (
    <section className="mt-12 mb-16 md:mb-24">
        <div className="max-w-6xl mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                <InstructionStep 
                    icon={<MousePointerIcon />} 
                    title="1. Selecciona ritmos y licencia" 
                    description="Explora el catálogo, selecciona tus ritmos y elige la licencia que mejor se adapte a tus necesidades." 
                />
                <InstructionStep 
                    icon={<CreditCardIcon />} 
                    title="2. Finaliza la compra" 
                    description="Añade los productos al carrito y completa tu compra con PayPal o tarjeta de crédito." 
                />
                <InstructionStep 
                    icon={<DownloadIcon />} 
                    title="3. Revisa tu bandeja de entrada" 
                    description="Recibe tus archivos y licencia al instante por correo electrónico: listos para descargar y usar." 
                />
            </div>
        </div>
    </section>
);