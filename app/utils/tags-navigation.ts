export interface TagNavigation {
    name: string;
    href: string;
    colorCircle: string;
    className: string;
    backgroundArticle: string;
}

export const tagsNavigation: TagNavigation[] = [
    {
        name: "Tous",
        href: "/",
        colorCircle: "bg-tag-all",
        className: "text-tag-all border-2 border-tag-all transition-colors",
        backgroundArticle: "background-tag-all"
    },
    {
        name: "Culture",
        href: "/culture",
        colorCircle: "bg-tag-culture",
        className: "text-tag-culture border-2 border-tag-culture transition-colors",
        backgroundArticle: "background-tag-culture"
    },
    {
        name: "Societe",
        href: "/societe",
        colorCircle: "bg-tag-societe",
        className: "text-tag-societe border-2 border-tag-societe transition-colors",
        backgroundArticle: "background-tag-societe"
    },
    {
        name: "Politique",
        href: "/politique",
        colorCircle: "bg-tag-politic",
        className: "text-tag-politic border-2 border-tag-politic transition-colors",
        backgroundArticle: "background-tag-politic"
    },
    {
        name: "International",
        href: "/international",
        colorCircle: "bg-tag-international",
        className: "text-tag-international border-2 border-tag-international transition-colors",
        backgroundArticle: "background-tag-international"
    }
]