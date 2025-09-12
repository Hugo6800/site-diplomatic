'use client'

import { useAuth } from '../hooks/useAuth';
import Image from 'next/image';
import TagArticle from './TagArticle';
import { ArticleProps } from '../types/articleProps';

interface ExtendedArticleProps extends ArticleProps {
    disableNavigation?: boolean;
    paywall?: boolean;
    status?: "published" | "waiting";
}

export default function Article({ id, name, className, author, title, date, imageUrl, disableNavigation = false, status }: ExtendedArticleProps) {
    const { user } = useAuth();

    const handleArticleClick = () => {
        if (!disableNavigation) {
            window.location.href = `/article?id=${id}${!user ? '&auth=true' : ''}`;
        }
    };

    return (
        <>
            <article className="flex flex-col cursor-pointer hover:bg-[#F3DEDE] hover:dark:bg-[#433D3D] transition-all duration-300 ease-in-out rounded-3xl px-1 pt-1 pb-4" onClick={handleArticleClick}>
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
                <div className="flex items-center justify-between gap-2">
                    <TagArticle
                        name={name}
                        className={className}
                    />
                    {status && (
                        <div className={`px-2 py-1 rounded-full font-semibold tracking-wide ${
                            status === 'published' 
                                ? 'bg-[#9AF2A3] text-[#323232]' 
                                : 'bg-[#A7A7A7] text-[#323232]'
                            }`}>
                            {status === 'published' ? 'Publié' : 'Brouillon'}
                        </div>
                    )}
                </div>
                <p className="mt-2 font-semibold text-[1rem] font-neulisalt dark:text-[#C5B0B0]">{author} - {date}</p>
                <h3 className="font-bold font-fractul text-2xl line-clamp-3 tracking-[0.03em] leading-[110%] dark:text-[#F4DFDF]">{title}</h3>
            </article>
        </>
    );
}