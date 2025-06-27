export interface AllPodcastProps {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    duration: string;
    spotifyId: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
}