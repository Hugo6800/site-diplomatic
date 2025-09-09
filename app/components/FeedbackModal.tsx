'use client'

import { useEffect } from 'react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'success' | 'error';
    message: string;
}

export default function FeedbackModal({ isOpen, onClose, type, message }: FeedbackModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative z-10 bg-[#FEF6F6] dark:bg-[#1E1E1E] rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="flex flex-col items-center">
                    {type === 'success' ? (
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    ) : (
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    )}
                    
                    <h2 className="text-2xl font-fractul font-bold mb-4 text-center">
                        {type === 'success' ? 'Succès !' : 'Erreur'}
                    </h2>
                    
                    <p className="mb-6 font-neulisalt text-center dark:text-[#F4DFDF]">
                        {message}
                    </p>
                    
                    <button
                        onClick={onClose}
                        className="bg-[#DE595C] font-bold tracking-wider cursor-pointer font-neulisalt py-2 px-6 rounded-full hover:bg-[#DE595C]/80 transition-colors"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}
