'use client'

import { useState, useEffect } from "react";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import CardPodcast from '../Cards/CardPodcast';
import { AllPodcastProps } from '@/app/types/allPodcast';

export default function AllPodcastsSection() {
    const [podcasts, setPodcasts] = useState<AllPodcastProps[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSpotlightArticle() {
            setIsLoading(true);
            const articlesRef = collection(db, 'podcasts');
            const q = query(articlesRef);
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const podcastsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    coverUrl: doc.data().coverUrl,
                    duration: doc.data().duration,
                    createdAt: doc.data().createdAt,
                    spotifyId: doc.data().spotifyId,
                }));
                setPodcasts(podcastsData);
            }
            setIsLoading(false);
        }

        fetchSpotlightArticle();
    }, []);

    if (isLoading) {
        return (
            <section className="pt-24 my-16">
                <h2 className="font-bold font-neulisalt text-[2rem]">Tous les épisodes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="animate-pulse mt-4">
                            <div className="w-full h-[200px] bg-gray-200 rounded-lg mb-4"></div>
                            <div className="flex flex-col gap-2">
                                <div className="h-8 w-32 bg-gray-200 rounded"></div>
                                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                                <div className="h-16 w-full bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="pt-24 my-16">
            <h2 className="font-bold font-neulisalt text-[2rem]">Tous les épisodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {podcasts?.map((podcast) => (
                    <CardPodcast
                        key={podcast.id}
                        coverUrl={podcast.coverUrl}
                        duration={podcast.duration}
                        date={podcast.createdAt.seconds.toString()}
                        title={podcast.title}
                        spotifyId={podcast.spotifyId}
                    />
                ))}
            </div>
        </section>
    )
}