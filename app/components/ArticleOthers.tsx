'use client'

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Image from 'next/image';
import TagNavigationArticles from './TagNavigationArticles';

interface ArticleProps {
    colorCircle: string;
    name: string;
    className: string;
    author: string;
    title: string;
    date: string;
    coverImage: string;
}

export default function Article({ colorCircle, name, className, author, title, date, coverImage }: ArticleProps) {
    const { user } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleArticleClick = () => {
        if (!user) {
            setShowAuthModal(true);
        } else {
            // Ici vous pourrez ajouter la logique pour afficher l'article
            console.log('Afficher l\'article');
        }
    };

    return (
        <>
            <article className="flex flex-col" onClick={handleArticleClick}>
                <Image
                    src={coverImage}
                    alt="Image"
                    width={800}
                    height={400}
                    quality={100}
                    className="w-full h-auto mb-4 object-cover cursor-pointer"
                />
                <TagNavigationArticles
                    colorCircle={colorCircle}
                    name={name}
                    className={className}
                    variant="article"
                />
                <p className="mt-2 font-semibold text-[1rem] font-neulisalt">{author} - {date}</p>
                <h3 className="font-bold font-fractul text-2xl line-clamp-3 tracking-[0.03em] leading-[110%] cursor-pointer hover:text-primary">{title}</h3>
            </article>

            {showAuthModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                        <h2 className="text-2xl font-fractul font-bold mb-4 text-center">Soutenez The Diplomatic Post</h2>
                        <p className="text-center mb-6 font-neulisalt">Cet article est réservé aux membres. Connectez-vous ou créez un compte gratuit !</p>
                        <div className="flex flex-col gap-4">
                            <button 
                                onClick={() => window.location.href = '/login'}
                                className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                            >
                                Se connecter
                            </button>
                            <button 
                                onClick={() => window.location.href = '/signup'}
                                className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                            >
                                Créer un compte
                            </button>
                        </div>
                        <button 
                            onClick={() => setShowAuthModal(false)}
                            className="mt-6 text-gray-500 hover:text-gray-700 w-full text-sm"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}