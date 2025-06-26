'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArticleFull from '../components/ArticleFull';
import { db } from '../lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

interface FirestoreArticle {
    id: number;
    title: string;
    authorName: string;
    category: string;
    content: string;
    imageUrl: string;
    createdAt: Timestamp;
}

interface Article {
    id: string;
    title: string;
    authorName: string;
    category: string;
    content: string;
    imageUrl: string;
    createdAt: string;
}

export default function ArticlePage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchArticle() {
            setIsLoading(true);
            if (id) {                
                const articleRef = doc(db, 'articles', id);
                const articleSnap = await getDoc(articleRef);
                
                if (articleSnap.exists()) {
                    const articleData = articleSnap.data() as FirestoreArticle;
                    setArticle({
                        id: articleSnap.id,
                        title: articleData.title,
                        authorName: articleData.authorName,
                        category: articleData.category,
                        content: articleData.content,
                        imageUrl: articleData.imageUrl,
                        createdAt: new Date(articleData.createdAt.seconds * 1000).toLocaleDateString('fr-FR')
                    });
                }
            }
            setIsLoading(false);
        }

        fetchArticle();
    }, [id]);

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
        return (
            <main className="min-h-screen py-24">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
                    <p>{`L'article que vous recherchez n'existe pas ou a été supprimé.`}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-24">
            <ArticleFull
                id={article.id}
                category={article.category}
                title={article.title}
                authorName={article.authorName}
                date={article.createdAt}
                imageUrl={article.imageUrl}
                content={article.content}
            />
        </main>
    );
}