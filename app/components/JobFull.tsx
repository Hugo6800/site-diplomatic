export default function JobFull({ title, shortDescription, postDescription, searchProfil, id }: { title: string, shortDescription: string, postDescription: string, searchProfil: string, id: string }) {
    return (
        <section className="pt-24 my-16">
            <div className="flex justify-between items-center gap-4 mb-4">
                <h2 className="font-bold font-fractul text-[34px] mb-4 dark:text-white w-fit">{title}</h2>
                <button
                    onClick={() => window.location.href = `/applyJob?jobId=${id}`}
                    className="ml-auto font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">
                    Postuler
                </button>
            </div>
            
            {/* Affichage du contenu HTML pour la description courte */}
            <div 
                className="mb-2"
                dangerouslySetInnerHTML={{ __html: shortDescription }}
            />
            
            <h3 className="font-bold font-fractul text-[30px] mb-2 dark:text-white w-fit">Le poste</h3>
            
            {/* Affichage du contenu HTML pour la description du poste */}
            <div 
                className="mb-2 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: postDescription }}
            />
            
            <h3 className="font-bold font-fractul text-[30px] mb-2 dark:text-white w-fit">Profil recherché</h3>
            
            {/* Affichage du contenu HTML pour le profil recherché */}
            <div 
                className="mb-2 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: searchProfil }}
            />
        </section>
    )
}