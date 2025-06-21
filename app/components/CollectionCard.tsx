import Link from 'next/link';

interface CollectionCardProps {
    colorCircle: string;
    name: string;
    description: string;
    backgroundColor: string;
}

export default function CollectionCard({ colorCircle, name, description, backgroundColor }: CollectionCardProps) {
    return (
        <Link href={`/collections?tag=${name.toLowerCase()}`}>
            <article className={`flex flex-col p-4 rounded-lg ${backgroundColor} cursor-pointer transition-transform hover:scale-105`}>
               <div className={`w-4 h-4 rounded-full ${colorCircle}`}></div>
               <p className="font-bold mt-2">{name}</p>
               <p className="font-bold">{description}</p>
            </article>
        </Link>
    )
}