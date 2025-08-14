'use client'

import { useState } from 'react';
import Image from 'next/image';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface TagSubmitArticleProps {
    articleId: string;
    onStatusChange?: (status: string) => void;
}

export default function TagSubmitArticle({ 
    articleId,
    onStatusChange
}: TagSubmitArticleProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmitForValidation = async () => {
        if (!articleId) return;
        
        setIsLoading(true);
        setError(null);

        try {
            // Mettre à jour l'article dans Firestore
            const articleRef = doc(db, 'articles', articleId);
            await updateDoc(articleRef, {
                status: 'waiting',
                updatedAt: new Date().toISOString()
            });
            
            // Mettre à jour l'état local via le callback si disponible
            if (onStatusChange) {
                onStatusChange('waiting');
            }
        } catch (err) {
            console.error('Erreur lors de la soumission pour validation:', err);
            setError('Une erreur est survenue lors de la soumission');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleSubmitForValidation}
                disabled={isLoading}
                className={`inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#F3E8DE] rounded-full font-semibold font-neulisalt cursor-pointer transition-colors duration-200 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E8D0B7]'
                }`}
                title="Soumettre pour validation"
            >
                <Image
                    src="/icons/arrow_upload_progress.svg"
                    alt="Soumettre"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                />
                <span className="font-bold font-neulisalt text-sm text-[#3F3525]">
                    {isLoading ? 'Soumission...' : 'Soumettre pour validation'}
                </span>
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
