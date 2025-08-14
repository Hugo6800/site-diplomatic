'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCloudinaryImage } from '../hooks/useCloudinaryImage';

interface TagModifyPictureArticleProps {
    articleId: string;
    onImageUpdate: (newImageUrl: string) => void;
}

export default function TagModifyPictureArticle({ 
    articleId, 
    onImageUpdate 
}: TagModifyPictureArticleProps) {
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
    const { uploadImage, deleteImage, isLoading, error } = useCloudinaryImage({ folder: 'article_pictures' });
    
    // Récupérer l'URL de l'image actuelle au chargement du composant
    useEffect(() => {
        const fetchArticleImage = async () => {
            if (articleId) {
                try {
                    const articleRef = doc(db, 'articles', articleId);
                    const articleSnap = await getDoc(articleRef);
                    
                    if (articleSnap.exists()) {
                        const data = articleSnap.data();
                        if (data.imageUrl) {
                            setCurrentImageUrl(data.imageUrl);
                        }
                    }
                } catch (err) {
                    console.error("Erreur lors de la récupération de l'image de l'article:", err);
                }
            }
        };
        
        fetchArticleImage();
    }, [articleId]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        
        try {
            // Supprimer l'ancienne image si elle existe
            if (currentImageUrl && currentImageUrl.includes('cloudinary.com')) {
                await deleteImage(currentImageUrl, 'article_pictures');
            }
            
            // Télécharger la nouvelle image
            const newImageUrl = await uploadImage(file, articleId, 'imageUrl');
            
            // Mettre à jour l'état local via le callback
            onImageUpdate(newImageUrl);
            setCurrentImageUrl(newImageUrl);
        } catch (err) {
            console.error('Erreur lors du traitement de l\'image:', err);
            // L'erreur est déjà gérée dans le hook
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