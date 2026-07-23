
import React from 'react';

interface SectionTitleProps {
    children: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
    <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-wider uppercase bg-gradient-to-r from-white via-primary-orange to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer text-center">
        {children}
    </h2>
);