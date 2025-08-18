'use client'

import LastJob from "../LastJob";
import { collection, getDocs, orderBy, query, limit, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from "react";

interface JobOffer {
    id: string;
    title: string;
    shortDescription: string;
    createdAt: Timestamp;
}

export default function LastJobSection() {
    const [latestJob, setLatestJob] = useState<JobOffer | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchLatestJob() {
            setIsLoading(true);
            try {
                const jobsRef = collection(db, 'jobs');
                // Query the most recent job offer by creation date
                const q = query(jobsRef, orderBy('createdAt', 'desc'), limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const jobDoc = querySnapshot.docs[0];
                    const jobData = jobDoc.data();
                    setLatestJob({
                        id: jobDoc.id,
                        title: jobData.title,
                        shortDescription: jobData.shortDescription,
                        createdAt: jobData.createdAt
                    });
                }
            } catch (error) {
                console.error('Error fetching latest job:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchLatestJob();
    }, []);

    if (isLoading) {
        return (
            <section className="pt-24 my-16">
                <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Dernière offre</h2>
                <div className="animate-pulse mt-4">
                    <div className="flex flex-col gap-4">
                        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-24 my-16">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Dernière offre</h2>
            {latestJob ? (
                <LastJob
                    title={latestJob.title}
                    shortDescription={latestJob.shortDescription}
                    id={latestJob.id}
                />
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Aucune offre disponible pour le moment.</p>
            )}
        </section>
    )
}