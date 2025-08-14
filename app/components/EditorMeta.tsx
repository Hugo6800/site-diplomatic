type Props = {
  title: string
  keywords: string
  onTitleChange: (v: string) => void
  onKeywordsChange: (v: string) => void
  category?: string
  onCategoryChange?: (v: string) => void
}

export default function EditorMeta({ title, keywords, onTitleChange, onKeywordsChange, category = 'default', onCategoryChange }: Props) {
  return (
    <div className="space-y-4 mt-16">
      <input
        type="text"
        placeholder="Titre de l'article"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full border rounded px-4 py-2 font-fractul font-bold text-[34px]"
      />
      <input
        type="text"
        placeholder="Mots clés séparés par des virgules"
        value={keywords}
        onChange={(e) => onKeywordsChange(e.target.value)}
        className="w-full border rounded px-4 py-2 font-neulisalt my-4"
      />
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
        <select 
          value={category} 
          onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
          className="w-full border rounded px-4 py-2 font-neulisalt"
        >
          <option value="default">Sélectionner une catégorie</option>
          <option value="international">International</option>
          <option value="societe">Société</option>
          <option value="culture">Culture</option>
          <option value="politic">Politique</option>
        </select>
      </div>
    </div>
  )
}