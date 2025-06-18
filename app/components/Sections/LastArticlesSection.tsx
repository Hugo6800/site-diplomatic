import Article from "../Article";
import { articles } from "@/app/utils/articles";

export default function LastArticlesSection() {
    const sortedArticles = articles
        .filter(article => article.spotlight === false)
        .sort((a, b) => {
            const dateA = new Date(a.date.split('.').reverse().join('-'));
            const dateB = new Date(b.date.split('.').reverse().join('-'));
            return dateB.getTime() - dateA.getTime();
        });

    return (
        <section className="flex flex-col gap-4 p-4 mt-28">
            <h2 className="font-bold text-[2rem]">Derniers articles</h2>
            {sortedArticles.map(article => (
                <Article
                    key={article.id}
                    colorCircle={`bg-tag-${article.category.toLowerCase()}`}
                    name={article.category}
                    className={`text-tag-${article.category.toLowerCase()} border-2 border-tag-${article.category.toLowerCase()} transition-colors`}
                    author={article.author}
                    title={article.title}
                    date={article.date}
                    coverImage={article.coverImage}
                />
            ))}
        </section>
    )
}