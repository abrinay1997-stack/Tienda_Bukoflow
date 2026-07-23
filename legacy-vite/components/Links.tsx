
import React from 'react';
import { SectionTitle } from './SectionTitle';

export const Links = () => (
    <section className="mt-24">
        <SectionTitle>Para colaboraciones, contáctanos</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-2.5 max-w-3xl mx-auto">
            <a href="https://bukoflow.com/" target="_blank" rel="noopener noreferrer" className="link-button group">
                <i className="fas fa-home text-xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3"></i>
                <span className="text-lg">Web</span>
            </a>
            <a href="mailto:bukoflowpanama@gmail.com" className="link-button group">
                <i className="fas fa-envelope text-xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3"></i>
                <span className="text-lg">Email (Licencias)</span>
            </a>
        </div>
    </section>
);
