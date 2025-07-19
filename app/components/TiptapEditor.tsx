'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

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

  if (!mounted || !editor) return null

  return (
    <div className="border rounded p-3 bg-white">
      <EditorContent editor={editor} />
    </div>
  )
}

