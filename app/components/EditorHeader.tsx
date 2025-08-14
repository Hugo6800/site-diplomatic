import Image from 'next/image'

type Props = {
  imageUrl: string
}

export default function EditorHeader({ imageUrl }: Props) {
  return (
    <div className="space-y-4">
      <Image
        src={imageUrl}
        alt="Image d’en-tête"
        width={1000}
        height={600}
        className="object-cover aspect-[16/9] rounded-4xl"
      />
    </div>
  )
}
