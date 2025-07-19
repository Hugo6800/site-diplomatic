import Image from 'next/image'

type Props = {
  imageUrl: string
  title: string
  onTitleChange: (v: string) => void
}

export default function EditorHeader({ imageUrl, title, onTitleChange }: Props) {
  return (
    <div className="space-y-4">
      <Image
        src={imageUrl}
        alt="Image d’en-tête"
        width={1000}
        height={600}
        className="object-cover rounded-4xl"
      />
      <input
        type="text"
        placeholder="Titre de l’article"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full border rounded px-4 py-2 text-2xl font-bold"
      />
    </div>
  )
}
