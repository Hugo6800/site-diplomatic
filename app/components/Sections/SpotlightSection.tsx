import { articles } from "@/app/utils/articles";
import ArticleSpotlight from "../ArticleSpotlight";

export default function SpotlightSection() {
    const spotlightArticle = articles.find(article => article.spotlight)

    if (!spotlightArticle) return null

    return (
        <section className="flex flex-col gap-4 mt-28 lg:mt-48">
            <h2 className="font-bold text-[2rem]">À la une</h2>
            <ArticleSpotlight
                key={spotlightArticle.id}
                colorCircle={`bg-tag-${spotlightArticle.category.toLowerCase()}`}
                name={spotlightArticle.category}
                className={`text-tag-${spotlightArticle.category.toLowerCase()} border-2 border-tag-${spotlightArticle.category.toLowerCase()} transition-colors`}
                author={spotlightArticle.author}
                title={spotlightArticle.title}
                date={spotlightArticle.date}
                coverImage={spotlightArticle.coverImage}
            />
        </section>
    )
}