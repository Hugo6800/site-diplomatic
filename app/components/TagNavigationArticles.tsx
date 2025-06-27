'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { TagNavigationArticlesProps } from '@/app/types/tag-navigation-articles';

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
                    group
                    inline-flex items-center gap-2 pl-2 pr-4 py-1 rounded-full
                    ${variantStyles.container}
                    ${variantStyles.text}
                    transition-transform hover:border active:border-[3px]
                `}>
                <div className={`w-4 h-4 rounded-full ${colorCircle}`}></div>
                <p className="font-bold group-hover:font-normal group-active:font-black transition-all">{name}</p>
            </Link>
        </li>
    )
}