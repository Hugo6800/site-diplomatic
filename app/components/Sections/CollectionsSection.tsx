import { collections } from "@/app/utils/collections";
import CollectionCard from "../Cards/CollectionCard";
import Advertising from "../Advertising";

export default function CollectionsSection() {
    return (
        <section className="mt-28 mb-20">
            <h2 className="font-bold font-neulisalt text-[2rem] mb-4">Collections</h2>
            <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-4">
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        name={collection.name}
                        icon={collection.icon}
                        backgroundColor={collection.backgroundColor}
                        titleColor={collection.titleColor}
                    />
                ))}
            </div>
            <Advertising className="2xl:hidden mt-6" />
        </section>
    )
}