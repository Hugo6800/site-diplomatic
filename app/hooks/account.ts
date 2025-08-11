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
      
      // 2. Obtenir le token d'authentification de l'utilisateur actuel
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('Utilisateur non connecté');
      }
      
      const token = await currentUser.getIdToken();
      
      // 3. Appeler l'API pour supprimer l'utilisateur de Firebase Authentication
      const response = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression de l\'utilisateur');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression du compte utilisateur:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la suppression du compte utilisateur'
      };
    }
  };