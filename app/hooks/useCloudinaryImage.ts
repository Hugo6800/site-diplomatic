import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface UseCloudinaryImageProps {
    folder: string;
}

interface UseCloudinaryImageReturn {
    uploadImage: (file: File, documentId: string, updateField: string) => Promise<string>;
    deleteImage: (imageUrl: string, folder: string) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export function useCloudinaryImage({ folder }: UseCloudinaryImageProps): UseCloudinaryImageReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fonction pour supprimer une image sur Cloudinary
    const deleteImage = async (imageUrl: string, imageFolder: string): Promise<void> => {
        if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
            return;
        }

        try {
            const timestamp = Math.round(new Date().getTime() / 1000);

            // Extraire le public_id de l'URL Cloudinary
            const urlParts = imageUrl.split('/');
            const fileNameWithExtension = urlParts[urlParts.length - 1];
            const fileName = fileNameWithExtension.split('.')[0];
            
            // Le public_id inclut le dossier
            const publicId = `${imageFolder}/${fileName}`;
            
            // Obtenir la signature pour la suppression
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

            // Préparer les données pour la suppression
            const formData = new FormData();
            formData.append('public_id', publicId);
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');
            formData.append('timestamp', String(timestamp));
            formData.append('signature', signature);

            // Appeler l'API Cloudinary pour supprimer l'image
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/destroy`;

            const response = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                console.error('Réponse Cloudinary (suppression):', {
                    status: response.status,
                    statusText: response.statusText
                });
                throw new Error(`Erreur lors de la suppression de l'image: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image sur Cloudinary:', error);
            // Ne pas bloquer le processus si la suppression échoue
        }
    };

    // Fonction pour télécharger une image sur Cloudinary
    const uploadImage = async (file: File, documentId: string, updateField: string): Promise<string> => {
        if (!file) {
            throw new Error('Aucun fichier fourni');
        }

        // Vérifier le type de fichier
        if (!file.type.includes('image/')) {
            setError('Veuillez sélectionner une image valide');
            throw new Error('Type de fichier invalide');
        }

        // Vérifier la taille du fichier (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('L\'image est trop volumineuse (max 5MB)');
            throw new Error('Fichier trop volumineux');
        }

        setIsLoading(true);
        setError(null);

        try {
            const timestamp = Math.round(new Date().getTime() / 1000);
            
            // Obtenir la signature pour Cloudinary
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

            // Préparer les données pour l'upload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');
            formData.append('timestamp', String(timestamp));
            formData.append('folder', folder);
            formData.append('signature', signature);

            // URL de l'API Cloudinary
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;

            // Envoyer l'image à Cloudinary
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

            // Récupérer l'URL de l'image téléchargée
            const cloudinaryData = await cloudinaryResponse.json();
            const imageUrl = cloudinaryData.secure_url;
            
            // Mettre à jour le document dans Firestore
            if (documentId) {
                const docRef = doc(db, folder === 'article_pictures' ? 'articles' : 'users', documentId);
                const updateData: Record<string, string> = {
                    updatedAt: new Date().toISOString()
                };
                updateData[updateField] = imageUrl;
                
                await updateDoc(docRef, updateData);
            }
            
            return imageUrl;
        } catch (err) {
            console.error('Erreur lors du téléchargement de l\'image:', err);
            setError('Une erreur est survenue lors du téléchargement de l\'image');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        uploadImage,
        deleteImage,
        isLoading,
        error
    };
}
