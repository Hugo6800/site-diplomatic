'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useArticleImage } from '@/app/hooks/useArticleImage';

interface TagModifyPictureEditProps {
    articleId: string;
    onImageUpdate: (newImageUrl: string) => void;
}

export default function TagModifyPictureEdit({ 
    articleId,
    onImageUpdate 
}: TagModifyPictureEditProps) {
    const { uploadArticleImage, isUploading, uploadError } = useArticleImage();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        
        try {
            // Créer une URL temporaire pour l'aperçu
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            
            // Télécharger l'image sur Cloudinary avec l'ID de l'article
            // Cela mettra automatiquement à jour le document dans Firestore
            const cloudinaryUrl = await uploadArticleImage(file, articleId);
            
            // Mettre à jour l'état local via le callback avec l'URL Cloudinary
            onImageUpdate(cloudinaryUrl);
        } catch (err) {
            console.error('Erreur lors du traitement de l\'image:', err);
            // L'erreur est déjà gérée par le hook useArticleImage
        } finally {
            // Nettoyer l'URL de prévisualisation si nécessaire
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            <label
                htmlFor="image-upload-edit"
                className={`inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer transition-colors duration-200 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E8B7B7]'}`}
            >
                <Image
                    src="/icons/edit_square.svg"
                    alt="Modifier la photo"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                />
                <h2 className="font-bold font-neulisalt text-sm text-[#3F2525]">
                    {isUploading ? 'Téléchargement...' : 'Modifier la photo'}
                </h2>
                <input
                    id="image-upload-edit"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploading}
                    className="hidden"
                />
            </label>
            {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
        </div>
    );
}
