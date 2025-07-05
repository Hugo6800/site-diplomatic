import { db } from '@/app/lib/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';

export interface ReadingProgress {
    actualReadTime: number;
    completionPercentage: number;
    lastPosition: number;
    readAt: Date;
}

export interface ArticleData {
    id: string;
    title: string;
    category: string;
    author: string;
    date: string;
    coverImage: string;
    authorName?: string;
    createdAt?: string;
}

export interface ReadingSession {
    startTime: number;
    lastUpdate: number;
    initialScroll: number;
    articleId: string;
    userId: string;
}

export const initializeReadingSession = async (userId: string, articleId: string): Promise<string | null> => {
    try {
        const readingsRef = collection(db, 'userReadings');
        const q = query(readingsRef, 
            where('userId', '==', userId),
            where('articleId', '==', articleId)
        );
        
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            const docRef = await addDoc(readingsRef, {
                userId,
                articleId,
                readAt: new Date(),
                actualReadTime: 0,
                completionPercentage: 0,
                lastPosition: 0
            });
            return docRef.id;
        }
        return querySnapshot.docs[0].id;
    } catch (error) {
        console.error('Error initializing reading session:', error);
        return null;
    }
};

export const getUserReadHistory = async (userId: string): Promise<ArticleData[]> => {
    try {
        // 1. Récupérer les lectures de l'utilisateur
        const readingsRef = collection(db, 'userReadings');
        const readingsQuery = query(readingsRef, where('userId', '==', userId));
        const readingsSnapshot = await getDocs(readingsQuery);

        if (readingsSnapshot.empty) {
            console.log('No readings found for user:', userId);
            return [];
        }

        // 2. Récupérer les articles correspondants
        const articlesRef = collection(db, 'articles');
        const articlePromises = readingsSnapshot.docs.map(async readingDoc => {
            const articleId = readingDoc.data().articleId.split('/').pop(); // Extraire l'ID de l'article
            if (!articleId) return null;

            const articleDoc = await getDoc(doc(articlesRef, articleId));
            if (!articleDoc.exists()) return null;

            const data = articleDoc.data();
            console.log('Article raw data:', { id: articleDoc.id, ...data });

            // Récupérer l'URL de l'image
            const imageUrl = data.imageUrl;
            console.log('Image URL from Firestore:', imageUrl);

            // Formater la date
            let formattedDate = '';
            if (data.createdAt && typeof data.createdAt === 'object' && 'seconds' in data.createdAt) {
                const date = new Date(data.createdAt.seconds * 1000);
                formattedDate = date.toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }

            const article = {
                id: articleDoc.id,
                title: data.title || '',
                category: data.category || 'all',
                author: data.authorName || '',
                date: formattedDate,
                coverImage: imageUrl || '/article_sommet.png'
            };

            console.log('Processed article with image:', article);
            return article;
        });

        const articles = await Promise.all(articlePromises);
        const validArticles = articles.filter((article): article is ArticleData => article !== null);
        console.log('Found valid articles:', validArticles);
        return validArticles;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique de lecture:', error);
        return [];
    }
};

export const updateReadingProgress = async (
    docId: string,
    progress: Partial<ReadingProgress>
): Promise<void> => {
    try {
        const readingRef = doc(db, 'userReadings', docId);
        await updateDoc(readingRef, {
            ...progress,
            readAt: new Date()
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la progression:', error);
        throw error;
    }
};

export const calculateProgress = (
    session: ReadingSession,
    currentScroll: number
): Partial<ReadingProgress> => {
    const now = Date.now();
    const actualReadTime = Math.round((now - session.startTime) / 1000 / 60); // en minutes
    const completionPercentage = Math.min(100, Math.round(currentScroll * 100));

    return {
        actualReadTime,
        completionPercentage,
        lastPosition: currentScroll
    };
};

export const isArticleRead = async (userId: string, articleId: string): Promise<boolean> => {
    try {
        const readingsRef = collection(db, 'userReadings');
        const q = query(readingsRef,
            where('userId', '==', userId),
            where('articleId', '==', articleId)
        );
        
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Erreur lors de la vérification de la lecture:', error);
        return false;
    }
};
