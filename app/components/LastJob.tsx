export default function LastJob({ title, shortDescription, id }: { title: string, shortDescription: string, id: string }) {
    return (
        <article className="flex flex-col gap-4">
            <h2 className="font-bold font-fractul text-[34px] mb-4 dark:text-white w-fit">{title}</h2>
            <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: shortDescription }}
            />
            <div className="flex flex-col lg:flex-row gap-4 mt-2 ml-auto">
                <button
                    onClick={() => window.location.href = `/jobboard/${id}`}
                    className="font-bold font-neulisalt cursor-pointer bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] dark:text-white w-fit">
                    Voir l&apos;annonce
                </button>
                <button
                    onClick={() => window.location.href = `/applyJob?jobId=${id}`}
                    className="font-bold font-neulisalt cursor-pointer bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] dark:text-white w-fit">
                    Postuler
                </button>
            </div>
        </article>
    )
}