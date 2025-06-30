'use client'

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import ArticleSpotlight from '../ArticleSpotlight';
import { SpotlightArticle } from '../../types/spotlightArticle';

export default function SpotlightSection() {
    const [article, setArticle] = useState<SpotlightArticle | null>(null);

    useEffect(() => {
        async function fetchSpotlightArticle() {
            const articlesRef = collection(db, 'articles');
            const q = query(articlesRef, where('hasPaywall', '==', false));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Prendre l'article sans paywall
                const noPaywallDoc = querySnapshot.docs.find(doc => !doc.data().hasPaywall);
                if (noPaywallDoc) {
                    const data = noPaywallDoc.data();
                    setArticle({
                        id: noPaywallDoc.id, // Utiliser l'ID du document Firestore
                        title: data.title,
                        authorName: data.authorName,
                        category: data.category,
                        imageUrl: data.imageUrl,
                        createdAt: data.createdAt
                    });
                }
            }
        }

        fetchSpotlightArticle();
    }, []);

    if (!article) {
        return null;
    }

    return (
        <section className="pt-24 mt-16">
            <div className="container mt-12">
                <h2 className="font-bold font-neulisalt text-[2rem] mb-4 dark:text-white">À la une</h2>
                <ArticleSpotlight
                    id={article.id}
                    colorCircle={`bg-tag-${article.category.toLowerCase()}`}
                    name={article.category}
                    className={`text-tag-${article.category.toLowerCase()} border-2 border-tag-${article.category.toLowerCase()} transition-colors`}
                    title={article.title}
                    author={article.authorName}
                    date={new Date(article.createdAt.seconds * 1000).toLocaleDateString('fr-FR')}
                    imageUrl={article.imageUrl}
                />
            </div>
        </section>
    );
}