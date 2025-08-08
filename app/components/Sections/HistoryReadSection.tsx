'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserReadHistory } from '@/app/hooks/readings';
import { getColorCircle } from '@/app/utils/category-styles';
import Article from '../ArticleOthers';

import { ArticleData } from '../../hooks/readings';

export default function HistoryReadSection() {
    const { user } = useAuth();
    const [readArticles, setReadArticles] = useState<ArticleData[]>([]);

    useEffect(() => {
        const fetchReadArticles = async () => {
            if (!user) return;

            try {
                const articles = await getUserReadHistory(user.uid);
                
                setReadArticles(articles);

            } catch (error) {
                console.error('Error fetching read history:', error);
            }
        };

        fetchReadArticles();
    }, [user]);

    if (!user) {
        return null;
    }



    return (
        <section className="mt-12">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Histoire de lecture</h2>
            {readArticles.length === 0 ? (
                <div className="py-8 text-gray-500 font-neulisalt text-lg">
                    Pas d&apos;articles lus
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {readArticles.map((article) => (
                        <Article
                        key={article.id}
                        id={article.id}
                        name={article.category}
                        className={`tag-${article.category.toLowerCase()}`}
                        colorCircle={getColorCircle(article.category)}
                        author={article.author}
                        title={article.title}
                        date={article.date}
                        imageUrl={article.coverImage}
                    />
                    ))}
                </div>
            )}
        </section>
    );
}