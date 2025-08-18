export default function JobFull({ title, shortDescription, postDescription, searchProfil, id }: { title: string, shortDescription: string, postDescription: string, searchProfil: string, id: string }) {
    return (
        <section className="pt-24 my-16">
            <div className="flex justify-between items-center gap-4 mb-4">
                <h2 className="font-bold font-fractul text-[34px] mb-4 dark:text-white w-fit">{title}</h2>
                <button
                    onClick={() => window.location.href = `/jobboard/${id}`}
                    className="ml-auto font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">
                    Postuler
                </button>
            </div>
            <p className="mb-2">{shortDescription}</p>
            <h3 className="font-bold font-fractul text-[30px] mb-2 dark:text-white w-fit">Le poste</h3>
            <p className="mb-2">{postDescription}</p>
            <h3 className="font-bold font-fractul text-[30px] mb-2 dark:text-white w-fit">Profil recherché</h3>
            <p className="mb-2">{searchProfil}</p>
        </section>
    )
}