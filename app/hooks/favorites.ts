import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';


export const addToFavorites = async (userId: string, articleId: string): Promise<void> => {
    try {
        const favoritesRef = collection(db, 'favorites');
        
        // Vérifier si l'article est déjà dans les favoris
        const q = query(favoritesRef, 
            where('userId', '==', userId),
            where('articleId', '==', articleId)
        );
        
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            // Ajouter aux favoris seulement si pas déjà présent
            await addDoc(favoritesRef, {
                userId,
                articleId,
                createdAt: new Date()
            });
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout aux favoris:', error);
        throw error;
    }
};

export const removeFromFavorites = async (userId: string, articleId: string): Promise<void> => {
    try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef,
            where('userId', '==', userId),
            where('articleId', '==', articleId)
        );
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (error) {
        console.error('Erreur lors de la suppression des favoris:', error);
        throw error;
    }
};

export const isArticleFavorited = async (userId: string, articleId: string): Promise<boolean> => {
    try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef,
            where('userId', '==', userId),
            where('articleId', '==', articleId)
        );
        
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Erreur lors de la vérification des favoris:', error);
        return false;
    }
};
