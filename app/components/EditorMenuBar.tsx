'use client'

import { Editor } from '@tiptap/react'
import {
  Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered
} from 'lucide-react'
import Button from './Button'

type Props = {
  editor: Editor | null
}

export default function EditorMenuBar({ editor }: Props) {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-2 p-2 rounded-full mb-4 bg-gray">
      <Button
        type="button"
        variant={editor.isActive('bold') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive('italic') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive('underline') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleUnderline().run()}
      >
        <Underline className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive('heading', { level: 1 }) ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive('heading', { level: 2 }) ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive('bulletList') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive('orderedList') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
    </div>
  )
}
