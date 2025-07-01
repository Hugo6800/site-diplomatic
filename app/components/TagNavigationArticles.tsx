'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface TagNavigationProps {
    colorCircle: string;
    name: string;
    className: string;
    onClick?: () => void;
}

export default function TagNavigationArticles({
    colorCircle,
    name,
    className,
    onClick
}: TagNavigationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlTag = searchParams.get('tag');
    const category = className.match(/tag-([^\s]+)/)?.[1] || '';
    const baseColor = `tag-${category}`;
    const isSelected = pathname.startsWith('/collections') && urlTag === name.toLowerCase();

    return (
        <li className="flex">
            <Link 
                href={`/collections?tag=${name.toLowerCase()}`}
                onClick={onClick}
                className={`
                    group
                    inline-flex items-center gap-2 pl-2 pr-4 py-1 rounded-full
                    text-${baseColor} ${!isSelected ? `border-2 border-${baseColor}` : ''}
                    text-sm
                    transition-transform
                    ${!isSelected ? 'hover:border' : ''}
                    ${isSelected ? `bg-background-tag-${category}` : ''}
                `}>
                <div className={`w-4 h-4 rounded-full ${colorCircle}`}></div>
                <p className="font-bold group-hover:font-normal group-active:font-black transition-all">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            </Link>
        </li>
    )
}