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
    const [draft, setDraft] = useState<Article | null>(null);
    const [mostLikedArticle, setMostLikedArticle] = useState<Article | null>(null);

    useEffect(() => {
        // Fonction pour récupérer le dernier brouillon
        const fetchLatestDraft = async () => {
            if (!user?.uid) return;
            
            // Récupérer tous les articles brouillons de l'auteur
            const draftsQuery = query(
                collection(db, 'articles'),
                where('authorId', '==', user.uid),
                where('isDraft', '==', true)
            );
            
            const draftsSnapshot = await getDocs(draftsQuery);
            
            if (!draftsSnapshot.empty) {
                // Convertir les données Firestore en objets articles
                const drafts = draftsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title,
                        imageUrl: data.imageUrl,
                        author: data.authorName || user.displayName || '',
                        updatedAt: data.updatedAt || data.createdAt
                    };
                });
                
                // Trier par date de mise à jour (du plus récent au plus ancien)
                const sortedDrafts = drafts.sort((a, b) => {
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                });
                
                // Prendre le plus récent
                if (sortedDrafts.length > 0) {
                    setDraft(sortedDrafts[0]);
                }
            } else {
                setDraft(null);
            }
        };
        
        const fetchMostLikedArticle = async () => {
            if (!user?.displayName) return;

            // Récupérer tous les articles de l'auteur
            const articlesQuery = query(
                collection(db, 'articles'),
                where('authorName', '==', user.displayName)
            );

            const articlesSnapshot = await getDocs(articlesQuery);

            if (!articlesSnapshot.empty) {
                // Pour chaque article, compter les favoris
                const articlePromises = articlesSnapshot.docs.map(async (articleDoc) => {
                    const articleData = articleDoc.data();

                    const favoritesQuery = query(
                        collection(db, 'favorites'),
                        where('articleId', '==', articleDoc.id)
                    );
                    const favoritesSnapshot = await getDocs(favoritesQuery);
                    const likesCount = favoritesSnapshot.size;

                    return {
                        id: articleDoc.id,
                        title: articleData.title,
                        imageUrl: articleData.imageUrl,
                        author: articleData.author,
                        likes: likesCount
                    } as Article;
                });

                const articlesWithLikes = await Promise.all(articlePromises);

                // Trier par nombre de likes et prendre le plus liké
                const articlesWithAtLeastOneLike = articlesWithLikes.filter(article => article.likes && article.likes > 0);

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

        fetchLatestDraft();
        fetchMostLikedArticle();
    }, [user]);

    return (
        <section className="mt-12">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">{`Panel d'éditeur`}</h2>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="grid grid-cols-2 gap-8 lg:w-1/2">
                    <div>
                        {draft ? (
                            <LeftCardsEditorPanel
                                className="bg-[#A7A7A7] dark:bg-[#1E1E1E] px-4 py-2 w-fit text-xs lg:text-sm"
                                title={draft.title}
                                image={draft.imageUrl}
                                category="Dernier brouillon"
                            />
                        ) : (
                            <div className="flex flex-col gap-2.5">
                                <div className="bg-[#A7A7A7] dark:bg-[#1E1E1E] px-4 py-2 w-fit text-xs lg:text-sm rounded-full font-bold font-neulisalt">
                                    Dernier brouillon
                                </div>
                                <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                                    <p className="text-gray-500 dark:text-gray-400">Pas de brouillon</p>
                                </div>
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
                            <div className="flex flex-col gap-2.5">
                                <div className="bg-[#9AF2A3] dark:bg-[#1E1E1E] px-4 py-2 w-fit text-xs lg:text-sm rounded-full font-bold font-neulisalt">
                                    Vos lecteurs aiment
                                </div>
                                <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                                    <p className="text-gray-500 dark:text-gray-400">Aucun article trouvé</p>
                                </div>
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