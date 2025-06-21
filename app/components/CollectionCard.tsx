interface CollectionCardProps {
    colorCircle: string;
    name: string;
    description: string;
    backgroundColor: string;
}

export default function CollectionCard({ colorCircle, name, description, backgroundColor }: CollectionCardProps) {
    return (
        <article className={`flex flex-col p-4 rounded-lg ${backgroundColor}`}>
           <div className={`w-4 h-4 rounded-full ${colorCircle}`}></div>
           <p className="font-bold mt-2">{name}</p>
           <p className="font-bold">{description}</p>
        </article>
    )
}