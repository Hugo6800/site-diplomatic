'use client'

import CardJob from "../CardJob";
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useEffect, useState } from "react";

interface JobOffer {
    id: string;
    title: string;
    shortDescription: string;
    createdAt: Timestamp;
}

export default function AllJobsSection() {
    const [jobs, setJobs] = useState<JobOffer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            setIsLoading(true);
            try {
                const jobsRef = collection(db, 'jobs');
                // Récupérer toutes les offres triées par date (plus récente d'abord)
                const q = query(jobsRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Exclure la première offre (la plus récente) qui est déjà affichée dans LastJobSection
                    const allJobs = querySnapshot.docs.slice(1).map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            title: data.title,
                            shortDescription: data.shortDescription,
                            createdAt: data.createdAt
                        };
                    });
                    setJobs(allJobs);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchJobs();
    }, []);

    if (isLoading) {
        return (
            <section className="pt-24 my-16">
                <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Toutes les offres</h2>
                <div className="animate-pulse mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (jobs.length === 0) {
        return null; 
    }

    return (
        <section className="mb-16">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Autres offres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div key={job.id} className="cursor-pointer" onClick={() => window.location.href = `/jobboard/${job.id}`}>
                        <CardJob title={job.title} />
                    </div>
                ))}
            </div>
        </section>
    )
}