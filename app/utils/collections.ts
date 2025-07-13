export interface Collection {
    id: number;
    name: string;
    icon: string;
    backgroundColor: string;
    titleColor: string;
}

export const collections: Collection[] = [
    {
        id: 1,
        name: "Culture",
        icon: "/icons/theater_comedy.svg",
        backgroundColor: "bg-background-tag-culture",
        titleColor: "text-tag-culture"
    },
    {
        id: 2,
        name: "Societe",
        icon: "/icons/family_restroom.svg",
        backgroundColor: "bg-background-tag-societe",
        titleColor: "text-tag-societe"
    },
    {
        id: 3,
        name: "International",
        icon: "/icons/language.svg",
        backgroundColor: "bg-background-tag-international",
        titleColor: "text-tag-international"
    },
    {
        id: 4,
        name: "Politique",
        icon: "/icons/balance.svg",
        backgroundColor: "bg-background-tag-politic",
        titleColor: "text-tag-politic"
    },
]