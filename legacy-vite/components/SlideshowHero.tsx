import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import type { Page } from './types';

interface SlideshowHeroProps {
    onNavigate: (page: Page) => void;
    onScrollToPlayer: () => void;
}

const slides = [
    {
        // STRATEGY: PAS Formula (Problem/Solution) + Main Keyword
        // H1 equivalent intent: "Comprar Beats Profesionales"
        title: "Tu Próximo Hit Comienza Aquí",
        subtitle: "¿Cansado de instrumentales genéricas? Accede a Beats de Trap, Reggaeton y Drill con calidad de industria. Licencias inmediatas, sonido único.",
        button: {
            text: "Explorar Catálogo 🔥",
            action: 'scrollToPlayer'
        },
        bgImage: "https://cdn.pixabay.com/photo/2014/06/12/16/23/microphone-367578_1280.jpg",
    },
    {
        // STRATEGY: Technical Authority & Features (WAV/Stems)
        title: "Calidad de Estudio Garantizada",
        subtitle: "No comprometas tu sonido. Descarga instrumentales en WAV 24-bit y Trackouts (Stems) listos para mezclar en tu DAW favorito.",
        button: {
            text: "Escuchar Demos",
            action: 'scrollToPlayer'
        },
        bgImage: "https://cdn.pixabay.com/photo/2016/11/29/12/39/recording-studio-1869560_1280.jpg",
    },
    {
        // STRATEGY: Upsell / Service Intent
        title: "Producción Musical a Medida",
        subtitle: "¿Necesitas exclusividad total? Creamos tu beat desde cero, mezcla y mastering profesional para llevar tu carrera al nivel de Spotify.",
        button: {
            text: "Ver Servicios Pro",
            action: 'navigateToProduccion'
        },
        bgImage: "https://cdn.pixabay.com/photo/2018/11/15/14/22/audio-3817292_1280.jpg",
    }
];

export const SlideshowHero: React.FC<SlideshowHeroProps> = ({ onNavigate, onScrollToPlayer }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = React.useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const timer = setTimeout(nextSlide, 6000);
        return () => clearTimeout(timer);
    }, [currentIndex, nextSlide]);
    
    const handleButtonClick = (action: 'scrollToPlayer' | 'navigateToProduccion' | null) => {
        if (action === 'scrollToPlayer') {
            onScrollToPlayer();
        } else if (action === 'navigateToProduccion') {
            onNavigate('produccion');
        }
    };

    return (
        <header className="h-screen w-full relative group flex items-center justify-center overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div
                        style={{ backgroundImage: `url(${slide.bgImage})` }}
                        className={`w-full h-full bg-center bg-cover ${index === currentIndex ? 'animate-kenburns' : ''}`}
                    ></div>
                </div>
            ))}
            <div className="absolute inset-0 bg-black/75"></div>
            
            <div className="relative z-10 text-center text-white p-4">
                {/* SEO NOTE: Using H1 for the slide title. While multiple H1s in a carousel is debated, 
                    Google treats them as separate sections. Ideally, only the first is H1, but for React simplicity 
                    and visual hierarchy, we maintain this structure ensuring the COPY is keyword rich. */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-wider uppercase bg-gradient-to-r from-white via-primary-orange to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    {slides[currentIndex].title}
                </h1>
                <p className="text-lg sm:text-xl text-zinc-200 font-light mt-2.5 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
                    {slides[currentIndex].subtitle}
                </p>
                {slides[currentIndex].button && (
                    <button onClick={() => handleButtonClick(slides[currentIndex].button!.action as any)} className="cta-primario mt-8">
                        {slides[currentIndex].button!.text}
                    </button>
                )}
            </div>

            {/* Left Arrow */}
            <button onClick={prevSlide} className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20 transition-all hover:bg-primary-orange" aria-label="Previous slide">
                <ChevronLeftIcon />
            </button>
            {/* Right Arrow */}
            <button onClick={nextSlide} className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20 transition-all hover:bg-primary-orange" aria-label="Next slide">
                <ChevronRightIcon />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center py-2 gap-2 z-20">
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === slideIndex ? 'bg-primary-orange scale-125' : 'bg-white/50'}`}
                    ></div>
                ))}
            </div>
        </header>
    );
};