'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TagEditArticle() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/edit-article');
    };

    return (
        <div 
            onClick={handleClick}
            className="rounded-full bg-[#9AF2A3] flex items-center justify-center gap-2 py-10 cursor-pointer hover:bg-[#88d991] transition-colors duration-200"
        >
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