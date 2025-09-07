'use client'

import { useState } from 'react';
import Image from 'next/image';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CategoryValue } from './CustomCategorySelect';

interface TagSaveDraftArticleProps {
    articleId: string;
    isDraft: boolean;
    onDraftStatusChange: (isDraft: boolean) => void;
    category?: CategoryValue;
}

export default function TagSaveDraftArticle({ 
    articleId, 
    isDraft,
    onDraftStatusChange,
    category = 'international'
}: TagSaveDraftArticleProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSaveAsDraft = async () => {
        if (!articleId) return;
        
        setIsLoading(true);
        setError(null);

        try {
            // Mettre à jour l'article dans Firestore
            const articleRef = doc(db, 'articles', articleId);
            await updateDoc(articleRef, {
                isDraft: true,
                updatedAt: Timestamp.now(),
                status: 'waiting', // Définir le statut sur "waiting" pour les brouillons
                category // Mettre à jour la catégorie
            });
            
            // Pas de redirection, on reste sur la page
            
            // Mettre à jour l'état local via le callback
            onDraftStatusChange(true);
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement comme brouillon:', err);
            setError('Une erreur est survenue lors de l\'enregistrement');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleSaveAsDraft}
                disabled={isLoading || isDraft}
                className={`inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt transition-colors duration-200 ${
                    isLoading || isDraft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E8B7B7]'
                }`}
                title={isDraft ? "Déjà enregistré comme brouillon" : "Enregistrer comme brouillon"}
            >
                <Image
                    src="/icons/docs.svg"
                    alt="Brouillon"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                />
                <span className="font-bold font-neulisalt text-sm text-[#3F2525]">
                    {isLoading ? 'Enregistrement...' : isDraft ? 'Enregistrer comme brouillon' : 'Enregistrer'}
                </span>
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
