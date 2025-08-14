'use client'

import ArticleOthers from "../ArticleOthers";
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { SpotlightArticle } from '../../types/spotlightArticle';
import Advertising from '../Advertising';
import { formatDate } from '../../utils/formatDate';

export default function LastArticlesSection() {
    const [articles, setArticles] = useState<SpotlightArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRecentArticles() {
            setIsLoading(true);
            const articlesRef = collection(db, 'articles');
            // Récupérer tous les articles
            const q = query(articlesRef);
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Convertir les données Firestore en objets articles
                const allArticles = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    // Log pour déboguer les données des articles
                    console.log(`Article ${doc.id}:`, {
                        title: data.title,
                        createdAt: data.createdAt,
                        status: data.status || 'published',
                        timestamp: data.createdAt ? new Date(data.createdAt.seconds * 1000) : 'Pas de timestamp'
                    });
                    return {
                        id: doc.id,
                        title: data.title,
                        authorName: data.authorName,
                        category: data.category,
                        imageUrl: data.imageUrl,
                        createdAt: data.createdAt,
                        status: data.status || 'published', // Utiliser 'published' comme valeur par défaut
                        isDraft: data.isDraft || false
                    };
                });
                
                // Filtrer pour n'afficher que les articles publiés (status = published et isDraft = false)
                const publishedArticles = allArticles.filter(article => 
                    article.status === 'published' && article.isDraft === false
                );
                
                // Trier les articles par date (du plus récent au plus ancien)
                const sortedArticles = publishedArticles.sort((a, b) => {
                    return b.createdAt.seconds - a.createdAt.seconds;
                });
                
                // Limiter à 6 articles maximum
                setArticles(sortedArticles.slice(0, 6));
            }
            setIsLoading(false);
        }

        fetchRecentArticles();
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
                        colorCircle={`bg-tag-${article.category?.toLowerCase() || 'default'}`}
                        name={article.category || 'Non catégorisé'}
                        className={`text-tag-${article.category?.toLowerCase() || 'default'} border-2 border-tag-${article.category?.toLowerCase() || 'default'} transition-colors`}
                        author={article.authorName}
                        title={article.title}
                        date={formatDate(new Date(article.createdAt.seconds * 1000))}
                        imageUrl={article.imageUrl}
                    />
                ))}
            </div>
            <Advertising className="mt-6"/>
        </section >
    )
}