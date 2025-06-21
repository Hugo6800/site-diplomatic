'use client';

import { useSearchParams } from 'next/navigation';
import { articles } from '@/app/utils/articles';
import ArticleOthers from '@/app/components/ArticleOthers';

export default function CollectionsPage() {
    const searchParams = useSearchParams();
    const tag = searchParams.get('tag');
    
    const formattedTag = tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : '';

    return (
        <main className="px-6 md:px-24 xl:px-36 mt-48 mb-20">
            <h2 className="font-bold text-[2rem] mb-8">{formattedTag}</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map(article => (
                    <ArticleOthers
                        key={article.id}
                        colorCircle={`bg-tag-${article.category.toLowerCase()}`}
                        name={article.category}
                        className={`bg-background-tag-${article.category.toLowerCase()}`}
                        author={article.author}
                        title={article.title}
                        date={article.date}
                        coverImage={article.coverImage}
                    />
                ))}
            </section>
        </main>
    );
}