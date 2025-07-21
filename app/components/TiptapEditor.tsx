'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorMenuBar from './EditorMenuBar'

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
    autofocus: true,
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: 'min-h-[300px] outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML())
    },
    immediatelyRender: false
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
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

