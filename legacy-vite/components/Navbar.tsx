

import React, { useState } from 'react';
import { MenuIcon, CloseIcon } from './Icons';
import type { Page } from './types';

interface NavbarProps {
    onNavigate: (page: Page) => void;
}

type NavItem =
    | { label: string; target: Page; isInternal: true }
    | { label: string; href: string; isInternal: false }
    | { 
        label: string; 
        isDropdown: true; 
        items: Array<{ label: string; href: string; }>;
      };

const navItems: NavItem[] = [
    { label: 'INICIO', target: 'main', isInternal: true },
    { label: 'SERVICIOS', target: 'servicios', isInternal: true },
    {
        label: 'TOOLS',
        isDropdown: true,
        items: [
            { label: 'Eleva tu Sonido (PRO)', href: 'https://academy.bukoflow.com/' },
            { label: 'Eleva tu arte (Gratis)', href: 'https://artist.bukoflow.com/' },
        ],
    },
    { label: 'PRODUCCIÓN MUSICAL', target: 'produccion', isInternal: true },
    { label: 'AYUDA', target: 'ayuda', isInternal: true },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLinkClick = (page: Page) => {
        onNavigate(page);
        setIsOpen(false);
        setOpenDropdown(null);
    };

    const handleDropdownToggle = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[100] bg-black/50 backdrop-blur-lg border-b border-glass-border">
                <nav className="max-w-6xl mx-auto px-5 flex justify-between items-center h-20">
                    {/* Logo */}
                    <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('main'); }} className="flex items-center gap-2">
                        <img src="https://hostedimages-cdn.aweber-static.com/MjM0MTQ0NQ==/thumbnail/188302f5ca5241bd9111d44862883f63.png" alt="Logo" className="w-12 h-auto filter drop-shadow-[0_0_10px_#FF3D00]" />
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map(item => {
                            // FIX: Restructured conditional logic to correctly narrow the NavItem discriminated union type.
                            if ('isInternal' in item) {
                                // FIX: Use `'target' in item` to reliably narrow the type to an internal link, resolving the TypeScript error.
                                if ('target' in item) {
                                    return (
                                        <button key={item.label} onClick={() => handleLinkClick(item.target)} className="text-white font-semibold hover:text-primary-orange transition-colors duration-300">
                                            {item.label}
                                        </button>
                                    );
                                } else {
                                    return (
                                        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-primary-orange transition-colors duration-300">
                                            {item.label}
                                        </a>
                                    );
                                }
                            } else {
                                return (
                                    <div key={item.label} className="relative group">
                                        <button className="text-white font-semibold hover:text-primary-orange transition-colors duration-300 flex items-center gap-1.5 py-2">
                                            {item.label}
                                            <svg className="w-4 h-4 text-zinc-400 group-hover:text-primary-orange transition-colors" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-card-bg border-2 border-glass-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-1 z-10">
                                            {item.items.map(subItem => (
                                                <a key={subItem.label} href={subItem.href} target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-primary-orange transition-colors duration-200">
                                                    {subItem.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white p-2 z-[1002]"
                        aria-label="Open menu"
                    >
                        <MenuIcon />
                    </button>
                </nav>
            </header>
            
            {/* Mobile Navigation Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-72 max-w-[80%] bg-card-bg/95 backdrop-blur-xl border-l-2 border-glass-border z-[1001] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-end p-6">
                     <button
                        onClick={toggleMenu}
                        className="text-white p-2"
                        aria-label="Close menu"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="mt-8 flex flex-col">
                    {navItems.map(item => {
                        // FIX: Restructured conditional logic to correctly narrow the NavItem discriminated union type.
                        if ('isInternal' in item) {
                            // FIX: Use `'target' in item` to reliably narrow the type to an internal link, resolving the TypeScript error.
                            if ('target' in item) {
                                return (
                                    <button key={item.label} onClick={() => handleLinkClick(item.target)} className="text-left py-4 px-8 text-lg text-white font-semibold hover:bg-primary-orange transition-colors duration-300">
                                        {item.label}
                                    </button>
                                );
                            } else {
                                return (
                                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block py-4 px-8 text-lg text-white font-semibold hover:bg-primary-orange transition-colors duration-300" onClick={() => setIsOpen(false)}>
                                        {item.label}
                                    </a>
                                );
                            }
                        } else {
                            const isDropdownOpen = openDropdown === item.label;
                            return (
                                <div key={item.label}>
                                    <button onClick={() => handleDropdownToggle(item.label)} className="w-full text-left py-4 px-8 text-lg text-white font-semibold hover:bg-primary-orange/50 transition-colors duration-300 flex justify-between items-center">
                                        <span>{item.label}</span>
                                        <svg className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="pl-10 bg-black/20">
                                            {item.items.map(subItem => (
                                                <a key={subItem.label} href={subItem.href} target="_blank" rel="noopener noreferrer" className="block py-3 px-8 text-md text-zinc-200 font-medium hover:bg-primary-orange transition-colors duration-300" onClick={() => setIsOpen(false)}>
                                                    {subItem.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 z-[1000] transition-opacity duration-300 md:hidden ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleMenu}
            ></div>
        </>
    );
};