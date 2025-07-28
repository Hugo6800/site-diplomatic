'use client'

import EditorHeader from '@/app/components/EditorHeader'
import EditorMeta from '@/app/components/EditorMeta'
import TiptapEditor from '@/app/components/TiptapEditor'
import EditorActions from '@/app/components/EditorActions'

export default function NewArticlePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <EditorHeader imageUrl="/placeholder_view.webp" onImageChange={() => {}} />
        <EditorMeta 
          title=""
          keywords=""
          onTitleChange={() => {}}
          onKeywordsChange={() => {}}
        />
        <TiptapEditor initialContent="" onChange={() => {}} />
        <EditorActions onSave={() => {}} onPublish={() => {}} isDraft={true} />
      </div>
    </div>
  )
}
