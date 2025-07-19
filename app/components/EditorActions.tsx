type Props = {
    onSave: () => void
  }
  
  export default function EditorActions({ onSave }: Props) {
    return (
      <div className="text-right">
        <button
          onClick={onSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    )
  }
  