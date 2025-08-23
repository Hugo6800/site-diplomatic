import { Timestamp } from "firebase/firestore";

export interface FirestoreArticle {
    id: number;
    title: string;
    authorName: string;
    category: string;
    content: string;
    imageUrl: string;
    createdAt: Timestamp;
    paywall?: boolean;
}