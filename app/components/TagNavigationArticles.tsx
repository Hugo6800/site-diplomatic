'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { getTagStyles } from '../utils/tag-styles';

interface TagNavigationProps {
    name: string;
    className: string;
    colorCircle: string;
    onClick?: () => void;
}

export default function TagNavigationArticles({
    name,
    className,
    colorCircle,
    onClick
}: TagNavigationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlTag = searchParams.get('tag');
    const category = className.match(/tag-([^\s]+)/)?.[1] || '';
    const tagStyles = getTagStyles(category);
    const isSelected = pathname.startsWith('/collections') && urlTag === name.toLowerCase();

    // Pour le tag "Tous", on veut afficher tous les articles sans filtre
    const href = name.toLowerCase() === 'tous' 
        ? '/collections' 
        : `/collections?tag=${name.toLowerCase()}`;
        
    // Le tag "Tous" est sélectionné si on est sur la page collections sans paramètre tag
    const isTousSelected = name.toLowerCase() === 'tous' && pathname.startsWith('/collections') && !urlTag;
    const isTagSelected = isSelected || isTousSelected;

    return (
        <li className="flex">
            <Link 
                href={href}
                onClick={onClick}
                className={`
                    group
                    inline-flex items-center gap-2 pl-2 pr-4 py-1 rounded-full
                    ${tagStyles.text}
                    ${!isTagSelected ? `border-[3px] border-current` : ''}
                    text-sm
                    transition-all duration-200
                    ${!isTagSelected ? 'hover:border-[1px]' : ''}
                    ${isTagSelected ? tagStyles.bg : ''}
                `}>
                <div className={`w-4 h-4 rounded-full ${colorCircle || tagStyles.circle} transition-colors duration-200`}></div>
                <p className="font-bold group-hover:font-normal group-active:font-black transition-all">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
            </Link>
        </li>
    )
}