import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface PasswordChangeResult {
    success: boolean;
    error?: string;
}

export const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
): Promise<PasswordChangeResult> => {
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
        return {
            success: false,
            error: 'Vous devez être connecté pour changer votre mot de passe'
        };
    }

    if (newPassword !== confirmPassword) {
        return {
            success: false,
            error: 'Les nouveaux mots de passe ne correspondent pas'
        };
    }

    if (newPassword.length < 6) {
        return {
            success: false,
            error: 'Le nouveau mot de passe doit contenir au moins 6 caractères'
        };
    }

    try {
        // Réauthentifier l'utilisateur
        const credential = EmailAuthProvider.credential(
            currentUser.email!,
            currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);

        // Mettre à jour le mot de passe
        await updatePassword(currentUser, newPassword);

        return { success: true };
    } catch (error) {
        console.error('Erreur lors du changement de mot de passe:', error);
        if (error instanceof Error && 'code' in error) {
            if (error.code === 'auth/wrong-password') {
                return {
                    success: false,
                    error: 'Le mot de passe actuel est incorrect'
                };
            }
        }
        return {
            success: false,
            error: 'Une erreur est survenue lors du changement de mot de passe'
        };
    }
};
