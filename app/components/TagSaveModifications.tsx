'use client'

import { useState } from 'react';
import Image from 'next/image';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CategoryValue } from './CustomCategorySelect';

interface TagSaveModificationsProps {
    articleId: string;
    title: string;
    content: string;
    keywords: string;
    imageUrl: string;
    category: CategoryValue;
    status: string;
    isDraft: boolean;
}

export default function TagSaveModifications({ 
    articleId,
    title,
    content,
    keywords,
    imageUrl,
    category,
    status,
    isDraft
}: TagSaveModificationsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Fonction pour calculer le temps de lecture estimé
    const calculateReadTime = (content: string): string => {
        const wordsPerMinute = 200; // Vitesse de lecture moyenne
        const wordCount = content.trim().split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return readTime > 0 ? `${readTime} min` : '< 1 min';
    };

    const handleSaveModifications = async () => {
        if (!articleId) return;
        
        setIsLoading(true);
        setError(null);
        setSaveSuccess(false);

        try {
            // Mettre à jour l'article dans Firestore
            const articleRef = doc(db, 'articles', articleId);
            await updateDoc(articleRef, {
                title,
                content,
                keywords: keywords.split(',').map(k => k.trim()),
                imageUrl,
                category,
                updatedAt: Timestamp.now(),
                status, // Conserver le statut actuel
                isDraft, // Conserver l'état de brouillon actuel
                estimatedReadTime: calculateReadTime(content)
            });
            
            // Afficher un message de succès
            setSaveSuccess(true);
            
            // Masquer le message de succès après 3 secondes
            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000);
        } catch (err) {
            console.error('Erreur lors de l\'enregistrement des modifications:', err);
            setError('Une erreur est survenue lors de l\'enregistrement');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleSaveModifications}
                disabled={isLoading}
                className={`inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#DEF3E8] rounded-full font-semibold font-neulisalt transition-colors duration-200 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#B7E8C9]'
                }`}
                title="Enregistrer les modifications"
            >
                <Image
                    src="/icons/save.svg"
                    alt="Enregistrer"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                />
                <span className="font-bold font-neulisalt text-sm text-[#253F2E]">
                    {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </span>
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {saveSuccess && <p className="text-green-500 text-sm mt-2">Modifications enregistrées avec succès</p>}
        </div>
    );
}
