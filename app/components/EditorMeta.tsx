import { CustomCategorySelect, type CategoryValue } from "./CustomCategorySelect";

type Props = {
  title: string
  keywords: string
  onTitleChange: (v: string) => void
  onKeywordsChange: (v: string) => void
  category?: CategoryValue
  onCategoryChange?: (v: CategoryValue) => void
}

export default function EditorMeta({ title, keywords, onTitleChange, onKeywordsChange, category = 'international', onCategoryChange }: Props) {
  return (
    <div className="space-y-4 mt-2">
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-[#EECECE]">Choisissez une catégorie</label>
        <CustomCategorySelect 
          value={category} 
          onChange={(value) => onCategoryChange && onCategoryChange(value)}
        />
      </div>
      <input
        type="text"
        placeholder="Titre de l'article"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full border rounded-xl px-4 py-2 font-fractul font-bold text-[34px] dark:text-[#EECECE]"
      />
      <input
        type="text"
        placeholder="Mots clés séparés par des virgules"
        value={keywords}
        onChange={(e) => onKeywordsChange(e.target.value)}
        className="w-full border rounded-xl px-4 py-2 font-neulisalt my-4 dark:text-[#EECECE]"
      />
      
    </div>
  )
}