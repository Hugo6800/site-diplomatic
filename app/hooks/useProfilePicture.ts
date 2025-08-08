import { useState, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { User } from 'firebase/auth';

interface UseProfilePictureReturn {
    uploading: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleProfilePictureUpload: (file: File) => Promise<void>;
}

export function useProfilePicture(user: User | null): UseProfilePictureReturn {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProfilePictureUpload = async (file: File) => {
        if (!file || !user) return;

        if (file.size > 1048576) {
            alert('Le fichier est trop volumineux. La taille maximum est de 1Mo.');
            return;
        }

        try {
            setUploading(true);

            const timestamp = Math.round(new Date().getTime() / 1000);
            const folder = 'profile_pictures';
            
            // Récupérer l'URL actuelle de la photo de profil
            const currentPhotoURL = user.photoURL;
            let publicId = null;
            
            // Vérifier si l'utilisateur a déjà une photo de profil sur Cloudinary
            if (currentPhotoURL && currentPhotoURL.includes('cloudinary.com')) {
                try {
                    // Extraire le public_id de l'URL Cloudinary
                    const urlParts = currentPhotoURL.split('/');
                    const fileNameWithExtension = urlParts[urlParts.length - 1];
                    const fileName = fileNameWithExtension.split('.')[0];
                    
                    // Le public_id inclut le dossier
                    publicId = `${folder}/${fileName}`;
                    
                    // Supprimer l'ancienne image
                    await deleteCloudinaryImage(publicId, timestamp);
                } catch (deleteError) {
                    console.error('Erreur lors de la suppression de l\'ancienne image:', deleteError);
                    // Continuer malgré l'erreur de suppression
                }
            }

            const signatureResponse = await fetch('/api/cloudinary/sign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp,
                    folder
                })
            });

            if (!signatureResponse.ok) {
                throw new Error('Erreur lors de la génération de la signature');
            }

            const { signature } = await signatureResponse.json();

            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');
            formData.append('timestamp', String(timestamp));
            formData.append('folder', folder);
            formData.append('signature', signature);

            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;

            const cloudinaryResponse = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData
            });

            if (!cloudinaryResponse.ok) {
                const errorData = await cloudinaryResponse.text();
                console.error('Réponse Cloudinary:', {
                    status: cloudinaryResponse.status,
                    statusText: cloudinaryResponse.statusText,
                    error: errorData
                });
                throw new Error(`Erreur lors du téléchargement de l'image: ${cloudinaryResponse.status} ${cloudinaryResponse.statusText}`);
            }

            const cloudinaryData = await cloudinaryResponse.json();

            await updateDoc(doc(db, 'users', user.uid), {
                photoURL: cloudinaryData.secure_url
            });

            const currentUser = auth.currentUser;
            if (currentUser) {
                await updateProfile(currentUser, {
                    photoURL: cloudinaryData.secure_url
                });
            }

            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            alert('Une erreur est survenue lors du téléchargement de l\'image');
        } finally {
            setUploading(false);
        }
    };

    // Fonction pour supprimer une image sur Cloudinary
    const deleteCloudinaryImage = async (publicId: string, timestamp: number) => {
        try {
            // Obtenir une signature pour la suppression
            const signatureResponse = await fetch('/api/cloudinary/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    public_id: publicId,
                    timestamp
                })
            });

            if (!signatureResponse.ok) {
                throw new Error('Erreur lors de la génération de la signature de suppression');
            }

            const { signature } = await signatureResponse.json();

            // Appeler l'API Cloudinary pour supprimer l'image
            const formData = new FormData();
            formData.append('public_id', publicId);
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');
            formData.append('timestamp', String(timestamp));
            formData.append('signature', signature);

            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/destroy`;

            const response = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Réponse Cloudinary (suppression):', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData
                });
                throw new Error(`Erreur lors de la suppression de l'image: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Image supprimée avec succès:', result);
            return result;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image sur Cloudinary:', error);
            throw error;
        }
    };

    return {
        uploading,
        fileInputRef,
        handleProfilePictureUpload
    };
}
