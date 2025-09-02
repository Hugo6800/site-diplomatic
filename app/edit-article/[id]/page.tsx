'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import EditorHeader from '@/app/components/EditorHeader'
import EditorMeta from '@/app/components/EditorMeta'
import TiptapEditor from '@/app/components/TiptapEditor'
import ArticleAuthorProtection from '@/app/components/ArticleAuthorProtection'
import TagModifyPictureEdit from '@/app/components/TagModifyPictureEdit'
import TagSaveDraftArticle from '@/app/components/TagSaveDraftArticle'
import TagSubmitArticle from '@/app/components/TagSubmitArticle'

export default function EditArticlePage() {
  const params = useParams()
  const articleId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : null
  const [imageUrl, setImageUrl] = useState('/placeholder_view.webp')
  const [title, setTitle] = useState('')
  const [keywords, setKeywords] = useState('')
  const [content, setContent] = useState('')
  const [isDraft, setIsDraft] = useState(true)
  const [_status, setStatus] = useState('published')

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
          setStatus(data.status || 'published')
        }
      }
    }
    fetchArticle()
  }, [articleId])

  return (
    <ArticleAuthorProtection articleId={articleId}>
      <main className="min-h-screen bg-header">
        <div className="max-w-5xl mx-auto px-4 py-8 mt-20">
          <div className="flex flex-col items-center mb-4">
            <EditorHeader 
              imageUrl={imageUrl} 
            />
            {articleId && (
              <div className="mt-4 flex gap-4">
                <TagModifyPictureEdit 
                  articleId={articleId || ''}
                  onImageUpdate={setImageUrl}
                />
                <TagSaveDraftArticle
                  articleId={articleId}
                  isDraft={isDraft}
                  onDraftStatusChange={setIsDraft}
                />
                <TagSubmitArticle
                  articleId={articleId}
                  onStatusChange={setStatus}
                />
              </div>
            )}  
          </div>
          <EditorMeta 
            title={title}
            keywords={keywords}
            onTitleChange={setTitle}
            onKeywordsChange={setKeywords}
          />
          <TiptapEditor content={content} onUpdate={setContent} />
        </div>
      </main>
    </ArticleAuthorProtection>
  )
}
