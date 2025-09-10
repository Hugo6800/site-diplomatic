import Link from 'next/link';
import { CollectionCardProps } from '../../types/collectioncardProps';
import Image from 'next/image';
import { getCollectionStyles } from '../../utils/collections-styles';

export default function CollectionCard({ name, icon, category }: CollectionCardProps) {
    const styles = getCollectionStyles(category);

    return (
        <Link href={`/collections?tag=${name.toLowerCase()}`} className="block h-[312px] transition-all duration-300 ease-in-out group lg:flex-1">
            <article 
                className={`flex justify-center items-center rounded-full ${styles.bg}
                cursor-pointer h-full w-[150px] sm:w-[170px] md:w-[200px] lg:w-[200px] transition-all duration-300 ease-in-out 
                lg:hover:w-[400px] lg:hover:flex-[2] group`}
            >
                <div className="group-hover:hidden transition duration-300">
                    <Image
                        src={icon}
                        alt={name}
                        width={32}
                        height={32}
                        className="object-contain dark:hidden"
                    />
                    <Image
                        src={`/icons/dark_collection/${icon.split('/').pop()?.replace('.svg', '.png')}`}
                        alt={name}
                        width={32}
                        height={32}
                        className="object-contain hidden dark:block"
                    />
                </div>

                <div className="hidden group-hover:flex transition duration-300">
                    <p className={`font-bold font-fractul text-2xl text-center ${getCollectionStyles(category).text}`}>
                        {name}
                    </p>
                </div>
            </article>
        </Link>
    );
}

