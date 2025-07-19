'use client'

import Image from 'next/image';

interface CardsDownEditPanelProps {
    icon: string;
    label: string;
    onClick?: () => void;
}

export default function CardsDownEditPanel({ icon, label, onClick }: CardsDownEditPanelProps) {
    return (
        <article 
            onClick={onClick}
            className="flex flex-col items-start p-4 bg-[#F3DEDE] dark:bg-[#2C2C2C] rounded-2xl w-1/2 cursor-pointer hover:bg-opacity-90 transition-colors"
        >
            <div className="w-8 h-8 mb-3 relative">
                <Image
                    src={icon}
                    alt={label}
                    fill
                    className="object-contain"
                />
            </div>
            <div className="flex items-center gap-2">
                <p className="text-[#3F2525] dark:text-white font-neulisalt font-bold text-sm">
                    {label}
                </p>
                <Image
                    src="/icons/chevron_forward.svg"
                    alt="chevron"
                    width={20}
                    height={20}
                />
            </div>
        </article>
    );
}