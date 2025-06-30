export interface SpotlightArticle {
    id: string;
    title: string;
    authorName: string;
    category: string;
    imageUrl: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
}