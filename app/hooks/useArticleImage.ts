'use client'

import { useState } from 'react';
import { useCloudinaryImage } from './useCloudinaryImage';

interface UseArticleImageReturn {
  uploadArticleImage: (file: File, articleId?: string) => Promise<string>;
  isUploading: boolean;
  uploadError: string | null;
}

/**
 * Hook personnalisé pour gérer les images d'articles avec Cloudinary
 * Permet de télécharger une image sur Cloudinary et de récupérer l'URL
 */
export function useArticleImage(): UseArticleImageReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { uploadImage } = useCloudinaryImage({ folder: 'article_pictures' });

  /**
   * Télécharge une image sur Cloudinary et retourne l'URL
   * Si articleId est fourni, met également à jour le document dans Firestore
   */
  const uploadArticleImage = async (file: File, articleId?: string): Promise<string> => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // Télécharger l'image sur Cloudinary
      const cloudinaryUrl = await uploadImage(file, articleId || '', 'imageUrl');
      return cloudinaryUrl;
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      setUploadError('Une erreur est survenue lors du téléchargement de l\'image');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadArticleImage,
    isUploading,
    uploadError
  };
}
