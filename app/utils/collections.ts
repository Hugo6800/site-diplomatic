export interface Collection {
    id: number;
    name: string;
    description: string;
    colorCircle: string;
    backgroundColor: string;
    titleColor: string;
}

export const collections: Collection[] = [
    {
        id: 4,
        name: "Culture",
        description: "Description 4",
        colorCircle: "bg-tag-culture",
        backgroundColor: "bg-background-tag-culture",
        titleColor: "text-tag-culture"
    },
    {
        id: 2,
        name: "Societe",
        description: "Description 2",
        colorCircle: "bg-tag-societe",
        backgroundColor: "bg-background-tag-societe",
        titleColor: "text-tag-societe"
    },
    {
        id: 1,
        name: "International",
        description: "Description 1",
        colorCircle: "bg-tag-international",
        backgroundColor: "bg-background-tag-international",
        titleColor: "text-tag-international"
    },
    {
        id: 3,
        name: "Politique",
        description: "Description 3",
        colorCircle: "bg-tag-politic",
        backgroundColor: "bg-background-tag-politic",
        titleColor: "text-tag-politic"
    },
]