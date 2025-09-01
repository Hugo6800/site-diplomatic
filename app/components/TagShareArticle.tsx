'use client'

import { useState } from 'react';
import Image from 'next/image';

export default function TagShareArticle() {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset après 2 secondes
        } catch (err) {
            console.error('Erreur lors de la copie :', err);
        }
    };

    return (
        <button 
            onClick={handleShare}
            className={`
                inline-flex justify-center items-center gap-2 px-3 py-2
                ${copied ? 'bg-[#E8B7B7]' : 'bg-[#F3DEDE] dark:bg-[#433D3D]'}
                rounded-full font-semibold font-neulisalt cursor-pointer
                transition-colors duration-200
            `}
        >
            <Image
                src="/icons/share.svg"
                alt="Partager"
                width={24}
                height={24}
                className="w-6 h-6 object-cover dark:hidden"
            />
            <Image
                src="/icons/dark_collection/share.svg"
                alt="Partager"
                width={24}
                height={24}
                className="w-6 h-6 object-cover hidden dark:block"
            />
            <span className="font-bold font-neulisalt text-sm text-[#3F2525] dark:text-[#EECECE]">
                {copied ? 'Copié !' : 'Partager'}
            </span>
        </button>
    );
}