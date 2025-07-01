'use client'

import { useAuth } from '../hooks/useAuth';
import Image from 'next/image';
import TagArticle from './TagArticle';
import { ArticleProps } from '../types/articleProps';

export default function Article({ id, name, className, author, title, date, imageUrl }: ArticleProps) {
    const { user } = useAuth();

    const handleArticleClick = () => {
        window.location.href = `/article?id=${id}${!user ? '&auth=true' : ''}`;
    };

    return (
        <>
            <article className="flex flex-col group" onClick={handleArticleClick}>
                <Image
                    src={imageUrl}
                    alt="Image"
                    width={800}
                    height={400}
                    quality={100}
                    className="w-full h-auto mb-4 object-cover cursor-pointer rounded-[20px] group-hover:rounded-4xl transition-all"
                />
                <TagArticle
                    name={name}
                    className={className}
                />
                <p className="mt-2 font-semibold text-[1rem] font-neulisalt">{author} - {date}</p>
                <h3 className="font-bold font-fractul text-2xl line-clamp-3 tracking-[0.03em] leading-[110%] cursor-pointer group-hover:font-black">{title}</h3>
            </article>
        </>
    );
}