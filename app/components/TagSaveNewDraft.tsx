'use client'

import { useState } from 'react';
import Image from 'next/image';

interface TagSaveNewDraftProps {
    onSave: (isDraft: boolean) => Promise<void>;
    isLoading?: boolean;
}

export default function TagSaveNewDraft({ 
    onSave,
    isLoading: externalLoading
}: TagSaveNewDraftProps) {
    const [internalLoading, setInternalLoading] = useState(false);
    const isLoading = externalLoading || internalLoading;
    const [error, setError] = useState<string | null>(null);

    const handleSaveAsDraft = async () => {
        setInternalLoading(true);
        setError(null);

        try {
            // Appeler la fonction de sauvegarde avec isDraft=true
            await onSave(true);
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement comme brouillon:', err);
            setError('Une erreur est survenue lors de l\'enregistrement');
        } finally {
            setInternalLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleSaveAsDraft}
                disabled={isLoading}
                className={`inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer transition-colors duration-200 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E8B7B7]'
                }`}
                title="Enregistrer comme brouillon"
            >
                <Image
                    src="/icons/docs.svg"
                    alt="Brouillon"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                />
                <span className="font-bold font-neulisalt text-sm text-[#3F2525]">
                    {isLoading ? 'Enregistrement...' : 'Enregistrer comme brouillon'}
                </span>
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
