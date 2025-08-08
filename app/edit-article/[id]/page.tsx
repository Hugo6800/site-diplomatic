'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import EditorHeader from '@/app/components/EditorHeader'
import EditorMeta from '@/app/components/EditorMeta'
import TiptapEditor from '@/app/components/TiptapEditor'
import EditorActions from '@/app/components/EditorActions'
import RoleProtection from '@/app/components/RoleProtection'

export default function EditArticlePage() {
  const params = useParams()
  const articleId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : null
  const [imageUrl, setImageUrl] = useState('/placeholder_view.webp')
  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [content, setContent] = useState('')
  const [isDraft, setIsDraft] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      if (articleId) {
        const ref = doc(db, 'articles', articleId)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          const data = snap.data()
          setImageUrl(data.imageUrl)
          setTitle(data.title || '')
          setKeywords((data.keywords || []).join(', '))
          setContent(data.content || '')
          setIsDraft(data.isDraft ?? true)
        }
      }
    }
    fetchArticle()
  }, [articleId])

  const handleSave = async (asDraft = isDraft) => {
    if (articleId) {
      const ref = doc(db, 'articles', articleId)
      await updateDoc(ref, {
        imageUrl,
        title,
        keywords: keywords.split(',').map(k => k.trim()),
        content,
        updatedAt: new Date().toISOString(),
        isDraft: asDraft
      })
      setIsDraft(asDraft)
    }
  }

  return (
    <RoleProtection allowedRoles={['journalist', 'admin']}>
      <main className="min-h-screen bg-white">
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
            isDraft={isDraft} 
          />
        </div>
      </main>
    </RoleProtection>
  )
}
