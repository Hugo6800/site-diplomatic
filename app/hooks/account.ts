import { EmailAuthProvider, deleteUser, reauthenticateWithCredential } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface DeleteAccountResult {
    success: boolean;
    error?: string;
}

// Fonction pour supprimer son propre compte (utilisateur connecté)
export const deleteAccount = async (password: string): Promise<DeleteAccountResult> => {
    const currentUser = auth.currentUser;
    if (!currentUser || !password) {
        return {
            success: false,
            error: 'Veuillez entrer votre mot de passe'
        };
    }

    try {
        const credential = EmailAuthProvider.credential(
            currentUser.email!,
            password
        );
        await reauthenticateWithCredential(currentUser, credential);
        await deleteDoc(doc(db, 'users', currentUser.uid));
        await deleteUser(currentUser);
        
        return { success: true };
    } catch (error) {
        console.error('Erreur lors de la suppression du compte:', error);
        if (error instanceof Error && 'code' in error && error.code === 'auth/wrong-password') {
            return {
                success: false,
                error: 'Mot de passe incorrect'
            };
        }
        return {
            success: false,
            error: 'Une erreur est survenue lors de la suppression du compte'
        };
    }
};

// Fonction pour supprimer un compte utilisateur depuis la page admin
export const deleteUserAccount = async (userId: string): Promise<DeleteAccountResult> => {
    try {
        // 1. Supprimer l'utilisateur de Firestore
        await deleteDoc(doc(db, 'users', userId));
        
        // 2. Supprimer l'utilisateur de Firebase Authentication
        // Cette opération nécessite des droits d'administrateur Firebase
        // Dans un environnement réel, cette partie devrait être gérée par une Cloud Function
        // car les clients ne peuvent pas supprimer d'autres utilisateurs directement
        // Ici, nous simulons cette fonctionnalité pour le développement
        
        // Note: Cette partie ne fonctionnera pas côté client sans configuration spéciale
        // Il faudrait implémenter une Cloud Function ou un endpoint API sécurisé
        
        return { success: true };
    } catch (error) {
        console.error('Erreur lors de la suppression du compte utilisateur:', error);
        return {
            success: false,
            error: 'Une erreur est survenue lors de la suppression du compte utilisateur'
        };
    }
};
