'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TagEditArticle() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/recrutement');
    };

    return (
        <div 
            onClick={handleClick}
            className="rounded-full bg-[#F29A9C] dark:bg-[#895556] flex items-center justify-center gap-2 py-10 cursor-pointer"
        >
            <Image
                src="/icons/add_to_queue.svg"
                alt="edit"
                width={30}
                height={30}
                className="dark:hidden"
            />
            <Image
                src="/icons/dark_collection/add_to_queue.svg"
                alt="edit"
                width={30}
                height={30}
                className="hidden dark:block"
            />
            <p className="font-bold font-neulisalt dark:text-[#EECECE]">Recrutement</p>
        </div>
    );
}