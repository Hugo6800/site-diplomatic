'use client'

import Image from 'next/image';

interface StatisticsCardProps {
    icon: string;
    darkIcon?: string;
    value: string;
    label: string;
}

export default function StatisticsCard({ icon, darkIcon, value, label }: StatisticsCardProps) {
    return (
        <article className="flex flex-col items-start p-4 bg-[#F3DEDE] dark:bg-[#433D3D] rounded-2xl w-full h-full">
            <div className="w-8 h-8 mb-3 relative">
                {darkIcon ? (
                    <>
                        <Image
                            src={icon}
                            alt={label}
                            fill
                            className="object-contain block dark:hidden"
                        />
                        <Image
                            src={`/icons/dark_collection/${darkIcon}.svg`}
                            alt={label}
                            fill
                            className="object-contain hidden dark:block"
                        />
                    </>
                ) : (
                    <Image
                        src={icon}
                        alt={label}
                        fill
                        className="object-contain"
                    />
                )}
            </div>
            <p className="text-2xl font-bold font-neulisalt mb-1 dark:text-[#EECECE]">
                {value}
            </p>
            <p className="text-[#3F2525] dark:text-[#EECECE] font-neulisalt text-lg">
                {label}
            </p>
        </article>
    );
}
