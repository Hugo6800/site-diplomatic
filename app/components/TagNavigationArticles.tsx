'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface TagNavigationArticlesProps {
    colorCircle: string;
    name: string;
    className: string;
    variant?: 'menu' | 'article';
    onClick?: () => void;
}

export default function TagNavigationArticles({
    colorCircle,
    name,
    className,
    variant: defaultVariant = 'menu',
    onClick
}: TagNavigationArticlesProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlTag = searchParams.get('tag');
    const category = className.match(/tag-([^\s]+)/)?.[1] || '';
    const baseColor = `tag-${category}`;

    // Use article variant if we're on collections page and this tag is selected
    const isSelected = pathname.startsWith('/collections') && urlTag === name.toLowerCase();
    const variant = isSelected ? 'article' : defaultVariant;

    const variantStyles = variant === 'menu' ? {
        container: `text-${baseColor} border-2 border-${baseColor}`,
        text: 'text-sm'
    } : {
        container: `bg-background-tag-${category} text-${baseColor}`,
        text: 'text-sm'
    }

    return (
        <li className="flex">
            <Link 
                href={`/collections?tag=${name.toLowerCase()}`}
                onClick={onClick}
                className={`
                    inline-flex items-center gap-2 pl-2 pr-4 py-1 rounded-full
                    ${variantStyles.container}
                    ${variantStyles.text}
                    transition-transform hover:scale-105
                `}>
                <div className={`w-4 h-4 rounded-full ${colorCircle}`}></div>
                <p className="font-bold">{name}</p>
            </Link>
        </li>
    )
}