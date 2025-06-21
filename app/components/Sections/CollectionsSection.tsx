import { collections } from "@/app/utils/collections";
import CollectionCard from "../CollectionCard";

export default function CollectionsSection() {
    return (
        <section className="mt-28 mb-20">
            <h2 className="font-bold text-[2rem]">Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        colorCircle={collection.colorCircle}
                        name={collection.name}
                        description={collection.description}
                        backgroundColor={collection.backgroundColor}
                        titleColor={collection.titleColor}
                    />
                ))}
            </div>
        </section>
    )
}