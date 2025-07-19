'use client'

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { useAuth } from '@/app/hooks/useAuth';
import LeftCardsEditorPanel from '@/app/components/LeftCardsEditorPanel';
import TagEditArticle from '../TagEditArticle';
import CardsDownEditPanel from '../CardsDownEditPanel';

interface Article {
    id: string;
    title: string;
    imageUrl: string;
    likes?: number;
    author: string;
}

interface EditorPanelProps {
    onShowMyArticles: () => void;
}

export default function EditorPanel({ onShowMyArticles }: EditorPanelProps) {
    const { user } = useAuth();
    const [draft, _setDraft] = useState<Article | null>(null);
    const [mostLikedArticle, setMostLikedArticle] = useState<Article | null>(null);

    useEffect(() => {
        const fetchMostLikedArticle = async () => {
            if (!user?.displayName) return;

            // Récupérer tous les articles de l'auteur
            const articlesQuery = query(
                collection(db, 'articles'),
                where('authorName', '==', user.displayName)
            );

            const articlesSnapshot = await getDocs(articlesQuery);
            console.log('Articles trouvés:', articlesSnapshot.size);

            if (!articlesSnapshot.empty) {
                // Pour chaque article, compter les favoris
                const articlePromises = articlesSnapshot.docs.map(async (articleDoc) => {
                    const articleData = articleDoc.data();
                    console.log('Article:', articleDoc.id, articleData);

                    const favoritesQuery = query(
                        collection(db, 'favorites'),
                        where('articleId', '==', articleDoc.id)
                    );
                    const favoritesSnapshot = await getDocs(favoritesQuery);
                    const likesCount = favoritesSnapshot.size;
                    console.log('Likes pour article', articleDoc.id, ':', likesCount);

                    return {
                        id: articleDoc.id,
                        title: articleData.title,
                        imageUrl: articleData.imageUrl,
                        author: articleData.author,
                        likes: likesCount
                    } as Article;
                });

                const articlesWithLikes = await Promise.all(articlePromises);
                console.log('Articles avec likes:', articlesWithLikes);

                // Trier par nombre de likes et prendre le plus liké
                const articlesWithAtLeastOneLike = articlesWithLikes.filter(article => article.likes && article.likes > 0);
                console.log('Articles avec au moins un like:', articlesWithAtLeastOneLike);

                if (articlesWithAtLeastOneLike.length > 0) {
                    const mostLiked = articlesWithAtLeastOneLike[0];
                    setMostLikedArticle({
                        id: mostLiked.id,
                        title: mostLiked.title,
                        imageUrl: mostLiked.imageUrl,
                        likes: mostLiked.likes,
                        author: mostLiked.author
                    });
                } else {
                    setMostLikedArticle(null);
                }
            }
        };

        fetchMostLikedArticle();
    }, [user]);

    return (
        <section className="mt-12">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[2rem] mb-4 dark:text-white w-fit">{`Panel d'éditeur`}</h2>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="grid grid-cols-2 gap-8 lg:w-1/2">
                    <div>
                        {draft ? (
                            <LeftCardsEditorPanel
                                className="bg-[#F3DEDE] dark:bg-[#1E1E1E] px-4 py-2 w-fit text-xs lg:text-sm"
                                title={draft.title}
                                image={draft.imageUrl}
                                category="Dernier brouillon"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                                <p className="text-gray-500 dark:text-gray-400">Pas de brouillon</p>
                            </div>
                        )}
                    </div>

                    <div>
                        {mostLikedArticle ? (
                            <LeftCardsEditorPanel
                                className="bg-[#9AF2A3] dark:bg-[#1E1E1E] px-4 py-2 w-fit text-xs lg:text-sm"
                                title={mostLikedArticle.title}
                                image={mostLikedArticle.imageUrl}
                                category="Vos lecteurs aiment"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                                <p className="text-gray-500 dark:text-gray-400">Aucun article trouvé</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:w-1/2">
                    <TagEditArticle /> 
                    <div className="flex gap-4">
                        <CardsDownEditPanel 
                            icon="/icons/full_coverage.svg" 
                            label="Voir tous mes articles"
                            onClick={onShowMyArticles}
                        />
                        <CardsDownEditPanel icon="/icons/draft.svg" label="Gérer mes brouillons" />
                    </div>
                </div>
            </div>
        </section>
    );
}