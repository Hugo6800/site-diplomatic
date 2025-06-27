'use client'

import { useState } from 'react';
import Image from "next/image";
import AuthModal from "../Auth/AuthModal";
import { LogoutButton } from "../Auth/LogoutButton";
import { useAuth } from '@/app/hooks/useAuth';

export function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    return (
        <>
            <div 
                className="flex items-center gap-4 bg-gray rounded-3xl p-2 cursor-pointer hover:bg-gray/80 transition-colors"
                onClick={() => setIsModalOpen(true)}
            >
                <Image
                    src="icons/account_circle.svg"
                    alt="User"
                    width={40}
                    height={40}
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