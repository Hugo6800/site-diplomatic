export default function LastJob({ title, shortDescription, id }: { title: string, shortDescription: string, id: string }) {
    return (
        <article className="flex flex-col gap-4">
            <h2 className="font-bold font-fractul text-[34px] mb-4 dark:text-white w-fit">{title}</h2>
            <p>{shortDescription}</p>
            <button
                onClick={() => window.location.href = `/applyJob?jobId=${id}`}
                className="ml-auto font-bold font-neulisalt cursor-pointer bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">
                Postuler
            </button>
        </article>
    )
}