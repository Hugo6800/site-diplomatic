import { collections } from "@/app/utils/collections";
import CollectionCard from "../Cards/CollectionCard";
import Advertising from "../Advertising";

export default function CollectionsSection() {
    return (
        <section className="mt-28 mb-20">
            <h2 className="font-bold font-neulisalt italic text-[1rem]  bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 mb-4 dark:text-white w-fit">Collections</h2>
            <div className="grid grid-cols-2 lg:flex lg:justify-between gap-4 w-full">
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