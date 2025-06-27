'use client'

import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from "react";
import LastPodcast from '../LastPodcast';

interface LastPodcastProps {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    duration: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
}

export default function LastPodcastSection() {
    const [podcast, setPodcast] = useState<LastPodcastProps | null>(null);

    useEffect(() => {
        async function fetchSpotlightArticle() {
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
                    duration: data.duration,
                    createdAt: data.createdAt,
                });
            }
        }

        fetchSpotlightArticle();
    }, []);

    return (
        <section className="pt-24 my-16">
            <h2 className="font-bold font-neulisalt text-[2rem]">Dernier podcast</h2>
            <LastPodcast
                coverUrl={podcast?.coverUrl || ''}
                duration={podcast?.duration || ''}
                date={podcast?.createdAt.seconds.toString() || ''}
                title={podcast?.title || ''}
                description={podcast?.description || ''}
            />
        </section>
    );
}