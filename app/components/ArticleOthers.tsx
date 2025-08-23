'use client'

import { useAuth } from '../hooks/useAuth';
import Image from 'next/image';
import TagArticle from './TagArticle';
import { ArticleProps } from '../types/articleProps';

interface ExtendedArticleProps extends ArticleProps {
    showDraftIndicator?: boolean;
    disableNavigation?: boolean;
    paywall?: boolean; // Conservé pour compatibilité avec les props passées
}

export default function Article({ id, name, className, author, title, date, imageUrl, showDraftIndicator = false, disableNavigation = false }: ExtendedArticleProps) {
    const { user } = useAuth();

    const handleArticleClick = () => {
        if (!disableNavigation) {
            window.location.href = `/article?id=${id}${!user ? '&auth=true' : ''}`;
        }
    };

    return (
        <>
            <article className="flex flex-col cursor-pointer hover:bg-[#F3DEDE] transition-all duration-300 ease-in-out rounded-3xl px-1 pt-1 pb-4" onClick={handleArticleClick}>
                <div className="relative w-full h-[200px] mb-4">
                    <Image
                        src={imageUrl}
                        alt="Image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
                        className="object-cover rounded-3xl"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <TagArticle
                        name={name}
                        className={className}
                    />
                    {showDraftIndicator && (
                        <div className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                            Brouillon
                        </div>
                    )}
                </div>
                <p className="mt-2 font-semibold text-[1rem] font-neulisalt">{author} - {date}</p>
                <h3 className="font-bold font-fractul text-2xl line-clamp-3 tracking-[0.03em] leading-[110%]">{title}</h3>
            </article>
        </>
    );
}