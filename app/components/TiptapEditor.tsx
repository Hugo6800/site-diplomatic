'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import EditorMenuBar from './EditorMenuBar'
import './TiptapEditor.css'

type Props = {
  content: string
  onUpdate: (v: string) => void
}

export default function TiptapEditor({ content, onUpdate }: Props) {
  const [mounted, setMounted] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2],
          HTMLAttributes: {
            // La syntaxe correcte pour les attributs HTML des titres
            heading: { class: 'heading-base' },
            'heading-2': { class: 'text-xl font-bold my-3' },
          },
        },
      }),
      Typography,
      Placeholder.configure({
        placeholder: 'Commencez à écrire votre article...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'min-h-[300px] prose prose-lg max-w-none tiptap-editor dark:bg-[#171414] dark:border-[#575656] dark:text-[#EECECE] dark:prose-headings:text-[#EECECE] dark:prose-strong:text-[#EECECE] dark:prose-a:text-[#EECECE]',
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    },
    immediatelyRender: false
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !editor) return null

  return (
    <>
      <div>
        <EditorMenuBar editor={editor} />
      </div>
      <div className="border rounded-xl p-3 bg-white dark:bg-[#171414] dark:border-[#575656]">
        <EditorContent editor={editor} />
      </div>
    </>
  )
}
