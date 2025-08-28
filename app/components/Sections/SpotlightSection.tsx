'use client'

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import ArticleSpotlight from '../ArticleSpotlight';
import { SpotlightArticle } from '../../types/spotlightArticle';
import Advertising from '../Advertising';
import { formatDate } from '../../utils/formatDate';

export default function SpotlightSection() {
    const [article, setArticle] = useState<SpotlightArticle | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSpotlightArticle() {
            setIsLoading(true);
            const articlesRef = collection(db, 'articles');
            // Requête pour obtenir l'article le plus récent
            const q = query(
                articlesRef,
                orderBy('createdAt', 'desc'),
                limit(1)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Filtrer pour exclure les articles avec le statut "waiting"
                const publishedDocs = querySnapshot.docs.filter(doc => {
                    const data = doc.data();
                    const status = data.status || 'published'; // Default to published if not specified
                    return status !== 'waiting';
                });
                
                if (publishedDocs.length > 0) {
                    // Prendre le premier article publié (le plus récent)
                    const recentDoc = publishedDocs[0];
                    const data = recentDoc.data();
                    setArticle({
                        id: recentDoc.id, // Utiliser l'ID du document Firestore
                        title: data.title,
                        authorName: data.authorName,
                        category: data.category,
                        imageUrl: data.imageUrl,
                        createdAt: data.createdAt
                    });
                }
            }
            setIsLoading(false);
        }

        fetchSpotlightArticle();
    }, []);

    if (isLoading) {
        return (
            <main className="min-h-screen py-24">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 w-32 bg-gray-200 mb-4 rounded"></div>
                        <div className="h-12 w-3/4 bg-gray-200 mb-8 rounded"></div>
                        <div className="h-96 w-full bg-gray-200 rounded"></div>
                    </div>
                </div>
            </main>
        );
    }

    if (!article) {
        return null;
    }

    return (
        <>
            <div className="hidden xl:block fixed top-24 left-8 z-10 w-[170px] mt-24">
                <Advertising className="h-[350px]" />
            </div>
            <section className="relative pt-12 lg:pt-24 mt-16 w-full">
                <div className="mt-12">
                    <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">À la une</h2>
                    <ArticleSpotlight
                        id={article.id}
                        colorCircle={`bg-tag-${article.category.toLowerCase()}`}
                        name={article.category}
                        className={`text-tag-${article.category.toLowerCase()} border-2 border-tag-${article.category.toLowerCase()} transition-colors`}
                        title={article.title}
                        author={article.authorName}
                        date={formatDate(new Date(article.createdAt.seconds * 1000))}
                        imageUrl={article.imageUrl}
                    />
                </div>
            </section>
        </>
    );
}