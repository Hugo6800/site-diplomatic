'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
}

export const useStatistics = (user: User | null): Statistics => {
    const [stats, setStats] = useState<Statistics>({
        favoriteCount: '0',
        readCount: '0',
        totalReadingTime: '00:00',
        articlesWrittenCount: '0',
        likesReceivedCount: '0',
        totalWordsCount: '0'
    });

    useEffect(() => {
        if (!user) return;

        const fetchCounts = async () => {
            try {
                // Récupérer le nombre d'articles favoris
                const favoritesQuery = query(
                    collection(db, 'favorites'),
                    where('userId', '==', user.uid)
                );
                const favoritesSnapshot = await getDocs(favoritesQuery);
                const favoriteCount = favoritesSnapshot.size.toString();

                // Récupérer le nombre d'articles lus
                const readingsQuery = query(
                    collection(db, 'userReadings'),
                    where('userId', '==', user.uid)
                );
                const readingsSnapshot = await getDocs(readingsQuery);
                const readCount = readingsSnapshot.size.toString();

                // Calculer le temps total de lecture
                const totalMinutes = readingsSnapshot.docs.reduce((total, doc) => {
                    const data = doc.data();
                    const readingTime = data.actualReadTime || 0;
                    return total + (readingTime === 1 ? 5 : readingTime);
                }, 0);
                
                const totalReadingTime = formatReadingTime(totalMinutes);

                // Statistiques de base
                const baseStats = {
                    favoriteCount,
                    readCount,
                    totalReadingTime,
                    articlesWrittenCount: '0',
                    likesReceivedCount: '0',
                    totalWordsCount: '0'
                };

                // Si l'utilisateur est journaliste, récupérer les statistiques supplémentaires
                if (user.role === 'journalist') {
                    const articlesQuery = query(
                        collection(db, 'articles'),
                        where('authorName', '==', user.displayName)
                    );
                    const articlesSnapshot = await getDocs(articlesQuery);
                    const articlesWrittenCount = articlesSnapshot.size.toString();

                    const authorArticleIds = articlesSnapshot.docs.map(doc => doc.id);

                    let likesReceivedCount = '0';
                    if (authorArticleIds.length > 0) {
                        const favoritesQuery = query(
                            collection(db, 'favorites'),
                            where('articleId', 'in', authorArticleIds)
                        );
                        const favoritesSnapshot = await getDocs(favoritesQuery);
                        likesReceivedCount = favoritesSnapshot.size.toString();
                    }

                    const totalWords = articlesSnapshot.docs.reduce((total, doc) => {
                        const data = doc.data();
                        if (data.content) {
                            return total + data.content.split(/\\s+/).length;
                        }
                        return total;
                    }, 0);

                    setStats({
                        ...baseStats,
                        articlesWrittenCount,
                        likesReceivedCount,
                        totalWordsCount: totalWords.toLocaleString()
                    });
                } else {
                    setStats(baseStats);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques:', error);
                setStats({
                    favoriteCount: '000',
                    readCount: '000',
                    totalReadingTime: '00:00',
                    articlesWrittenCount: '0',
                    likesReceivedCount: '0',
                    totalWordsCount: '0'
                });
            }
        };

        fetchCounts();
    }, [user]);

    return stats;
};
