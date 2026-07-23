
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpIcon } from './components/Icons';
import { Navbar } from './components/Navbar';
import { SlideshowHero } from './components/SlideshowHero';
import { Player } from './components/Player';
import { Pricing } from './components/Pricing';
import { CustomMusicCTA } from './components/CustomMusicCTA';
import { Links } from './components/Links';
import { CustomMusicPage } from './components/CustomMusicPage';
import { ServicesPage } from './components/ServicesPage';
import { HelpPage } from './components/HelpPage';
import { Footer } from './components/Footer';
import { CatalogIntro } from './components/CatalogIntro';
import { Offers } from './components/Offers';
import { PurchaseInstructions } from './components/PurchaseInstructions';
import { SocialProof } from './components/SocialProof';
import type { Page } from './components/types';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('main');
    const [showScroll, setShowScroll] = useState(false);
    const playerRef = useRef<HTMLDivElement>(null);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleScrollToPlayer = () => {
        playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const checkScrollTop = () => {
        if (!showScroll && window.scrollY > 400){
            setShowScroll(true);
        } else if (showScroll && window.scrollY <= 400){
            setShowScroll(false);
        }
    };
    
    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll]);

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
      <>
        <style>{`
          .link-button { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 18px 30px; background: linear-gradient(135deg, rgba(255, 61, 0, 0.1) 0%, rgba(255, 61, 0, 0.05) 100%); border: 2px solid rgba(255, 61, 0, 0.2); color: #ffffff; text-decoration: none; border-radius: 15px; font-weight: 600; font-size: 1.05em; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; backdrop-filter: blur(5px); }
          .link-button:hover { border-color: #FF3D00; transform: translateY(-8px) scale(1.05); box-shadow: 0 15px 35px rgba(255, 61, 0, 0.4), 0 0 20px rgba(255, 61, 0, 0.2); }
          
          /* Neuromarketing Update: Shine Effect for CTAs to grab reptilian brain attention */
          @keyframes shine {
            0% { left: -100%; }
            20% { left: 100%; }
            100% { left: 100%; }
          }
          
          .cta-primario { 
            background: #FF3D00; 
            border: 2px solid #FF3D00; 
            color: #ffffff !important; 
            font-weight: 700; 
            font-size: 1.15em; 
            display: inline-flex; 
            align-items: center; 
            justify-content: center; 
            padding: 18px 30px; 
            border-radius: 15px; 
            gap: 12px; 
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
            cursor: pointer;
            position: relative;
            overflow: hidden;
            z-index: 1;
          }
          
          .cta-primario::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
            transform: skewX(-20deg);
            animation: shine 4s infinite;
            z-index: -1;
          }

          .cta-primario:hover { background: #ffffff; border-color: #ffffff; color: #FF3D00 !important; transform: translateY(-5px) scale(1.03); box-shadow: 0 0 20px rgba(255, 61, 0, 0.6); }
          
          .custom-subtitle-page { font-weight: 700; font-size: 1.8em; color: #FF3D00; margin-bottom: 20px; margin-top: 30px; border-bottom: 1px solid rgba(255, 61, 0, 0.2); padding-bottom: 10px; text-align: left; }
          .faq-item { border-bottom: 1px solid rgba(255, 61, 0, 0.2); }
          .faq-question { padding: 20px 25px; font-size: 1.2em; font-weight: 600; color: #ffffff; cursor: pointer; display: flex; justify-content: space-between; align-items: center; list-style: none; }
          .faq-question::-webkit-details-marker { display: none; }
          .faq-question::after { content: '+'; font-size: 1.5em; color: #FF3D00; transition: transform 0.3s ease; }
          .faq-item[open] > summary::after { content: '−'; }
          .faq-answer { padding: 25px; color: #e0e0e0; font-weight: 300; line-height: 1.8; font-size: 1.1em; text-align: left; }
          .footer-link { color: #e0e0e0; text-decoration: none; font-weight: 300; transition: color 0.3s ease; cursor: pointer; }
          .footer-link:hover { color: #FF3D00; }
          .footer-social { color: #e0e0e0; font-size: 1.3em; transition: color 0.3s ease; }
          .footer-social:hover { color: #FF3D00; }
          body::before { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 20% 30%, #FF3D00 0%, transparent 50%), radial-gradient(circle at 80% 70%, #FF3D00 0%, transparent 50%); z-index: -1; animation: pulseBackground 8s ease-in-out infinite; }
          @keyframes pulseBackground { 0%, 100% { opacity: 0.15; transform: scale(1); } 50% { opacity: 0.25; transform: scale(1.05); } }
          @keyframes modal-scale-in {
            0% { transform: scale(0.95) translateY(10px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          .animate-modal-scale-in {
            animation: modal-scale-in 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          }
          @keyframes floatArrow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
          .animate-float-arrow {
            animation: floatArrow 2s ease-in-out infinite;
          }
        `}</style>
        <div className="relative overflow-x-hidden min-h-screen">
          <Navbar onNavigate={handleNavigate} />
          
          {currentPage === 'main' && (
            <>
              <SlideshowHero onNavigate={handleNavigate} onScrollToPlayer={handleScrollToPlayer} />
              
              <CatalogIntro />
              <Offers />
              
              <main className="max-w-7xl mx-auto px-5 my-16 md:my-24" ref={playerRef}>
                  <Player />
              </main>
              
              <PurchaseInstructions />

              <Pricing />

              <SocialProof />

              <main className="max-w-7xl mx-auto px-5 my-16 md:my-24">
                  <CustomMusicCTA onNavigate={handleNavigate} />
                  <Links />
              </main>
            </>
          )}

          {currentPage === 'produccion' && (
              <main className="max-w-6xl mx-auto px-5 pt-28 pb-10">
                <CustomMusicPage />
              </main>
          )}
          
          {currentPage === 'servicios' && (
              <main className="max-w-6xl mx-auto px-5 pt-28 pb-10">
                <ServicesPage />
              </main>
          )}

          {currentPage === 'ayuda' && (
              <main className="max-w-6xl mx-auto px-5 pt-28 pb-10">
                <HelpPage />
              </main>
          )}

          <Footer onNavigate={handleNavigate}/>
          
          {showScroll && (
            <button
                onClick={scrollTop}
                className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 bg-white/10 backdrop-blur-md border border-white/20 text-primary-orange p-3 rounded-full shadow-lg hover:bg-white/20 hover:scale-110 transition-all duration-300 z-40"
                aria-label="Scroll to top"
            >
                <ArrowUpIcon />
            </button>
          )}
        </div>
      </>
    );
};

export default App;
