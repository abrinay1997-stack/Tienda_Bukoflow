import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);
    
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1002] flex justify-center items-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-card-bg border-2 border-glass-border rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl shadow-primary-orange/20 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-primary-orange transition-colors duration-300 z-10 p-2 bg-black/20 rounded-full"
                    aria-label="Cerrar modal"
                >
                    <CloseIcon />
                </button>
                {children}
            </div>
        </div>
    );
};
