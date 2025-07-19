'use client'

import Image from 'next/image';

export default function TagEditArticle() {

    return (
        <div className="rounded-full bg-[#9AF2A3] flex items-center justify-center gap-2 py-10">
            <Image
                src="/icons/edit_square.svg"
                alt="edit"
                width={30}
                height={30}
            />
            <p className="font-bold font-neulisalt">Écrire un article</p>
        </div>
    );
}