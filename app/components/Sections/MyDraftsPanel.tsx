'use client'

import { useEffect, useState } from 'react';
import ArticleOthers from '@/app/components/ArticleOthers';
import { getColorCircle } from '@/app/utils/categories';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { useAuth } from '@/app/hooks/useAuth';
import { formatDate } from '@/app/utils/formatDate';
import Link from 'next/link';

interface Article {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    authorName: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function MyDraftsPanel() {
    const { user } = useAuth();
    const [drafts, setDrafts] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDrafts = async () => {
            if (!user?.uid) return;

            // Utiliser une approche en deux étapes pour éviter l'erreur d'index manquant
            const draftsQuery = query(
                collection(db, 'articles'),
                where('authorId', '==', user.uid),
                where('isDraft', '==', true)
                // Nous allons trier les résultats en mémoire plutôt qu'avec orderBy
                // pour éviter l'erreur d'index composite
            );

            const querySnapshot = await getDocs(draftsQuery);
            let draftsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                
                // Gérer les différents formats de date possibles
                let createdAtDate, updatedAtDate;
                
                // Traitement de createdAt
                if (data.createdAt) {
                    if (data.createdAt.toDate && typeof data.createdAt.toDate === 'function') {
                        createdAtDate = data.createdAt.toDate();
                    } else if (typeof data.createdAt === 'string') {
                        createdAtDate = new Date(data.createdAt);
                    } else if (data.createdAt instanceof Date) {
                        createdAtDate = data.createdAt;
                    } else {
                        createdAtDate = new Date();
                    }
                } else {
                    createdAtDate = new Date();
                }
                
                // Traitement de updatedAt
                if (data.updatedAt) {
                    if (data.updatedAt.toDate && typeof data.updatedAt.toDate === 'function') {
                        updatedAtDate = data.updatedAt.toDate();
                    } else if (typeof data.updatedAt === 'string') {
                        updatedAtDate = new Date(data.updatedAt);
                    } else if (data.updatedAt instanceof Date) {
                        updatedAtDate = data.updatedAt;
                    } else {
                        updatedAtDate = createdAtDate;
                    }
                } else {
                    updatedAtDate = createdAtDate;
                }
                
                return {
                    id: doc.id,
                    title: data.title || 'Sans titre',
                    imageUrl: data.imageUrl || '/placeholder_view.webp',
                    category: data.category || 'default',
                    authorName: data.authorName || user.displayName || 'Auteur inconnu',
                    createdAt: createdAtDate,
                    updatedAt: updatedAtDate
                };
            });

            // Tri manuel des brouillons par date de mise à jour (du plus récent au plus ancien)
            draftsData = draftsData.sort((a, b) => {
                return b.updatedAt.getTime() - a.updatedAt.getTime();
            });
            
            setDrafts(draftsData);
            setLoading(false);
        };

        fetchDrafts();
    }, [user?.uid, user?.displayName]);

    if (loading) {
        return <div className="mt-8 text-center">Chargement de vos brouillons...</div>;
    }

    return (
        <section className="mt-8">
            <h2 className="font-bold font-neulisalt text-[1rem] mb-6 dark:text-[#EECECE]">Mes Brouillons</h2>
            
            {drafts.length === 0 ? (
                <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 dark:text-[#EECECE] rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">Vous n&apos;avez pas encore de brouillons.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drafts.map(draft => (
                        <Link href={`/edit-article/${draft.id}`} key={draft.id}>
                            <ArticleOthers
                                id={draft.id}
                                title={draft.title}
                                author={draft.authorName}
                                date={formatDate(draft.updatedAt)}
                                imageUrl={draft.imageUrl}
                                name={draft.category}
                                className={`tag-${draft.category.toLowerCase()}`}
                                colorCircle={getColorCircle(draft.category)}
                                disableNavigation={true}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
