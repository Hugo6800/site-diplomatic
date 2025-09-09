'use client'

import { useState } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import EditorHeader from '@/app/components/EditorHeader'
import EditorMeta from '../components/EditorMeta'
import { type CategoryValue } from '../components/CustomCategorySelect'
import TiptapEditor from '@/app/components/TiptapEditor'
import RoleProtection from '@/app/components/RoleProtection'
import TagModifyPictureNew from '@/app/components/TagModifyPictureNew'
import TagSaveNewDraft from '@/app/components/TagSaveNewDraft'
import TagSubmitNewArticle from '@/app/components/TagSubmitNewArticle'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/hooks/useAuth'

// Interface pour les données d'article
interface ArticleData {
  imageUrl: string
  title: string
  keywords: string[]
  content: string
  createdAt: Timestamp
  updatedAt: Timestamp
  isDraft: boolean
  category: CategoryValue
  authorId: string
  authorName: string
  authorEmail: string
  estimatedReadTime: string
  status?: string
}

export default function NewArticlePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [imageUrl, setImageUrl] = useState('/placeholder_view.webp')
  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState('')  
  const [category, setCategory] = useState<CategoryValue>('international') 
  
  // Fonction pour calculer le temps de lecture estimé
  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200; // Vitesse de lecture moyenne
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime > 0 ? `${readTime} min` : '< 1 min';
  };

  const handleSave = async (isDraft = true, newStatus: string | null = null, redirect = true) => {
    if (newStatus) setStatus(newStatus);
    try {
      if (!user) {
        console.error('Utilisateur non connecté')
        return
      }
      
      setIsSaving(true)
      const ref = collection(db, 'articles')
      
      // Préparer les données de l'article
      const articleData: ArticleData = {
        imageUrl,
        title,
        keywords: keywords.split(',').map(k => k.trim()),
        content,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isDraft,
        category,
        authorId: user.uid,
        authorName: user.displayName || 'Auteur inconnu',
        authorEmail: user.email || '',
        estimatedReadTime: calculateReadTime(content)
      }
      
      // Ajouter le statut uniquement s'il est défini
      if (newStatus) {
        articleData.status = newStatus
      }
      
      const docRef = await addDoc(ref, articleData)
      
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
      <div className="min-h-screen bg-[#FEF5F5] dark:bg-[#171414]">
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
