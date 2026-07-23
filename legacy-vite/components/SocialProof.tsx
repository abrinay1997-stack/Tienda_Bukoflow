
import React, { useState, useEffect } from 'react';
import { SectionTitle } from './SectionTitle';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

const testimonials = [
    {
        spotifySrc: "https://open.spotify.com/embed/track/5tuxq8IrJspC0eCeB3aOTm?utm_source=generator",
        artist: "RichardLove"
    },
    {
        spotifySrc: "https://open.spotify.com/embed/track/1y9mnArBtexJx9WUuoVKKK?utm_source=generator",
        artist: "Avalon Davies"
    },
    {
        spotifySrc: "https://open.spotify.com/embed/track/6jnSWHSPerX58A6Rs7U7tJ?utm_source=generator",
        artist: "RichardLove"
    },
    {
        spotifySrc: "https://open.spotify.com/embed/track/14anQ0yuu7PLwakdzleVsh?utm_source=generator",
        artist: "Abrinay"
    },
    {
        spotifySrc: "https://open.spotify.com/embed/track/6oykdY0Ra3JsgSQjsytYpn?si=633d7b11b73a4bfd",
        artist: "Abrinay"
    },
    {
        spotifySrc: "https://open.spotify.com/embed/track/7exDUiOuHPt51xdldD5Eql?si=e95a2086d3794fd5",
        artist: "Abrinay"
    }
];

export const SocialProof = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = testimonials.length;

    // Auto-rotate effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); 
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + length) % length);
    };

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="w-full pt-10 pb-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-5">
                <SectionTitle>Artistas que Confían en BUKOFLOW</SectionTitle>
                
                <div className="relative w-full h-[450px] flex items-center justify-center mt-10" style={{ perspective: '1000px' }}>
                    
                    {/* Carousel Items Container */}
                    <div className="relative w-full h-full flex justify-center items-center" style={{ transformStyle: 'preserve-3d' }}>
                         {testimonials.map((item, index) => {
                             // Calculate distance accounting for the circular nature
                             // This logic ensures that if we are at index 0, index 5 is treated as -1 (left)
                             // rather than +5 (far right), creating the infinite circle effect.
                             let offset = (index - currentIndex + length) % length;
                             if (offset > length / 2) {
                                 offset -= length;
                             } else if (offset < -length / 2) {
                                 offset += length;
                             }

                             const absOffset = Math.abs(offset);
                             
                             // Only show the closest 5 items (Center + 2 left + 2 right) to prevent clutter
                             // The "3" threshold allows the item wrapping around the back to be invisible during the transition
                             // preventing the "flying card" effect.
                             const isVisible = absOffset <= 2; 

                             // CSS Transforms for the "Fan" effect
                             const translateX = offset * 140; // Overlap factor (lower = more overlap)
                             const translateZ = -absOffset * 100; // Depth factor (push side cards back)
                             const rotateY = -offset * 25; // Rotation angle
                             const scale = 1 - (absOffset * 0.1); // Size reduction for side cards
                             const opacity = isVisible ? 1 - (absOffset * 0.15) : 0; // Fade out side cards slightly
                             const zIndex = 50 - absOffset; // Ensure center is always on top

                             return (
                                <div
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className="absolute w-[300px] sm:w-[340px] h-[380px] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer"
                                    style={{
                                        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                        opacity: opacity,
                                        zIndex: zIndex,
                                        pointerEvents: offset === 0 ? 'auto' : 'none', // Only center allows interaction with Spotify
                                    }}
                                >
                                    <div className={`w-full h-full rounded-xl overflow-hidden shadow-2xl transition-shadow duration-300 ${offset === 0 ? 'shadow-primary-orange/40 ring-2 ring-primary-orange/50' : 'shadow-black/50'}`}>
                                        <iframe
                                            className="w-full h-full bg-black"
                                            src={item.spotifySrc}
                                            frameBorder="0"
                                            allowFullScreen={true}
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy">
                                        </iframe>
                                        {/* Overlay for side cards to make them non-interactive visually */}
                                        {offset !== 0 && <div className="absolute inset-0 bg-black/40 z-10"></div>}
                                    </div>
                                    
                                    <p className={`text-center font-bold text-xl mt-6 transition-all duration-500 ${offset === 0 ? 'text-primary-orange translate-y-0 opacity-100' : 'text-zinc-500 translate-y-4 opacity-0'}`}>
                                        {item.artist}
                                    </p>
                                </div>
                             );
                         })}
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button 
                        onClick={prevSlide} 
                        className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-10 z-50 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-primary-orange hover:scale-110 hover:border-primary-orange transition-all duration-300 group shadow-lg" 
                        aria-label="Anterior"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button 
                        onClick={nextSlide} 
                        className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-10 z-50 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-primary-orange hover:scale-110 hover:border-primary-orange transition-all duration-300 group shadow-lg" 
                        aria-label="Siguiente"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </section>
    );
};
