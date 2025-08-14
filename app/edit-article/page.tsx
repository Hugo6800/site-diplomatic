'use client'

import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import EditorHeader from '@/app/components/EditorHeader'
import EditorMeta from '@/app/components/EditorMeta'
import TiptapEditor from '@/app/components/TiptapEditor'
import EditorActions from '@/app/components/EditorActions'
import RoleProtection from '@/app/components/RoleProtection'
import TagModifyPictureNew from '@/app/components/TagModifyPictureNew'
import TagSaveNewDraft from '@/app/components/TagSaveNewDraft'
import { useRouter } from 'next/navigation'

export default function NewArticlePage() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('/placeholder_view.webp')
  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (isDraft = true) => {
    try {
      setIsSaving(true)
      const ref = collection(db, 'articles')
      const docRef = await addDoc(ref, {
        imageUrl,
        title,
        keywords: keywords.split(',').map(k => k.trim()),
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDraft
      })
      
      // Rediriger vers la page d'édition de l'article nouvellement créé
      router.push(`/edit-article/${docRef.id}`)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <RoleProtection allowedRoles={['journalist', 'admin']}>
      <div className="min-h-screen bg-white">
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
          </div>
          <EditorMeta 
            title={title}
            keywords={keywords}
            onTitleChange={setTitle}
            onKeywordsChange={setKeywords}
          />
          <TiptapEditor content={content} onUpdate={setContent} />
          <EditorActions 
            onSave={() => handleSave(true)} 
            onPublish={() => handleSave(false)} 
            isDraft={true} 
          />
        </div>
      </div>
    </RoleProtection>
  )
}
