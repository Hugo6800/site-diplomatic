'use client'

import { useState } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import EditorHeader from '@/app/components/EditorHeader'
import EditorMeta from '@/app/components/EditorMeta'
import TiptapEditor from '@/app/components/TiptapEditor'
import RoleProtection from '@/app/components/RoleProtection'
import TagModifyPictureNew from '@/app/components/TagModifyPictureNew'
import TagSaveNewDraft from '@/app/components/TagSaveNewDraft'
import TagSubmitNewArticle from '@/app/components/TagSubmitNewArticle'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/hooks/useAuth'

export default function NewArticlePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [imageUrl, setImageUrl] = useState('/placeholder_view.webp')
  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState('')  // Initialiser avec une chaîne vide pour un nouvel article
  const [category, setCategory] = useState('default')
  
  // Fonction pour calculer le temps de lecture estimé
  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200; // Vitesse de lecture moyenne
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime > 0 ? `${readTime} min` : '< 1 min';
  };

  const handleSave = async (isDraft = true, newStatus = 'waiting', redirect = true) => {
    setStatus(newStatus); // Mettre à jour l'état du statut
    try {
      if (!user) {
        console.error('Utilisateur non connecté')
        return
      }
      
      setIsSaving(true)
      const ref = collection(db, 'articles')
      const docRef = await addDoc(ref, {
        imageUrl,
        title,
        keywords: keywords.split(',').map(k => k.trim()),
        content,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isDraft,
        status: newStatus,
        category,
        authorId: user.uid,
        authorName: user.displayName || 'Auteur inconnu',
        authorEmail: user.email || '',
        estimatedReadTime: calculateReadTime(content)
      })
      
      // Rediriger uniquement si demandé (pas pour les brouillons)
      if (redirect) {
        router.push(`/edit-article/${docRef.id}`)
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <RoleProtection allowedRoles={['journalist', 'admin']}>
      <div className="min-h-screen bg-white dark:bg-[#171414]">
        <div className="max-w-5xl mx-auto px-4 py-8 mt-20">
          <EditorHeader 
            imageUrl={imageUrl} 
          />
          <div className="mt-4 flex gap-4">
            <TagModifyPictureNew 
              onImageUpdate={setImageUrl}
            />
            <TagSaveNewDraft 
              onSave={handleSave}
              isLoading={isSaving}
            />
            <TagSubmitNewArticle 
              onSubmit={(newStatus) => handleSave(false, newStatus)}
              isLoading={isSaving}
              initialStatus={status}
            />
          </div>
          <EditorMeta 
            title={title}
            onTitleChange={setTitle}
            keywords={keywords}
            onKeywordsChange={setKeywords}
            category={category}
            onCategoryChange={setCategory}
          />
          <TiptapEditor content={content} onUpdate={setContent} />
        </div>
      </div>
    </RoleProtection>
  )
}
