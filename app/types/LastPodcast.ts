export interface LastPodcastSectionProps {
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

export interface LastPodcastProps {
    coverUrl: string;
    duration: string;
    date: string;
    title: string;
    description: string;
    spotifyId: string;
}
