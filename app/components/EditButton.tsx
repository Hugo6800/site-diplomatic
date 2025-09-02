'use client'

import Image from "next/image";

interface EditButtonProps {
    icon: string;
    darkIcon?: string;
    alt: string;
    className?: string;
    onClick?: () => void;
}

export default function EditButton({ icon, darkIcon, alt, className, onClick }: EditButtonProps) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center justify-center h-full px-6 bg-[#F3DEDE] dark:bg-[#433D3D] ${className} cursor-pointer hover:bg-gray/80 transition-colors`}
        >
            {darkIcon ? (
                <>
                    <Image
                        src={`icons/${icon}.svg`}
                        alt={alt}
                        width={40}
                        height={40}
                        className="block dark:hidden"
                    />
                    <Image
                        src={`icons/dark_collection/${darkIcon}.svg`}
                        alt={alt}
                        width={40}
                        height={40}
                        className="hidden dark:block"
                    />
                </>
            ) : (
                <Image
                    src={`icons/${icon}.svg`}
                    alt={alt}
                    width={40}
                    height={40}
                />
            )}
        </button>
    )
}