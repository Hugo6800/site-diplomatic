'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { formatReadingTime } from './readingTime';
import { User } from '@/app/types/user';

interface Statistics {
    favoriteCount: string;
    readCount: string;
    totalReadingTime: string;
    articlesWrittenCount: string;
    likesReceivedCount: string;
    totalWordsCount: string;
    totalViewsCount: string;
}

export const useStatistics = (user: User | null): Statistics => {
    const [stats, setStats] = useState<Statistics>({
        favoriteCount: '0',
        readCount: '0',
        totalReadingTime: '00:00',
        articlesWrittenCount: '0',
        likesReceivedCount: '0',
        totalWordsCount: '0',
        totalViewsCount: '0'
    });

    useEffect(() => {
        if (!user) {
            setStats({
                favoriteCount: '0',
                readCount: '0',
                totalReadingTime: '00:00',
                articlesWrittenCount: '0',
                likesReceivedCount: '0',
                totalWordsCount: '0',
                totalViewsCount: '0'
            });
            return;
        }

        // Créer les queries pour les statistiques de base (favoris et lectures)
        const favoritesQuery = query(
            collection(db, 'favorites'),
            where('userId', '==', user.uid)
        );

        const readingsQuery = query(
            collection(db, 'userReadings'),
            where('userId', '==', user.uid)
        );
        
        // Query pour les articles écrits par l'utilisateur
        // Essayer d'abord avec authorId pour les rôles journalist et admin
        const articlesQuery = (user.role === 'journalist' || user.role === 'admin') ? query(
            collection(db, 'articles'),
            where('authorId', '==', user.uid)
        ) : null;

        // Écouter les changements dans les favoris
        const unsubscribeAll = () => {
            const unsubscribeFavorites = onSnapshot(favoritesQuery, async (favoritesSnapshot: QuerySnapshot<DocumentData>) => {
                const favoriteCount = favoritesSnapshot.size.toString();

                // Calculer le temps de lecture total et le nombre d'articles lus
                const readingsSnapshot = await getDocs(readingsQuery);
                const readCount = readingsSnapshot.size.toString();

                let totalReadingTimeSeconds = 0;
                readingsSnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.totalReadTime) {
                        totalReadingTimeSeconds += data.totalReadTime;
                    }
                });

                // Formater le temps de lecture (convertir en minutes)
                const totalMinutes = Math.round(totalReadingTimeSeconds / 60);
                const formattedReadingTime = formatReadingTime(totalMinutes);

                // Stats de base pour tous les utilisateurs
                const baseStats = {
                    favoriteCount,
                    readCount,
                    totalReadingTime: formattedReadingTime,
                    articlesWrittenCount: '0',
                    likesReceivedCount: '0',
                    totalWordsCount: '0',
                    totalViewsCount: '0'
                };

                // Si l'utilisateur est journaliste ou admin, récupérer les statistiques d'articles
                if ((user.role === 'journalist' || user.role === 'admin') && articlesQuery) {
                    try {
                        // Récupérer les articles écrits par l'utilisateur
                        const articlesSnapshot = await getDocs(articlesQuery);
                        const articlesWrittenCount = articlesSnapshot.size.toString();
                        
                        // Calculer le nombre total de mots
                        const totalWords = articlesSnapshot.docs.reduce((total, doc) => {
                            const data = doc.data() as { content?: string };
                            if (data.content) {
                                const words = data.content.trim().split(/\s+/);
                                return total + words.length;
                            }
                            return total;
                        }, 0);
                        
                        // Compter les likes pour les articles de l'auteur
                        try {
                            // Récupérer les IDs des articles écrits par l'utilisateur
                            const authorArticleIds = articlesSnapshot.docs.map(doc => doc.id);
                            
                            // Compter les likes pour chaque article
                            let totalLikes = 0;
                            let totalViews = 0;
                            
                            // Compter les likes en utilisant la même approche que dans EditorPanel
                            for (const articleId of authorArticleIds) {
                                const favoritesQuery = query(
                                    collection(db, 'favorites'),
                                    where('articleId', '==', articleId)
                                );
                                const favoritesSnapshot = await getDocs(favoritesQuery);
                                totalLikes += favoritesSnapshot.size;
                                
                                // Compter les vues en utilisant userReadings
                                const viewsQuery = query(
                                    collection(db, 'userReadings'),
                                    where('articleId', '==', articleId)
                                );
                                const viewsSnapshot = await getDocs(viewsQuery);
                                totalViews += viewsSnapshot.size;
                            }
                            
                            // Mettre à jour les statistiques avec les articles écrits, les likes et les vues
                            setStats({
                                ...baseStats,
                                articlesWrittenCount,
                                likesReceivedCount: totalLikes.toString(),
                                totalWordsCount: totalWords.toString(),
                                totalViewsCount: totalViews.toString()
                            });
                        } catch (error) {
                            console.error('Erreur lors du comptage des likes et vues:', error);
                            // En cas d'erreur, utiliser des valeurs par défaut
                            setStats({
                                ...baseStats,
                                articlesWrittenCount,
                                likesReceivedCount: '0',
                                totalWordsCount: totalWords.toString(),
                                totalViewsCount: '0'
                            });
                        }
                    } catch (error) {
                        console.error('Erreur lors de la récupération des articles avec authorId:', error);
                        
                        // Solution alternative : essayer avec authorName
                        try {
                            const authorNameQuery = query(
                                collection(db, 'articles'),
                                where('authorName', '==', user.displayName)
                            );
                            
                            const articlesSnapshot = await getDocs(authorNameQuery);
                            const articlesWrittenCount = articlesSnapshot.size.toString();
                            
                            if (articlesSnapshot.size > 0) {
                                // Calculer le nombre total de mots
                                const totalWords = articlesSnapshot.docs.reduce((total, doc) => {
                                    const data = doc.data() as { content?: string };
                                    if (data.content) {
                                        const words = data.content.trim().split(/\s+/);
                                        return total + words.length;
                                    }
                                    return total;
                                }, 0);
                                
                                // Compter les likes pour les articles de l'auteur
                                try {
                                    // Récupérer les IDs des articles écrits par l'utilisateur
                                    const authorArticleIds = articlesSnapshot.docs.map(doc => doc.id);
                                    
                                    // Compter les likes pour chaque article
                                    let totalLikes = 0;
                                    let totalViews = 0;
                                    
                                    // Compter les likes en utilisant la même approche que dans EditorPanel
                                    for (const articleId of authorArticleIds) {
                                        const favoritesQuery = query(
                                            collection(db, 'favorites'),
                                            where('articleId', '==', articleId)
                                        );
                                        const favoritesSnapshot = await getDocs(favoritesQuery);
                                        totalLikes += favoritesSnapshot.size;
                                        
                                        // Compter les vues en utilisant userReadings
                                        const viewsQuery = query(
                                            collection(db, 'userReadings'),
                                            where('articleId', '==', articleId)
                                        );
                                        const viewsSnapshot = await getDocs(viewsQuery);
                                        totalViews += viewsSnapshot.size;
                                    }
                                    
                                    // Mettre à jour les statistiques avec les articles écrits, les likes et les vues
                                    setStats({
                                        ...baseStats,
                                        articlesWrittenCount,
                                        likesReceivedCount: totalLikes.toString(),
                                        totalWordsCount: totalWords.toString(),
                                        totalViewsCount: totalViews.toString()
                                    });
                                } catch (error) {
                                    console.error('Erreur lors du comptage des likes et vues (fallback):', error);
                                    // En cas d'erreur, utiliser des valeurs par défaut
                                    setStats({
                                        ...baseStats,
                                        articlesWrittenCount,
                                        likesReceivedCount: '0',
                                        totalWordsCount: totalWords.toString(),
                                        totalViewsCount: '0'
                                    });
                                }
                            } else {
                                // Si aucun article n'est trouvé
                                setStats(baseStats);
                            }
                        } catch (fallbackError) {
                            console.error('Erreur lors de la récupération des articles avec authorName:', fallbackError);
                            setStats(baseStats);
                        }
                    }
                } else {
                    // Pour les utilisateurs qui ne sont pas journalistes ou admin
                    setStats(baseStats);
                }
            });

            return unsubscribeFavorites;
        };

        const unsubscribe = unsubscribeAll();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user]);

    return stats;
};
