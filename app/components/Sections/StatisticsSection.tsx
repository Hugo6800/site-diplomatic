'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { useStatistics } from '@/app/hooks/useStatistics';
import StatisticsCard from '../Cards/StatisticsCard';

export default function StatisticsSection() {
    const { user } = useAuth();
    const stats = useStatistics(user);

    const baseStatistics = [
        { icon: '/icons/auto_stories.svg', value: stats.readCount, label: 'Articles lus' },
        { icon: '/icons/avg_pace.svg', value: stats.totalReadingTime, label: 'Temps de lecture total' },
        { icon: '/icons/loyalty.svg', value: stats.favoriteCount, label: 'Articles favoris' },
    ];

    const journalistStatistics = [
        { icon: '/icons/article_person.svg', value: stats.articlesWrittenCount, label: 'Articles écrits' },
        { icon: '/icons/favorite.svg', value: stats.likesReceivedCount, label: 'Likes reçus' },
        { icon: '/icons/match_word.svg', value: stats.totalWordsCount, label: 'Mots écrits' },
        { icon: '/icons/visibility.svg', value: stats.totalViewsCount, label: 'Vues sur articles' },
    ];

    const statistics = [
        ...baseStatistics,
        ...(user?.role === 'journalist' ? journalistStatistics : [])
    ];

    return (
        <section className="mt-16 mb-20">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[2rem] mb-4 dark:text-white w-fit">Statistiques</h2>
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