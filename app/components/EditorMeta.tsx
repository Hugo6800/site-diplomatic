type Props = {
  title: string
  keywords: string
  onTitleChange: (v: string) => void
  onKeywordsChange: (v: string) => void
}

export default function EditorMeta({ title, keywords, onTitleChange, onKeywordsChange }: Props) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Titre de l'article"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full border rounded px-4 py-2"
      />
      <input
        type="text"
        placeholder="Mots clés séparés par des virgules"
        value={keywords}
        onChange={(e) => onKeywordsChange(e.target.value)}
        className="w-full border rounded px-4 py-2"
      />
    </div>
  )
}