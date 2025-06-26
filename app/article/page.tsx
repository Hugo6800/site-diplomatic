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

    useEffect(() => {
        async function fetchArticle() {
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
                } else {
                    console.log("Article non trouvé");
                }
            }
        }

        fetchArticle();
    }, [id]);

    if (!article) {
        return <div>Article non trouvé</div>;
    }

    return (
        <main className="min-h-screen py-12">
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