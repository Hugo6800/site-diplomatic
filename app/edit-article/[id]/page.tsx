'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import EditorHeader from '@/app/components/EditorHeader'
import EditorMeta from '@/app/components/EditorMeta'
import TiptapEditor from '@/app/components/TiptapEditor'
import EditorActions from '@/app/components/EditorActions'

export default function EditArticlePage() {
  const params = useParams()
  const articleId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : null

  const [imageUrl, setImageUrl] = useState('/placeholder_view.webp')
  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [content, setContent] = useState('')

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
        }
      }
    }
    fetchArticle()
  }, [articleId])

  const handleSave = async () => {
    if (!articleId) return
    const ref = doc(db, 'articles', articleId)
    await updateDoc(ref, {
      title,
      keywords: keywords.split(',').map(k => k.trim()),
      content
    })
    alert('Article mis à jour')
  }

  return (
    <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20 space-y-6">
      <EditorHeader imageUrl={imageUrl} title={title} onTitleChange={setTitle} />
      <EditorMeta keywords={keywords} onChange={setKeywords} />
      <TiptapEditor content={content} onContentChange={setContent} />
      <EditorActions onSave={handleSave} />
    </main>
  )
}
