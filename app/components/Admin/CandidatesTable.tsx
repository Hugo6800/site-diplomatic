'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'
import CandidateResponseView from './CandidateResponseView'
import { useRouter } from 'next/navigation'

interface Candidate {
    id: string
    fullName: string
    createdAt: Timestamp
    submittedAt: string
    jobId: string
}

interface CandidatesTableProps {
    candidates: Candidate[]
    loading: boolean
    jobId?: string
}

export default function CandidatesTable({ candidates, loading, jobId }: CandidatesTableProps) {
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null)
    const router = useRouter()
    
    const handleViewResponse = (candidateId: string) => {
        setSelectedCandidateId(candidateId)
        // Update URL to include the candidate ID
        if (jobId) {
            router.push(`/recrutement?candidats=${jobId}&candidat=${candidateId}`)
        }
    }
    
    if (selectedCandidateId) {
        return <CandidateResponseView candidateId={selectedCandidateId} />
    }
    return (
        <div className="overflow-x-auto rounded-lg shadow mt-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/mail.svg" alt="Nom" width={20} height={20} className="dark:invert" />
                                <span>Nom Prénom</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/event_upcoming.svg" alt="Date" width={20} height={20} className="dark:invert" />
                                <span>Date d&apos;envoi</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/interests.svg" alt="Actions" width={20} height={20} className="dark:invert" />
                                <span>Actions</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {loading ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-4 text-center">
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"></div>
                                    <span className="ml-2">Chargement...</span>
                                </div>
                            </td>
                        </tr>
                    ) : candidates.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                Aucune candidature disponible pour cette annonce
                            </td>
                        </tr>
                    ) : (
                        candidates.map((candidate) => (
                            <tr key={candidate.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold">
                                    {candidate.fullName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold">
                                    {candidate.submittedAt}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <button
                                            className="p-2 rounded-full cursor-pointer text-[12px] sm:text-[14px] font-bold font-neulisalt flex items-center justify-center gap-1 bg-[#F3DEDE] text-[#3F3F43] hover:bg-[#E6C9C9]"
                                            title="Voir la réponse"
                                            onClick={() => handleViewResponse(candidate.id)}
                                        >
                                            <span>Voir la réponse</span>
                                        </button>
                                        <button
                                            className="p-2 rounded-full text-[12px] sm:text-[14px] font-bold font-neulisalt flex items-center justify-center gap-1 bg-[#F58688] cursor-pointer"
                                            title="Supprimer"
                                        >
                                            <Image src="/icons/delete_forever.svg" alt="Supprimer" width={20} height={20} />
                                            <span className="sm:inline">Supprimer</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
