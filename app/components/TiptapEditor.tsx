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
        class: 'min-h-[300px] prose prose-lg max-w-none tiptap-editor dark:bg-[#171414] dark:border-[#575656]',
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

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content, editor])

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
