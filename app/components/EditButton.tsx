'use client'

import Image from "next/image";

interface EditButtonProps {
    icon: string;
    alt: string;
    className?: string;
    onClick?: () => void;
}

export default function EditButton({ icon, alt, className, onClick }: EditButtonProps) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center justify-center h-full px-6 bg-gray ${className} cursor-pointer hover:bg-gray/80 transition-colors`}
        >
            <Image
                src={`icons/${icon}.svg`}
                alt={alt}
                width={40}
                height={40}
            />
        </button>
    )
}