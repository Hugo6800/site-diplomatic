'use client'

import { useEffect, useState } from 'react';
import ArticleOthers from '@/app/components/ArticleOthers';
import { getColorCircle } from '@/app/utils/categories';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { useAuth } from '@/app/hooks/useAuth';
import { formatDate } from '@/app/utils/formatDate';

interface Article {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    authorName: string;
    createdAt: Date;
}

export default function MyArticlesPanel() {
    const { user } = useAuth();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            if (!user?.displayName) return;

            const articlesQuery = query(
                collection(db, 'articles'),
                where('authorName', '==', user.displayName),
                orderBy('createdAt', 'desc')
            );

            const querySnapshot = await getDocs(articlesQuery);
            const articlesData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.title,
                    imageUrl: data.imageUrl,
                    category: data.category,
                    authorName: data.authorName,
                    createdAt: data.createdAt.toDate()
                };
            });

            setArticles(articlesData);
            setLoading(false);
        };

        fetchArticles();
    }, [user?.displayName]);

    if (loading) {
        return <div className="mt-8 text-center">Chargement de vos articles...</div>;
    }

    return (
        <section className="mt-8">
            <h2 className="font-bold font-neulisalt text-[1rem] mb-6">Mes Articles</h2>
            {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map(article => (
                        <ArticleOthers
                            key={article.id}
                            id={article.id}
                            name={article.category}
                            className={`tag-${article.category.toLowerCase()}`}
                            colorCircle={getColorCircle(article.category)}
                            author={article.authorName}
                            title={article.title}
                            date={formatDate(article.createdAt)}
                            imageUrl={article.imageUrl}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    Vous n&apos;avez pas encore écrit d&apos;articles.
                </div>
            )}
        </section>
    );
}
