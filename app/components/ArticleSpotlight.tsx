import Image from "next/image";
import TagNavigationArticles from "./Header/TagNavigationArticles";

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
        <article className="flex flex-col md:flex-row">
            <div className="flex flex-col md:w-1/2">
                <TagNavigationArticles
                    colorCircle={colorCircle}
                    name={name}
                    className={className}
                    variant="article"
                />
                <p className="mt-2 font-semibold text-[1rem]">{author} - {date}</p>
                <h3 className="font-bold text-5xl font-fractul line-clamp-3 tracking-[0.03em] leading-[110%]">{title}</h3>
            </div>
            <Image
                src={coverImage}
                alt="Image"
                width={200}
                height={100}
                className="w-full md:w-1/2 h-auto mt-4"
            />
        </article>
    )
}