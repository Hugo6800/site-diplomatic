'use client'
import JobFull from "@/app/components/JobFull";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

// Define the Job interface
interface Job {
    id: string;
    title: string;
    shortDescription: string;
    postDescription: string;
    searchProfil: string;
}

export default function JobBoard() {
    const { id } = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the job data from Firestore using the ID
        const fetchJob = async () => {
            if (!id) return;
            
            setLoading(true);
            try {
                // Get the job document from Firestore
                const jobRef = doc(db, 'jobs', id as string);
                const jobSnap = await getDoc(jobRef);
                
                if (jobSnap.exists()) {
                    const jobData = jobSnap.data();
                    setJob({
                        id: jobSnap.id,
                        title: jobData.title,
                        shortDescription: jobData.shortDescription,
                        postDescription: jobData.postDescription,
                        searchProfil: jobData.searchProfil
                    });
                } else {
                    console.log('No job found with this ID');
                    setJob(null);
                }
            } catch (error) {
                console.error("Error fetching job:", error);
                setJob(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    if (loading) {
        return (
            <main className="px-6 md:px-24 xl:px-64 mt-32">
                <div className="pt-24 my-16">Loading job details...</div>
            </main>
        );
    }

    if (!job) {
        return (
            <main className="px-6 md:px-24 xl:px-64 mt-32">
                <div className="pt-24 my-16">Job not found</div>
            </main>
        );
    }

    return (
        <main className="px-6 md:px-24 xl:px-64 mt-32">
            <JobFull 
                id={job.id}
                title={job.title}
                shortDescription={job.shortDescription}
                postDescription={job.postDescription}
                searchProfil={job.searchProfil}
            />
        </main>
    );
}