'use client'

import Image from 'next/image';

export default function TagAddFavoriteArticle() {
    return (
        <button className="inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer">
            <Image
                src="/icons/heart.svg"
                alt="Ajouter aux favoris"
                width={24}
                height={24}
                className="w-6 h-6 object-cover"
            />
            <h2 className="font-bold font-neulisalt text-sm text-[#3F2525]">Ajouter aux favoris</h2>
        </button>
    );
}