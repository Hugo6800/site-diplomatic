import Link from 'next/link';
import { CollectionCardProps } from '../../types/collectioncardProps';
import Image from 'next/image';

export default function CollectionCard({ name, icon, backgroundColor, titleColor }: CollectionCardProps) {
    return (
        <Link href={`/collections?tag=${name.toLowerCase()}`} className="block h-[312px] transition-all duration-300 ease-in-out group">
            <article 
                className={`flex justify-center items-center rounded-full ${backgroundColor} 
                cursor-pointer h-full transition-all duration-300 ease-in-out 
                lg:w-[200px] lg:hover:w-[400px] group`}
            >
                {/* Icône (affichée par défaut) */}
                <div className="group-hover:hidden transition duration-300">
                    <Image
                        src={icon}
                        alt={name}
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                </div>

                {/* Texte (affiché au hover) */}
                <div className="hidden group-hover:flex transition duration-300">
                    <p className={`font-bold font-fractul text-2xl text-center ${titleColor}`}>
                        {name}
                    </p>
                </div>
            </article>
        </Link>
    );
}

