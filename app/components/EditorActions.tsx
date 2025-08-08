type Props = {
  onSave: () => void
  onPublish: () => void
  isDraft: boolean
}

export default function EditorActions({ onSave, onPublish, isDraft }: Props) {
  return (
    <div className="flex justify-end gap-4">
      <button
        onClick={onSave}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {isDraft ? 'Enregistrer le brouillon' : 'Enregistrer'}
      </button>
      {isDraft && (
        <button
          onClick={onPublish}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Publier
        </button>
      )}
    </div>
  )
}