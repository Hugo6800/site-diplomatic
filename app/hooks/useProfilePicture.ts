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

    return {
        uploading,
        fileInputRef,
        handleProfilePictureUpload
    };
}
