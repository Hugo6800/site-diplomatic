'use client'

import { useAuth } from '../hooks/useAuth';
import Image from 'next/image';
import TagArticle from './TagArticle';
import { ArticleProps } from '../types/articleProps';
// Suppression de l'import non utilisé

interface ExtendedArticleProps extends ArticleProps {
    showDraftIndicator?: boolean;
    disableNavigation?: boolean;
    // Pas besoin de colorCircle car il est déjà dans ArticleProps ou géré par TagArticle
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
            <article className="flex flex-col group" onClick={handleArticleClick}>
                <div className="relative w-full h-[200px] mb-4">
                    <Image
                        src={imageUrl}
                        alt="Image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
                        className="object-cover cursor-pointer rounded-[20px] group-hover:rounded-4xl transition-all"
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
                <h3 className="font-bold font-fractul text-2xl line-clamp-3 tracking-[0.03em] leading-[110%] cursor-pointer group-hover:font-black">{title}</h3>
            </article>
        </>
    );
}