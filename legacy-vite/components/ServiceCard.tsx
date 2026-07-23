
import React from 'react';

interface ServiceCardProps {
    title: string;
    onClick?: () => void;
    href?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, onClick, href }) => {
    const commonClasses = "group block bg-card-bg border-2 border-glass-border rounded-2xl p-8 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary-orange hover:shadow-2xl hover:shadow-hover-glow w-full h-full flex flex-col justify-center items-center";

    const content = (
        <>
            <h3 className="text-2xl font-bold text-white group-hover:text-primary-orange transition-colors duration-300">{title}</h3>
            <span className="mt-4 inline-block text-primary-orange font-semibold transition-transform duration-300 group-hover:translate-x-2">
                Ver Más <i className="fas fa-arrow-right ml-1"></i>
            </span>
        </>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                {content}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={commonClasses}>
            {content}
        </button>
    );
};
