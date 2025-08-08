'use client'

import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import EditorHeader from '@/app/components/EditorHeader'
import EditorMeta from '@/app/components/EditorMeta'
import TiptapEditor from '@/app/components/TiptapEditor'
import EditorActions from '@/app/components/EditorActions'
import RoleProtection from '@/app/components/RoleProtection'

export default function NewArticlePage() {
  const [imageUrl, setImageUrl] = useState('/placeholder_view.webp')
  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [content, setContent] = useState('')

  const handleSave = async (isDraft = true) => {
    const ref = collection(db, 'articles')
    await addDoc(ref, {
      imageUrl,
      title,
      keywords: keywords.split(',').map(k => k.trim()),
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDraft
    })
  }

  return (
    <RoleProtection allowedRoles={['journalist', 'admin']}>
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <EditorHeader 
            imageUrl={imageUrl} 
            title={title}
            onTitleChange={setTitle}
          />
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
