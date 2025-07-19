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

        // Créer les queries
        const favoritesQuery = query(
            collection(db, 'favorites'),
            where('userId', '==', user.uid)
        );

        const readingsQuery = query(
            collection(db, 'userReadings'),
            where('userId', '==', user.uid)
        );

        const articlesQuery = user.role === 'journalist' ? query(
            collection(db, 'articles'),
            where('authorName', '==', user.displayName)
        ) : null;
        let authorArticleIds: string[] = [];

        // Écouter les changements
        const unsubscribeAll = () => {
            const unsubscribeFavorites = onSnapshot(favoritesQuery, async (favoritesSnapshot: QuerySnapshot<DocumentData>) => {
                const favoriteCount = favoritesSnapshot.size.toString();

                const readingsSnapshot = await getDocs(readingsQuery);
                const readCount = readingsSnapshot.size.toString();

                // Calculer le temps total de lecture
                const totalSeconds = readingsSnapshot.docs.reduce((total, doc) => {
                    const data = doc.data();
                    return total + (data.totalReadTime || 0);
                }, 0);
                
                const totalMinutes = Math.round(totalSeconds / 60);
                const totalReadingTime = formatReadingTime(totalMinutes);

                // Statistiques de base
                const baseStats = {
                    favoriteCount,
                    readCount,
                    totalReadingTime,
                    articlesWrittenCount: '0',
                    likesReceivedCount: '0',
                    totalWordsCount: '0',
                    totalViewsCount: '0'
                };

                if (user.role === 'journalist' && articlesQuery) {
                    const articlesSnapshot = await getDocs(articlesQuery);
                    const articlesWrittenCount = articlesSnapshot.size.toString();

                    authorArticleIds = articlesSnapshot.docs.map(doc => doc.id);

                    let likesReceivedCount = '0';
                    let totalViews = 0;

                    if (authorArticleIds.length > 0) {
                        // Compter les likes
                        const journalistFavoritesQuery = query(
                            collection(db, 'favorites'),
                            where('articleId', 'in', authorArticleIds)
                        );
                        const journalistFavoritesSnapshot = await getDocs(journalistFavoritesQuery);
                        likesReceivedCount = journalistFavoritesSnapshot.size.toString();

                        // Compter les vues
                        const articleReadingsQuery = query(
                            collection(db, 'userReadings'),
                            where('articleId', 'in', authorArticleIds)
                        );
                        const articleReadingsSnapshot = await getDocs(articleReadingsQuery);
                        totalViews = articleReadingsSnapshot.size;
                    }

                    // Calculer le nombre total de mots
                    const totalWords = articlesSnapshot.docs.reduce((total, doc) => {
                        const data = doc.data() as { content?: string };
                        if (data.content) {
                            const words = data.content.trim().split(/\s+/);
                            return total + words.length;
                        }
                        return total;
                    }, 0);

                    setStats({
                        ...baseStats,
                        articlesWrittenCount,
                        likesReceivedCount,
                        totalWordsCount: totalWords.toString(),
                        totalViewsCount: totalViews.toLocaleString()
                    });
                } else {
                    setStats({
                        ...baseStats,
                        totalViewsCount: '0'
                    });
                }
            });

            return () => {
                unsubscribeFavorites();
            };
        };

        const unsubscribe = unsubscribeAll();

        // Cleanup
        return () => {
            unsubscribe();
        };
    }, [user]);

    return stats;
};
