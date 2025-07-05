import Link from 'next/link';
import { CollectionCardProps } from '../../types/collectioncardProps';

export default function CollectionCard({ colorCircle, name, description, backgroundColor, titleColor }: CollectionCardProps) {
    return (
        <Link href={`/collections?tag=${name.toLowerCase()}`}>
            <article className={`flex flex-col p-4 rounded-lg ${backgroundColor} cursor-pointer group`}>
               <div className={`w-4 h-4 rounded-full ${colorCircle}`}></div>
               <p className={`font-bold font-fractul mt-2 text-2xl transition-all group-hover:font-black ${titleColor}`}>{name}</p>
               <p className="font-neulisalt">{description}</p>
            </article>
        </Link>
    )
}