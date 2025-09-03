'use client'

import { useState } from 'react';
import Image from 'next/image';

interface TagSubmitNewArticleProps {
    onSubmit: (status: string) => Promise<void>;
    isLoading?: boolean;
    initialStatus?: string;
}

export default function TagSubmitNewArticle({ 
    onSubmit,
    isLoading: externalLoading,
    initialStatus
}: TagSubmitNewArticleProps) {
    const [internalLoading, setInternalLoading] = useState(false);
    const isLoading = externalLoading || internalLoading;
    const [error, setError] = useState<string | null>(null);
    // Vérifier si l'article est déjà soumis (status waiting)
    // Pour un nouvel article, on ne considère pas 'published' comme déjà soumis
    const [isSubmitted, setIsSubmitted] = useState(initialStatus === 'waiting');

    const handleSubmitForValidation = async () => {
        setInternalLoading(true);
        setError(null);

        try {
            // Appeler la fonction de soumission avec status='waiting'
            await onSubmit('waiting');
            setIsSubmitted(true); // Marquer comme soumis après succès
        } catch (err) {
            console.error('Erreur lors de la soumission pour validation:', err);
            setError('Une erreur est survenue lors de la soumission');
        } finally {
            setInternalLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleSubmitForValidation}
                disabled={isLoading || isSubmitted}
                className={`inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#69A3F9] rounded-full font-semibold font-neulisalt transition-colors duration-200 ${
                    isLoading || isSubmitted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#E8D0B7]'
                }`}
                title={isSubmitted ? "Déjà soumis pour validation" : "Soumettre pour validation"}
            >
                <Image
                    src="/icons/arrow_upload_ready.svg"
                    alt="Soumettre"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                />
                <span className="font-bold font-neulisalt text-sm text-[#3F3525]">
                    {isLoading ? 'Soumission...' : isSubmitted ? 'En attente de validation' : 'Soumettre pour validation'}
                </span>
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
