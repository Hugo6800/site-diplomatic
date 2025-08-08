'use client'

import ArticleOthers from "../ArticleOthers";
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { SpotlightArticle } from '../../types/spotlightArticle';
import Advertising from '../Advertising';

export default function LastArticlesSection() {
    const [articles, setArticles] = useState<SpotlightArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSpotlightArticles() {
            setIsLoading(true);
            const articlesRef = collection(db, 'articles');
            const q = query(articlesRef, where('noPaywall', '==', true));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const noPaywallArticles = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title,
                        authorName: data.authorName,
                        category: data.category,
                        imageUrl: data.imageUrl,
                        createdAt: data.createdAt
                    };
                });
                setArticles(noPaywallArticles);
            }
            setIsLoading(false);
        }

        fetchSpotlightArticles();
    }, []);

    if (isLoading) {
        return (
            <main className="min-h-screen py-24">
                <div className="mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 w-32 bg-gray-200 mb-4 rounded"></div>
                        <div className="h-12 w-3/4 bg-gray-200 mb-8 rounded"></div>
                        <div className="h-96 w-full bg-gray-200 rounded"></div>
                    </div>
                </div>
            </main>
        );
    }

    if (articles.length === 0) {
        return null;
    }

    return (
        <section className="flex flex-col gap-4 mt-28 mb-20">
            <h2 className="font-bold font-neulisalt italic text-[1rem]  bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 mb-4 dark:text-white w-fit">Derniers articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map(article => (
                    <ArticleOthers
                        key={article.id}
                        id={article.id}
                        colorCircle={`bg-tag-${article.category.toLowerCase()}`}
                        name={article.category}
                        className={`text-tag-${article.category.toLowerCase()} border-2 border-tag-${article.category.toLowerCase()} transition-colors`}
                        author={article.authorName}
                        title={article.title}
                        date={new Date(article.createdAt.seconds * 1000).toLocaleDateString('fr-FR')}
                        imageUrl={article.imageUrl}
                    />
                ))}
            </div>
            <Advertising className="mt-6"/>
        </section >
    )
}