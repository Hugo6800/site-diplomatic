import ArticleOthers from "../ArticleOthers";
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
        <section className="flex flex-col gap-4 mt-28 mb-20">
            <h2 className="font-bold font-neulisalt text-[2rem]">Derniers articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedArticles.map(article => (
                    <ArticleOthers
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
            </div>
        </section >
    )
}