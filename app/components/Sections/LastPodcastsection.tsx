'use client'

import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from "react";
import LastPodcast from '../LastPodcast';
import { LastPodcastSectionProps } from '@/app/types/LastPodcast';

export default function LastPodcastSection() {
    const [podcast, setPodcast] = useState<LastPodcastSectionProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSpotlightArticle() {
            setIsLoading(true);
            const articlesRef = collection(db, 'podcasts');
            const q = query(articlesRef);
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
                const data = lastDoc.data();
                setPodcast({
                    id: lastDoc.id,
                    title: data.title,
                    description: data.description,
                    coverUrl: data.coverUrl,
                    spotifyId: data.spotifyId,
                    duration: data.duration,
                    createdAt: data.createdAt,
                });
            }
            setIsLoading(false);
        }

        fetchSpotlightArticle();
    }, []);

    if (isLoading) {
        return (
            <section className="pt-24 my-16">
                <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#433D3D] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-[#EECECE] w-fit">Dernier podcast</h2>
                <div className="animate-pulse mt-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="w-full lg:w-[200px] h-[200px] bg-gray-200 rounded-lg"></div>
                        <div className="flex flex-col gap-4 flex-1">
                            <div className="h-8 w-32 bg-gray-200 rounded"></div>
                            <div className="h-8 w-48 bg-gray-200 rounded"></div>
                            <div className="h-24 w-full bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-24 my-16">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#433D3D] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-[#EECECE] w-fit">Dernier podcast</h2>
            <LastPodcast
                coverUrl={podcast?.coverUrl || ''}
                duration={podcast?.duration || ''}
                date={podcast?.createdAt.seconds.toString() || ''}
                title={podcast?.title || ''}
                description={podcast?.description || ''}
                spotifyId={podcast?.spotifyId || ''}
            />
        </section>
    );
}