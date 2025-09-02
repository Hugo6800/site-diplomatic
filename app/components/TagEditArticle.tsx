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
            className="rounded-full bg-[#9AF2A3] dark:bg-[#3B6E40] flex items-center justify-center gap-2 py-10 cursor-pointer"
        >
            <Image
                src="/icons/edit_square.svg"
                alt="edit"
                width={30}
                height={30}
                className="dark:hidden"
            />
            <Image
                src="/icons/dark_collection/edit_square.svg"
                alt="edit"
                width={30}
                height={30}
                className="hidden dark:block"
            />
            <p className="font-bold font-neulisalt dark:text-[#E0E0E0]">Écrire un article</p>
        </div>
    );
}