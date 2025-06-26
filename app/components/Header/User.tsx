'use client'

import { useState } from 'react';
import Image from "next/image";
import AuthModal from "../Auth/AuthModal";

export default function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                {/* <Image
                    src="/Logo_user.png"
                    alt="User"
                    width={40}
                    height={40}
                />
                <p className="font-bold">S4W6 Design</p> */}
            </div>

            <AuthModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}