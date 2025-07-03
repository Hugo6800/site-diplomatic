'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../hooks/useAuth';
import { addToFavorites, removeFromFavorites, isArticleFavorited } from '../utils/favorites';

interface TagAddFavoriteArticleProps {
    articleId: string;
}

export default function TagAddFavoriteArticle({ articleId }: TagAddFavoriteArticleProps) {
    const { user } = useAuth();
    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (user) {
                const status = await isArticleFavorited(user.uid, articleId);
                setIsFavorited(status);
            }
        };

        checkFavoriteStatus();
    }, [user, articleId]);

    const handleToggleFavorite = async () => {
        if (!user) {
            // TODO: Rediriger vers la page de connexion ou afficher une modal
            alert('Veuillez vous connecter pour ajouter aux favoris');
            return;
        }

        setIsLoading(true);
        try {
            if (isFavorited) {
                await removeFromFavorites(user.uid, articleId);
            } else {
                await addToFavorites(user.uid, articleId);
            }
            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error('Erreur lors de la gestion des favoris:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggleFavorite}
            disabled={isLoading}
            className={`inline-flex justify-center items-center gap-2 px-3 py-2 ${isFavorited ? 'bg-[#E8B7B7]' : 'bg-[#F3DEDE]'} rounded-full font-semibold font-neulisalt cursor-pointer transition-colors duration-200 ${isLoading ? 'opacity-50' : ''}`}
        >
            <Image
                src={isFavorited ? "/icons/heart-full.svg" : "/icons/heart.svg"}
                alt={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
                width={24}
                height={24}
                className="w-6 h-6 object-cover"
            />
            <h2 className="font-bold font-neulisalt text-sm text-[#3F2525]">
                {isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </h2>
        </button>
    );
}