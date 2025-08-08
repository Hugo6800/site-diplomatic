'use client'

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { useAuth } from '@/app/hooks/useAuth';
import Article from '@/app/components/ArticleOthers';
import { formatDate } from '@/app/utils/formatDate';
import { getColorCircle } from '@/app/utils/category-styles';

interface Article {
    id: string;
    name: string;
    className: string;
    colorCircle: string;
    author: string;
    title: string;
    date: string;
    imageUrl: string;
}

export default function ArticlesWriting() {
    const { user } = useAuth();
    const [articles, setArticles] = useState<Article[]>([]);

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
                    name: data.category,
                    className: `tag-${data.category.toLowerCase()}`,
                    colorCircle: getColorCircle(data.category),
                    author: data.authorName,
                    title: data.title,
                    date: formatDate(data.createdAt.toDate()),
                    imageUrl: data.imageUrl
                };
            });

            setArticles(articlesData);
        };

        if (user?.role === 'journalist') {
            fetchArticles();
        }
    }, [user]);

    if (user?.role !== 'journalist') return null;



    return (
        <section className="mt-12">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Articles écrits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <Article
                        key={article.id}
                        id={article.id}
                        name={article.name}
                        className={article.className}
                        colorCircle={article.colorCircle}
                        author={article.author}
                        title={article.title}
                        date={article.date}
                        imageUrl={article.imageUrl}
                    />
                ))}
            </div>
            {articles.length === 0 && (
                <p className="text-center text-gray-500 mt-4">Aucun article écrit pour le moment</p>
            )}
        </section>
    );
}