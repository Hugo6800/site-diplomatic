'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function PlansButton() {
    const router = useRouter();

    return (
        <>
            <div 
                className="flex items-center gap-4 bg-gray rounded-full p-2 cursor-pointer h-[48px] hover:bg-gray/80 transition-colors"
                onClick={() => {router.push('/pricing')}}
            >
                <Image
                    src='/icons/military_tech.svg'
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full object-contain"
                />
            </div>
        </>
    );
}