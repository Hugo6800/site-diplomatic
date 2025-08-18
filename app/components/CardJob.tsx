import Image from "next/image";

export default function CardJob({ title }: { title: string }) {
    return (
        <article className="flex items-center gap-2 w-[200px]">
            <Image
                src="/Logo_job.svg"
                alt="Logo job"
                width={200}
                height={200}
                className="w-[100px] h-[100px]"
            />  
            <h2 className="font-bold font-fractul text-xl mb-4 dark:text-white w-fit">{title}</h2>
        </article>
    )
}