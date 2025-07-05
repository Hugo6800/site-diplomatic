import { db } from '@/app/lib/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export interface ReadingProgress {
    actualReadTime: number;
    completionPercentage: number;
    lastPosition: number;
    readAt: Date;
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
        console.error('Erreur lors de l\'initialisation de la session de lecture:', error);
        return null;
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
