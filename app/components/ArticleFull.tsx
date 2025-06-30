'use client'

import Image from 'next/image';
import TagNavigationArticles from './TagNavigationArticles';
import { ArticleFullProps } from '../types/articleFullProps';

export default function ArticleFull({ category, title, authorName, date, imageUrl, content }: ArticleFullProps) {
    return (
        <article className="max-w-5xl mx-auto px-4">
            <header className="mb-8">
                <div className="relative w-full aspect-[16/9] mb-8">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover rounded-4xl"
                        priority
                    />
                </div>
            </header>
            <div className="flex items-center gap-4">
                <TagNavigationArticles
                    name={category}
                    colorCircle={`bg-tag-${category.toLowerCase()}`}
                    className={`text-tag-${category.toLowerCase()} border-2 border-tag-${category.toLowerCase()} transition-colors`}
                    variant="article"
                />
                <div className="flex items-center gap-4 text-black font-semibold">
                    <span>{authorName}</span>
                    <span>•</span>
                    <time>{date}</time>
                </div>
            </div>
            <h1 className="font-bold font-fractul text-2xl md:text-4xl mt-6 mb-11 tracking-[0.03em] leading-[110%]">
                {title}
            </h1>

            <div
                className="prose prose-lg max-w-none prose-headings:font-fractul prose-headings:font-bold prose-p:font-neulisalt prose-h2:text-lg lg:prose-h2:text-2xl xl:prose-h2:text-3xl prose-p:text-lg prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </article>
    );
}
