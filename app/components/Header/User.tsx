'use client'

import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import AuthModal from "../Auth/AuthModal";
import { LogoutButton } from "../Auth/LogoutButton";
import { useAuth } from '@/app/hooks/useAuth';

export function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    return (
        <>
            <div 
                className="flex items-center gap-4 bg-gray rounded-full p-2 cursor-pointer h-[48px] hover:bg-gray/80 transition-colors"
                onClick={() => user ? router.push('/profil') : setIsModalOpen(true)}
            >
                <Image
                    src={user?.photoURL || '/icons/Profile_pic.svg'}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full object-contain"
                />
                {user && (
                    <span className="text-sm text-gray-700">
                        {user.displayName}
                    </span>
                )}
            </div>
            {user && <LogoutButton />}

            <AuthModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}