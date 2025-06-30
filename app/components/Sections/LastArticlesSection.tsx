'use client'

import ArticleOthers from "../ArticleOthers";
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { SpotlightArticle } from '../../types/spotlightArticle';

export default function LastArticlesSection() {
    const [articles, setArticles] = useState<SpotlightArticle[]>([]);

    useEffect(() => {
        async function fetchSpotlightArticles() {
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
        }

        fetchSpotlightArticles();
    }, []);

    if (articles.length === 0) {
        return null;
    }

    return (
        <section className="flex flex-col gap-4 mt-28 mb-20">
            <h2 className="font-bold font-neulisalt text-[2rem]">Derniers articles</h2>
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
        </section >
    )
}