import { db } from '@/app/lib/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface ReadingProgress {
    startTimestamp: Timestamp;        // Timestamp de début de lecture
    lastUpdateTimestamp: Timestamp;   // Dernier timestamp de mise à jour
    totalReadTime: number;        // Temps total de lecture accumulé en secondes
    completionPercentage?: number;
    lastPosition?: number;
    readAt: Timestamp;
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
    readingId: string;      // ID du document userReadings
    startTime: number;
    lastUpdate: number;
    initialScroll: number;
    articleId: string;
    userId: string;
}

// Fonction de migration pour convertir actualReadTime en totalReadTime
export const migrateReadingData = async (docId: string) => {
    const docRef = doc(db, 'userReadings', docId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return;
    
    const data = docSnap.data();
    if (!data.actualReadTime || data.totalReadTime) return;

    const actualReadTime = data.actualReadTime || 0;
    const totalReadTime = actualReadTime * 60;
    
    await updateDoc(doc(db, 'userReadings', docId), {
        startTimestamp: serverTimestamp(),
        lastUpdateTimestamp: serverTimestamp(),
        totalReadTime: totalReadTime,
    });
};

export const initializeReadingSession = async (userId: string, articleId: string): Promise<string | null> => {
    try {
        // Vérifier si une session de lecture existe déjà
        const readingsQuery = query(
            collection(db, 'userReadings'),
            where('userId', '==', userId),
            where('articleId', '==', articleId)
        );

        const querySnapshot = await getDocs(readingsQuery);
        
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            // Mettre à jour les timestamps si c'est une ancienne session
            if (!data.startTimestamp || !data.lastUpdateTimestamp) {
                await updateDoc(doc.ref, {
                    startTimestamp: serverTimestamp(),
                    lastUpdateTimestamp: serverTimestamp(),
                    totalReadTime: data.totalReadTime || 0
                });
            }
            return doc.id;
        }

        // Créer une nouvelle session de lecture
        const docRef = await addDoc(collection(db, 'userReadings'), {
            userId,
            articleId,
            readAt: serverTimestamp(),
            startTimestamp: serverTimestamp(),
            lastUpdateTimestamp: serverTimestamp(),
            totalReadTime: 0
        });

        return docRef.id;
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

            // Récupérer l'URL de l'image
            const imageUrl = data.imageUrl;

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

            return article;
        });

        const articles = await Promise.all(articlePromises);
        const validArticles = articles.filter((article): article is ArticleData => article !== null);
        return validArticles;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique de lecture:', error);
        return [];
    }
};

export const updateReadingProgress = async (docId: string, progress: ReadingProgress) => {
    try {
        const docRef = doc(db, 'userReadings', docId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return;

        const data = docSnap.data();
        // Convert lastUpdateTimestamp to milliseconds, handling both Date and Timestamp cases
        const lastUpdateMs = data.lastUpdateTimestamp instanceof Date
            ? data.lastUpdateTimestamp.getTime()
            : (data.lastUpdateTimestamp?.toMillis?.() ?? Date.now());
        const now = Date.now();
        const timeDiffSeconds = Math.floor((now - lastUpdateMs) / 1000);

        await updateDoc(docRef, {
            ...progress,
            readAt: serverTimestamp(),
            lastUpdateTimestamp: serverTimestamp(),
            totalReadTime: (data.totalReadTime || 0) + timeDiffSeconds
        });
    } catch (error) {
        console.error('Error updating reading progress:', error);
    }
};

export const calculateProgress = async (
    session: ReadingSession,
    currentScroll: number
): Promise<Partial<ReadingProgress>> => {
    const now = Date.now();
    
    // Récupérer l'état actuel de la lecture
    const readingDoc = await getDoc(doc(db, 'userReadings', session.readingId));
    const currentData = readingDoc.data() as ReadingProgress;
    
    // Calculer le temps écoulé depuis la dernière mise à jour en secondes
    const elapsedTime = Math.round((now - currentData.lastUpdateTimestamp.toMillis()) / 1000);
    
    // Mettre à jour le temps total de lecture
    const totalReadTime = currentData.totalReadTime + elapsedTime;
    
    const completionPercentage = Math.min(100, Math.round(currentScroll * 100));

    return {
        lastUpdateTimestamp: Timestamp.fromMillis(now),
        totalReadTime,
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
