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
  onContentChange: (v: string) => void
}

export default function TiptapEditor({ content, onContentChange }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const editor = useEditor({
    autofocus: false,
    enableInputRules: false,
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
        class: 'min-h-[300px] prose prose-lg max-w-none tiptap-editor',
      },
    },
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML())
    },
    immediatelyRender: false
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content, editor])

  if (!mounted || !editor) return null

  return (
    <div className="border rounded p-3 bg-white">
      <EditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

