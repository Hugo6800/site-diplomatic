'use client';

import { useAuth } from '@/app/hooks/useAuth';
import { useStatistics } from '@/app/hooks/useStatistics';
import StatisticsCard from '../Cards/StatisticsCard';

export default function StatisticsSection() {
    const { user } = useAuth();
    const stats = useStatistics(user);

    const baseStatistics = [
        { icon: '/icons/auto_stories.svg', darkIcon: 'auto_stories', value: stats.readCount, label: 'Articles lus' },
        { icon: '/icons/avg_pace.svg', darkIcon: 'avg_pace', value: stats.totalReadingTime, label: 'Temps de lecture total' },
        { icon: '/icons/loyalty.svg', darkIcon: 'loyalty', value: stats.favoriteCount, label: 'Articles favoris' },
    ];

    const journalistStatistics = [
        { icon: '/icons/article_person.svg', darkIcon: 'article_person', value: stats.articlesWrittenCount, label: 'Articles écrits' },
        { icon: '/icons/favorite.svg', darkIcon: 'favorite', value: stats.likesReceivedCount, label: 'Likes reçus' },
        { icon: '/icons/match_word.svg', darkIcon: 'match_word', value: stats.totalWordsCount, label: 'Mots écrits' },
        { icon: '/icons/visibility.svg', darkIcon: 'visibility', value: stats.totalViewsCount, label: 'Vues sur articles' },
    ];

    const statistics = [
        ...baseStatistics,
        ...(user?.role === 'journalist' || user?.role === 'admin' ? journalistStatistics : [])
    ];

    return (
        <section className="mt-16 mb-20">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#433D3D] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-[#EECECE] w-fit">Statistiques</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statistics.map((stat, index) => (
                    <StatisticsCard
                        key={index}
                        icon={stat.icon}
                        darkIcon={stat.darkIcon}
                        value={stat.value}
                        label={stat.label}
                    />
                ))}
            </div>
        </section>
    );
}