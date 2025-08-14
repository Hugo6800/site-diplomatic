'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import ArticleOthers from '@/app/components/ArticleOthers';
import { tagToClass } from '@/app/utils/tagMapping';
import { SpotlightArticle } from '@/app/types/spotlightArticle';
import Advertising from '../components/Advertising';
import { formatDate } from '@/app/utils/formatDate';

export default function CollectionsPage() {
    const searchParams = useSearchParams();
    const tag = searchParams.get('tag') || '';
    const tagLower = tag.toLowerCase();
    const cssTag = tagToClass[tagLower] || tagLower;
    const colorCircle = `bg-tag-${cssTag}`;
    const titleColor = `text-tag-${cssTag}`;
    const formattedTag = tag ? tag.charAt(0).toUpperCase() + tag.slice(1) : '';

    const [articles, setArticles] = useState<SpotlightArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const articlesRef = collection(db, 'articles');
                const q = tag
                    ? query(articlesRef, where('category', '==', tagLower))
                    : query(articlesRef);

                const querySnapshot = await getDocs(q);
                const fetchedArticles = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    category: doc.data().category,
                    authorName: doc.data().authorName,
                    imageUrl: doc.data().imageUrl,
                    createdAt: doc.data().createdAt
                }));

                // Trier les articles par date
                const sortedArticles = fetchedArticles.sort((a, b) =>
                    b.createdAt.seconds - a.createdAt.seconds
                );

                setArticles(sortedArticles);
            } catch (error) {
                console.error('Erreur lors de la récupération des articles:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, [tag, tagLower]);

    if (loading) {
        return (
            <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
                <div className="text-center py-12">
                    <p className="text-xl font-neulisalt text-gray-600">Chargement des articles...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
            <div className="flex items-center gap-2 mb-8">
                <div className={`w-4 h-4 rounded-full ${colorCircle}`}></div>
                <h2 className={`font-bold font-fractul text-[2rem] ${titleColor}`}>{formattedTag}</h2>
            </div>
            <Advertising className="mb-8" />
            <h2 className="font-bold font-neulisalt italic text-[1rem]  bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 mb-4 dark:text-white w-fit">Derniers articles</h2>
            {articles.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map(article => (
                        <ArticleOthers
                            key={article.id}
                            id={article.id}
                            colorCircle={`bg-tag-${article.category.toLowerCase()}`}
                            name={article.category}
                            className={`bg-background-tag-${article.category.toLowerCase()}`}
                            author={article.authorName}
                            title={article.title}
                            date={formatDate(new Date(article.createdAt.seconds * 1000))}
                            imageUrl={article.imageUrl}
                        />
                    ))}
                </section>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl font-neulisalt text-gray-600">Pas encore d&apos;article dans cette collection</p>
                </div>
            )}
        </main>
    );
}