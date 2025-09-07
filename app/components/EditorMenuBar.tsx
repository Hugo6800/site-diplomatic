'use client'

import { Editor } from '@tiptap/react'
import Button from './Button'
import Image from 'next/image'

type Props = {
  editor: Editor | null
}

export default function EditorMenuBar({ editor }: Props) {
  if (!editor) return null

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 rounded-full mb-4 bg-[#F3DEDE] dark:bg-[#433D3D] dark:border-[#575656]">
      <div className="flex gap-2 px-2 py-1 rounded-full border-2 border-[#433D3D] mr-3">
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 1 }) ? 'primary' : 'secondary'}
          onClick={() => editor.chain().toggleHeading({ level: 1 }).run()}
        >
          <Image
            src="/icons/TipTap/H1.svg"
            alt="h1"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('heading', { level: 2 }) ? 'primary' : 'secondary'}
          onClick={() => editor.chain().toggleHeading({ level: 2 }).run()}
        >
          <Image
            src="/icons/TipTap/H2.svg"
            alt="h2"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button>
        <Button
          type="button"
          variant={editor.isActive('paragraph') ? 'primary' : 'secondary'}
          onClick={() => editor.chain().setParagraph().run()}
        >
          <Image
            src="/icons/TipTap/Aa.svg"
            alt="paragraph"
            width={24}
            height={24}
            className="object-cover"
          />

        </Button>
      </div>
      <Button
        type="button"
        variant={editor.isActive('bold') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleBold().run()}
      >
        <Image
          src="/icons/TipTap/bold.svg"
          alt="bold"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <Button
        type="button"
        variant={editor.isActive('italic') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleItalic().run()}
      >
        <Image
          src="/icons/TipTap/Italic.svg"
          alt="italic"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <Button
        type="button"
        variant={editor.isActive('underline') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleUnderline().run()}
      >
        <Image
          src="/icons/TipTap/Underline.svg"
          alt="underline"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <div className="flex justify-center items-center mx-3">
        <Button
          type="button"
          variant={editor.isActive('link') ? 'primary' : 'secondary'}
          onClick={() => editor.chain().toggleLink().run()}
        >
          <Image
            src="/icons/TipTap/Link.svg"
            alt="link"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button>
      </div>
      <Button
        type="button"
        variant={editor.isActive('bulletList') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleBulletList().run()}
      >
        <Image
          src="/icons/TipTap/List_bulleted.svg"
          alt="bulletList"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <Button
        type="button"
        variant={editor.isActive('orderedList') ? 'primary' : 'secondary'}
        onClick={() => editor.chain().toggleOrderedList().run()}
      >
        <Image
          src="/icons/TipTap/List_number.svg"
          alt="orderedList"
          width={24}
          height={24}
          className="object-cover"
        />
      </Button>
      <div className="flex justify-center items-center mx-3">
        <Button
          type="button"
          variant={editor.isActive('blockquote') ? 'primary' : 'secondary'}
          onClick={() => editor.chain().toggleBlockquote().run()}
        >
          <Image
            src="/icons/TipTap/Quote.svg"
            alt="quote"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button>
        <Button
          type="button"
          variant={'secondary'}
          onClick={() => {
            editor.chain().clearNodes().unsetAllMarks().run()
          }}
        >
          <Image
            src="/icons/TipTap/Remove_styling.svg"
            alt="removeFormat"
            width={24}
            height={24}
            className="object-cover"
          />
        </Button>
      </div>
    </div>
  )
}
