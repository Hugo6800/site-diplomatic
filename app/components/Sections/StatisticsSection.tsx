'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { useAuth } from '@/app/hooks/useAuth';
import StatisticsCard from '../Cards/StatisticsCard';
import { formatReadingTime } from '@/app/hooks/readingTime';

export default function StatisticsSection() {
    const { user } = useAuth();
    const [favoriteCount, setFavoriteCount] = useState('0');
    const [readCount, setReadCount] = useState('0');
    const [totalReadingTime, setTotalReadingTime] = useState('00:00');
    const [articlesWrittenCount, setArticlesWrittenCount] = useState('0');
    const [likesReceivedCount, setLikesReceivedCount] = useState('0');
    const [totalWordsCount, setTotalWordsCount] = useState('0');

    useEffect(() => {
        if (!user) return;

        const fetchCounts = async () => {
            try {
                // Récupérer le nombre d'articles favoris
                const favoritesQuery = query(
                    collection(db, 'favorites'),
                    where('userId', '==', user.uid)
                );
                console.log('Requête favorites pour userId:', user.uid);
                const favoritesSnapshot = await getDocs(favoritesQuery);
                console.log('Nombre de favoris trouvés:', favoritesSnapshot.size);
                setFavoriteCount(favoritesSnapshot.size.toString());

                // Récupérer le nombre d'articles lus
                const readingsQuery = query(
                    collection(db, 'userReadings'),
                    where('userId', '==', user.uid)
                );
                console.log('Requête lectures pour userId:', user.uid);
                const readingsSnapshot = await getDocs(readingsQuery);
                console.log('Nombre de lectures trouvées:', readingsSnapshot.size);
                setReadCount(readingsSnapshot.size.toString());

                // Calculer le temps total de lecture
                const totalMinutes = readingsSnapshot.docs.reduce((total, doc) => {
                    const data = doc.data();
                    // Si l'article vient d'être lu (actualReadTime = 1), on compte au moins 5 minutes
                    const readingTime = data.actualReadTime || 0;
                    return total + (readingTime === 1 ? 5 : readingTime);
                }, 0);
                
                setTotalReadingTime(formatReadingTime(totalMinutes));

                // Si l'utilisateur est journaliste, récupérer les statistiques supplémentaires
                if (user.role === 'journalist') {
                    // Récupérer les articles écrits par le journaliste
                    const articlesSnapshot = await getDocs(query(
                        collection(db, 'articles'),
                        where('authorName', '==', user.displayName)
                    ));

                    // Nombre d'articles écrits
                    setArticlesWrittenCount(articlesSnapshot.size.toString());

                    // Calculer le nombre total de likes et de mots
                    let totalLikes = 0;
                    let totalWords = 0;

                    articlesSnapshot.docs.forEach(doc => {
                        const data = doc.data();
                        // Ajouter les likes de l'article
                        totalLikes += data.likes || 0;
                        // Compter les mots du contenu
                        if (data.content) {
                            totalWords += data.content.split(/\s+/).length;
                        }
                    });

                    setLikesReceivedCount(totalLikes.toString());
                    setTotalWordsCount(totalWords.toLocaleString());
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques:', error);
                setFavoriteCount('000');
                setReadCount('000');
            }
        };

        fetchCounts();
    }, [user]);

    const baseStatistics = [
        { icon: '/icons/auto_stories.svg', value: readCount, label: 'Articles lus' },
        { icon: '/icons/avg_pace.svg', value: totalReadingTime, label: 'Temps de lecture total' },
        { icon: '/icons/loyalty.svg', value: favoriteCount, label: 'Articles favoris' },
    ];

    const journalistStatistics = [
        { icon: '/icons/article_person.svg', value: articlesWrittenCount, label: 'Articles écrits' },
        { icon: '/icons/favorite.svg', value: likesReceivedCount, label: 'Likes reçus' },
        { icon: '/icons/match_word.svg', value: totalWordsCount, label: 'Mots écrits' },
    ];

    const statistics = [
        ...baseStatistics,
        ...(user?.role === 'journalist' ? journalistStatistics : [])
    ];
    return (
        <section className="mt-16 mb-20">
            <h2 className="font-bold italic font-neulisalt text-[2rem] mb-4 dark:text-white">Statistiques</h2>
            <div className="flex flex-wrap gap-4">
                {statistics.map((stat, index) => (
                    <StatisticsCard
                        key={index}
                        icon={stat.icon}
                        value={stat.value}
                        label={stat.label}
                    />
                ))}
            </div>
        </section>
    );
}