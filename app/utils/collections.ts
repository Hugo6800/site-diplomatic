export interface Collection {
    id: number;
    name: string;
    icon: string;
    category: string;
}

export const collections: Collection[] = [
    {
        id: 1,
        name: "Culture",
        icon: "/icons/theater_comedy.svg",
        category: "culture"
    },
    {
        id: 2,
        name: "Societe",
        icon: "/icons/family_restroom.svg",
        category: "societe"
    },
    {
        id: 3,
        name: "International",
        icon: "/icons/language.svg",
        category: "international"
    },
    {
        id: 4,
        name: "Politique",
        icon: "/icons/balance.svg",
        category: "politic"
    },
]