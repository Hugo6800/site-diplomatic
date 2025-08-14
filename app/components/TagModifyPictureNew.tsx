'use client'

import { useState } from 'react';
import Image from 'next/image';

interface TagModifyPictureNewProps {
    onImageUpdate: (newImageUrl: string) => void;
}

export default function TagModifyPictureNew({ 
    onImageUpdate 
}: TagModifyPictureNewProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        
        // Vérifier le type de fichier
        if (!file.type.includes('image/')) {
            setError('Veuillez sélectionner une image valide');
            return;
        }

        // Vérifier la taille du fichier (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('L\'image est trop volumineuse (max 5MB)');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Créer une URL temporaire pour l'aperçu
            const objectUrl = URL.createObjectURL(file);
            
            // Mettre à jour l'état local via le callback
            onImageUpdate(objectUrl);
            
            // Note: L'image sera réellement téléchargée sur Cloudinary lors de la sauvegarde de l'article
        } catch (err) {
            console.error('Erreur lors du traitement de l\'image:', err);
            setError('Une erreur est survenue lors du traitement de l\'image');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <label
                htmlFor="image-upload"
                className={`inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E8B7B7]'}`}
            >
                <Image
                    src="/icons/edit_square.svg"
                    alt="Changer la photo"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                />
                <h2 className="font-bold font-neulisalt text-sm text-[#3F2525]">
                    {isLoading ? 'Chargement...' : 'Changer la photo'}
                </h2>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isLoading}
                    className="hidden"
                />
            </label>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
