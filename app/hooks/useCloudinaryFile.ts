import { useState } from 'react';

interface UseCloudinaryFileProps {
    folder: string;
}

interface UseCloudinaryFileReturn {
    uploadFile: (file: File) => Promise<string>;
    isLoading: boolean;
    error: string | null;
}

export function useCloudinaryFile({ folder }: UseCloudinaryFileProps): UseCloudinaryFileReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fonction pour télécharger un fichier sur Cloudinary
    const uploadFile = async (file: File): Promise<string> => {
        if (!file) {
            throw new Error('Aucun fichier fourni');
        }

        // Vérifier le type de fichier (PDF uniquement)
        if (file.type !== 'application/pdf') {
            setError('Veuillez sélectionner un fichier PDF valide');
            throw new Error('Type de fichier invalide');
        }

        // Vérifier la taille du fichier (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('Le fichier est trop volumineux (max 10MB)');
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
            formData.append('resource_type', 'raw'); // Important pour les fichiers non-image

            // URL de l'API Cloudinary
            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/raw/upload`;

            // Envoyer le fichier à Cloudinary
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
                throw new Error(`Erreur lors du téléchargement du fichier: ${cloudinaryResponse.status} ${cloudinaryResponse.statusText}`);
            }

            // Récupérer l'URL du fichier téléchargé
            const cloudinaryData = await cloudinaryResponse.json();
            const fileUrl = cloudinaryData.secure_url;
            
            return fileUrl;
        } catch (err) {
            console.error('Erreur lors du téléchargement du fichier:', err);
            setError('Une erreur est survenue lors du téléchargement du fichier');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        uploadFile,
        isLoading,
        error
    };
}
