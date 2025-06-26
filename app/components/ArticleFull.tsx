'use client'

import Image from 'next/image';
import TagNavigationArticles from './TagNavigationArticles';

interface ArticleFullProps {
    id: string;
    category: string;
    title: string;
    authorName: string;
    date: string;
    imageUrl: string;
    content: string;
}

export default function ArticleFull({ category, title, authorName, date, imageUrl, content }: ArticleFullProps) {
    return (
        <article className="max-w-5xl mx-auto px-4">
            {/* En-tête de l'article */}
            <header className="mb-8">
                <TagNavigationArticles
                    name={category}
                    colorCircle={`bg-tag-${category.toLowerCase()}`}
                    className={`text-tag-${category.toLowerCase()} border-2 border-tag-${category.toLowerCase()} transition-colors`}
                />
                <h1 className="font-bold font-fractul text-6xl mt-6 mb-4 tracking-[0.03em] leading-[110%]">
                    {title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                    <span className="font-medium">{authorName}</span>
                    <span>•</span>
                    <time>{date}</time>
                </div>
            </header>

            {/* Image principale */}
            <div className="relative w-full aspect-[16/9] mb-8">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                />
            </div>

            {/* Contenu de l'article */}
            <div className="prose prose-lg max-w-none">
                {content}
            </div>
        </article>
    );
}
