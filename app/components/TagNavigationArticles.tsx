'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { getTagStyles } from '../utils/tag-styles';

interface TagNavigationProps {
    name: string;
    className: string;
    onClick?: () => void;
}

export default function TagNavigationArticles({
    name,
    className,
    onClick
}: TagNavigationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlTag = searchParams.get('tag');
    const category = className.match(/tag-([^\s]+)/)?.[1] || '';
    const tagStyles = getTagStyles(category);
    const isSelected = pathname.startsWith('/collections') && urlTag === name.toLowerCase();

    return (
        <li className="flex">
            <Link 
                href={`/collections?tag=${name.toLowerCase()}`}
                onClick={onClick}
                className={`
                    group
                    inline-flex items-center gap-2 pl-2 pr-4 py-1 rounded-full
                    ${tagStyles.text}
                    ${!isSelected ? `border-[3px] border-current` : ''}
                    text-sm
                    transition-all duration-200
                    ${!isSelected ? 'hover:border-[1px]' : ''}
                    ${isSelected ? tagStyles.bg : ''}
                `}>
                <div className={`w-4 h-4 rounded-full ${tagStyles.circle} transition-colors duration-200`}></div>
                <p className="font-bold group-hover:font-normal group-active:font-black transition-all">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            </Link>
        </li>
    )
}