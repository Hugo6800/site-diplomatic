'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserReadHistory } from '../../hooks/readings';
import Article from '../ArticleOthers';

import { ArticleData } from '../../hooks/readings';

export default function HistoryReadSection() {
    const { user } = useAuth();
    const [readArticles, setReadArticles] = useState<ArticleData[]>([]);

    useEffect(() => {
        const fetchReadArticles = async () => {
            if (!user) return;

            try {
                console.log('Fetching read history for user:', user.uid);
                const articles = await getUserReadHistory(user.uid);
                console.log('Fetched articles:', articles);
                
                setReadArticles(articles);

            } catch (error) {
                console.error('Error fetching read history:', error);
            }
        };

        fetchReadArticles();
    }, [user]);

    console.log('Current state - User:', user?.uid, 'Articles:', readArticles);

    if (!user) {
        console.log('No user logged in');
        return null;
    }

    const getColorCircle = (category: string): string => {
        switch (category.toLowerCase()) {
            case 'politique':
                return 'bg-tag-politic';
            case 'international':
                return 'bg-tag-international';
            case 'societe':
                return 'bg-tag-societe';
            case 'culture':
                return 'bg-tag-culture';
            default:
                return 'bg-tag-all';
        }
    };

    return (
        <section className="mt-12">
            <h2 className="font-bold italic font-neulisalt text-[2rem] mb-4">Histoire de lecture</h2>
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