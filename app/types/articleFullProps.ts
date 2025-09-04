export interface ArticleFullProps {
    id: string;
    category?: string;
    title: string;
    authorName: string;
    authorEmail?: string;
    date: string;
    imageUrl: string;
    content: string;
    paywall?: boolean;
}