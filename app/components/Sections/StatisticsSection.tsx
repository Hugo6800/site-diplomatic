'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { useAuth } from '@/app/hooks/useAuth';
import StatisticsCard from '../Cards/StatisticsCard';
import { formatReadingTime } from '@/app/utils/readingTime';

export default function StatisticsSection() {
    const { user } = useAuth();
    const [favoriteCount, setFavoriteCount] = useState('0');
    const [readCount, setReadCount] = useState('0');
    const [totalReadingTime, setTotalReadingTime] = useState('00:00');

    useEffect(() => {
        const fetchCounts = async () => {
            if (!user) return;

            try {
                // Récupérer le nombre de favoris
                const favoritesRef = collection(db, 'favorites');
                const favoritesQuery = query(favoritesRef, where('userId', '==', user.uid));
                const favoritesSnapshot = await getDocs(favoritesQuery);
                const favoriteCount = favoritesSnapshot.size.toString().padStart(3, '0');
                setFavoriteCount(favoriteCount);

                // Récupérer les lectures et calculer les statistiques
                const readingsRef = collection(db, 'userReadings');
                const readingsQuery = query(readingsRef, where('userId', '==', user.uid));
                const readingsSnapshot = await getDocs(readingsQuery);
                
                // Nombre d'articles lus
                const readCount = readingsSnapshot.size.toString().padStart(3, '0');
                setReadCount(readCount);

                // Temps total de lecture
                const totalMinutes = readingsSnapshot.docs.reduce((total, doc) => {
                    const data = doc.data();
                    // Si l'article vient d'être lu (actualReadTime = 1), on compte au moins 5 minutes
                    const readingTime = data.actualReadTime || 0;
                    return total + (readingTime === 1 ? 5 : readingTime);
                }, 0);
                
                setTotalReadingTime(formatReadingTime(totalMinutes));
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques:', error);
                setFavoriteCount('000');
                setReadCount('000');
            }
        };

        fetchCounts();
    }, [user]);

    const statistics = [
        { icon: '/icons/auto_stories.svg', value: readCount, label: 'Articles lus' },
        { icon: '/icons/avg_pace.svg', value: totalReadingTime, label: 'Temps de lecture total' },
        { icon: '/icons/loyalty.svg', value: favoriteCount, label: 'Articles favoris' },
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