type Props = {
    keywords: string
    onChange: (v: string) => void
  }
  
  export default function EditorMeta({ keywords, onChange }: Props) {
    return (
      <input
        type="text"
        placeholder="Mots clés séparés par des virgules"
        value={keywords}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-4 py-2"
      />
    )
  }
  