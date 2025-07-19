'use client'

import Image from 'next/image';

interface StatisticsCardProps {
    icon: string;
    value: string;
    label: string;
}

export default function StatisticsCard({ icon, value, label }: StatisticsCardProps) {
    return (
        <article className="flex flex-col items-start p-4 bg-[#F3DEDE] dark:bg-[#2C2C2C] rounded-2xl w-full h-full">
            <div className="w-8 h-8 mb-3 relative">
                <Image
                    src={icon}
                    alt={label}
                    fill
                    className="object-contain"
                />
            </div>
            <p className="text-2xl font-bold font-neulisalt mb-1 dark:text-white">
                {value}
            </p>
            <p className="text-[#3F2525] dark:text-white font-neulisalt text-lg">
                {label}
            </p>
        </article>
    );
}
