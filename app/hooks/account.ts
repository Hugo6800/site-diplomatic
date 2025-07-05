import { EmailAuthProvider, deleteUser, reauthenticateWithCredential } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface DeleteAccountResult {
    success: boolean;
    error?: string;
}

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
