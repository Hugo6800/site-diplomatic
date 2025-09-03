'use client'

import { useSearchParams } from 'next/navigation';
import JobApplicationForm from '../components/Forms/JobApplicationForm';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function ApplyJobContent() {
    const searchParams = useSearchParams();
    const jobId = searchParams.get('jobId');
    const [jobTitle, setJobTitle] = useState<string>('');
    
    useEffect(() => {
        async function fetchJobTitle() {
            if (jobId) {
                try {
                    const jobRef = doc(db, 'jobs', jobId);
                    const jobSnap = await getDoc(jobRef);
                    
                    if (jobSnap.exists()) {
                        setJobTitle(jobSnap.data().title);
                    }
                } catch (error) {
                    console.error('Error fetching job title:', error);
                }
            }
        }
        
        fetchJobTitle();
    }, [jobId]);
    
    return (
        <main className="px-6 md:px-24 xl:px-64 mt-32 pb-16">
            <h2 className="font-bold font-fractul text-5xl mb-8 dark:text-white w-fit">Postuler</h2>
            
            {jobId ? (
                <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-bold">Référence de l&apos;offre: {jobId}</p>
                    {jobTitle && <p className="font-bold mt-1">Poste: {jobTitle}</p>}
                </div>
            ) : null}
            
            <JobApplicationForm jobId={jobId || undefined} />
        </main>
    )
}