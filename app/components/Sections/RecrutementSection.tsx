'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, Timestamp, where } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { formatDate } from '@/app/utils/formatDate'
import JobsTable from '@/app/components/Admin/JobsTable'
import CandidatesTable from '@/app/components/Admin/CandidatesTable'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface JobOffer {
    id: string
    title: string
    createdAt: Timestamp
    publishedAt: string
}

interface Candidate {
    id: string
    fullName: string
    createdAt: Timestamp
    submittedAt: string
    jobId: string
}

export default function RecrutementSection() {
    const [jobs, setJobs] = useState<JobOffer[]>([])
    const [candidates, setCandidates] = useState<Candidate[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
    const [selectedJobTitle, setSelectedJobTitle] = useState<string>('')
    const router = useRouter();

    // Récupération des offres d'emploi
    useEffect(() => {
        async function fetchJobs() {
            if (selectedJobId) return; // Ne pas charger les jobs si on affiche les candidatures

            setLoading(true)
            try {
                const jobsRef = collection(db, 'jobs')
                const q = query(jobsRef, orderBy('createdAt', 'desc'))
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    const jobsData = querySnapshot.docs.map(doc => {
                        const data = doc.data()
                        return {
                            id: doc.id,
                            title: data.title || 'Sans titre',
                            createdAt: data.createdAt,
                            publishedAt: data.createdAt ? formatDate(new Date(data.createdAt.seconds * 1000)) : 'Date inconnue'
                        }
                    })
                    setJobs(jobsData)
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des offres d\'emploi:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [selectedJobId])

    // Récupération des candidatures pour une offre spécifique
    useEffect(() => {
        async function fetchCandidates() {
            if (!selectedJobId) return; // Ne charger les candidatures que si un job est sélectionné

            setLoading(true)
            try {
                const candidatesRef = collection(db, 'candidates')
                const q = query(
                    candidatesRef,
                    where('jobId', '==', selectedJobId),
                    orderBy('createdAt', 'desc')
                )
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    const candidatesData = querySnapshot.docs.map(doc => {
                        const data = doc.data()
                        return {
                            id: doc.id,
                            fullName: data.name || 'Candidat sans nom',
                            createdAt: data.createdAt,
                            submittedAt: data.createdAt ? 
                                // Gérer à la fois les objets Timestamp et les chaînes ISO
                                (data.createdAt.seconds ? 
                                    formatDate(new Date(data.createdAt.seconds * 1000)) : 
                                    formatDate(new Date(data.createdAt))
                                ) : 'Date inconnue',
                            jobId: data.jobId
                        }
                    })
                    setCandidates(candidatesData)
                } else {
                    setCandidates([])
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des candidatures:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCandidates()
    }, [selectedJobId])

    // Fonction pour afficher les candidatures d'une offre
    const handleViewCandidates = (jobId: string, jobTitle: string) => {
        setSelectedJobId(jobId)
        setSelectedJobTitle(jobTitle)
    }

    return (
        <section className="my-12">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">
                {selectedJobId ? `Candidatures: ${selectedJobTitle}` : 'Recrutement'}
            </h2>
            <button
                onClick={() => router.push('/profil')}
                className="flex justify-center items-center gap-2 lg:w-1/4 px-2 py-4 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer my-6"
            >
                <Image
                    src="/icons/arrow-left.svg"
                    alt="Retour"
                    width={24}
                    height={24}
                />
                Retour au compte
            </button>

            {selectedJobId ? (
                <CandidatesTable
                    candidates={candidates}
                    loading={loading}
                    jobId={selectedJobId}
                />
            ) : (
                <JobsTable
                    jobs={jobs}
                    loading={loading}
                    onViewCandidates={handleViewCandidates}
                />
            )}
        </section>
    )
}