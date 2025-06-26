import Image from "next/image";
import TagNavigationArticles from "./TagNavigationArticles";

interface ArticleProps {
    colorCircle: string;
    name: string;
    className: string;
    author: string;
    title: string;
    date: string;
    coverImage: string;
}

export default function Article({ colorCircle, name, className, author, title, date, coverImage }: ArticleProps) {
    return (
        <article className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:w-1/2">
                <TagNavigationArticles
                    colorCircle={colorCircle}
                    name={name}
                    className={className}
                    variant="article"
                />
                <p className="mt-2 font-semibold text-[1rem] font-neulisalt">{author} - {date}</p>
                <h3 className="font-bold font-fractul text-5xl line-clamp-3 tracking-[0.03em] leading-[110%]">{title}</h3>
            </div>
            <Image
                src={coverImage}
                alt="Image"
                width={800}
                height={400}
                quality={100}
                className="w-full md:w-1/2 h-auto mt-4 object-cover"
            />
        </article>
    )
}