'use client'

import Image from "next/image";
import TagArticle from "./TagArticle";
import { useAuth } from '../hooks/useAuth';
import { ArticleProps } from '../types/articleProps';

export default function Article({ id, name, className, author, title, date, imageUrl }: ArticleProps) {
    const { user } = useAuth();

    const handleArticleClick = () => {
        window.location.href = `/article?id=${id}${!user ? '&auth=true' : ''}`;
    };

    return (
        <>
            <article className="flex flex-col md:flex-row gap-4 cursor-pointer group" onClick={handleArticleClick}>
                <div className="flex flex-col md:w-1/2">
                    <TagArticle
                        name={name}
                        className={className}
                    />
                    <p className="mt-2 font-semibold text-[1rem] font-neulisalt dark:text-gray-300">{author} - {date}</p>
                    <h3 className="font-bold font-fractul text-5xl hover:font-black line-clamp-3 tracking-[0.03em] leading-[110%] dark:text-white">{title}</h3>
                </div>
                <div className="relative w-full md:w-1/2 aspect-[16/9]">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover rounded-[20px] group-hover:rounded-4xl transition-all"
                    />
                </div>
            </article>
        </>
    )
}