import StatisticsCard from '../Cards/StatisticsCard';

const statistics = [
    { icon: '/icons/auto_stories.svg', value: '024', label: 'Articles lus' },
    { icon: '/icons/avg_pace.svg', value: '01:34', label: 'Temps de lecture total' },
    { icon: '/icons/loyalty.svg', value: '024', label: 'Articles favoris' },
];

export default function StatisticsSection() {
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