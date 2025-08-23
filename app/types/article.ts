export interface Article {
    id: string;
    title: string;
    authorName: string;
    category: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    paywall?: boolean;
}