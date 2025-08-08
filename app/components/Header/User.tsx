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
                className="flex items-center gap-4 bg-gray rounded-3xl p-2 cursor-pointer hover:bg-gray/80 transition-colors"
                onClick={() => user ? router.push('/profil') : setIsModalOpen(true)}
            >
                <Image
                    src={user?.photoURL || '/icons/account_circle.svg'}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full object-contain w-10 h-10"
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