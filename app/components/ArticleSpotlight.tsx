'use client'

import Image from "next/image";
import TagNavigationArticles from "./TagNavigationArticles";
import { useAuth } from '../hooks/useAuth';
import { ArticleProps } from '../types/articleProps';

export default function Article({ id, colorCircle, name, className, author, title, date, imageUrl }: ArticleProps) {
    const { user } = useAuth();

    const handleArticleClick = () => {
        window.location.href = `/article?id=${id}${!user ? '&auth=true' : ''}`;
    };

    return (
        <>
            <article className="flex flex-col md:flex-row gap-4 cursor-pointer" onClick={handleArticleClick}>
                <div className="flex flex-col md:w-1/2">
                    <TagNavigationArticles
                        colorCircle={colorCircle}
                        name={name}
                        className={className}
                        variant="article"
                    />
                    <p className="mt-2 font-semibold text-[1rem] font-neulisalt dark:text-gray-300">{author} - {date}</p>
                    <h3 className="font-bold font-fractul text-5xl line-clamp-3 tracking-[0.03em] leading-[110%] hover:text-primary transition-colors dark:text-white dark:hover:text-primary">{title}</h3>
                </div>
                <div className="relative w-full md:w-1/2 aspect-[16/9]">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            </article>
        </>
    )
}