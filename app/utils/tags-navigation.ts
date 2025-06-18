export interface TagNavigation {
    name: string;
    href: string;
    colorCircle: string;
    className: string;
}

export const tagsNavigation: TagNavigation[] = [
    {
        name: "Tous",
        href: "/",
        colorCircle: "bg-tag-all",
        className: "text-tag-all border-2 border-tag-all transition-colors"
    },
    {
        name: "Culture",
        href: "/culture",
        colorCircle: "bg-tag-culture",
        className: "text-tag-culture border-2 border-tag-culture transition-colors"
    },
    {
        name: "Société",
        href: "/societe",
        colorCircle: "bg-tag-societe",
        className: "text-tag-societe border-2 border-tag-societe transition-colors"
    },
    {
        name: "Politique",
        href: "/politique",
        colorCircle: "bg-tag-politic",
        className: "text-tag-politic border-2 border-tag-politic transition-colors"
    },
    {
        name: "International",
        href: "/international",
        colorCircle: "bg-tag-international",
        className: "text-tag-international border-2 border-tag-international transition-colors"
    }
]