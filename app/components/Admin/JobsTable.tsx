'use client'

import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'

interface JobOffer {
    id: string
    title: string
    createdAt: Timestamp
    publishedAt: string
}

interface JobsTableProps {
    jobs: JobOffer[]
    loading: boolean
    onViewCandidates?: (jobId: string, jobTitle: string) => void
}

export default function JobsTable({ jobs, loading, onViewCandidates }: JobsTableProps) {
    return (
        <div className="overflow-x-auto rounded-lg shadow mt-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/mail.svg" alt="Titre" width={20} height={20} className="dark:invert" />
                                <span>Titre</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/event_upcoming.svg" alt="Date" width={20} height={20} className="dark:invert" />
                                <span>Date de publication</span>
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
                    ) : jobs.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                Aucune offre d&apos;emploi disponible
                            </td>
                        </tr>
                    ) : (
                        jobs.map((job) => (
                            <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold">
                                    {job.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold">
                                    {job.publishedAt}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <button 
                                            className="p-2 rounded-full cursor-pointer text-[12px] sm:text-[14px] font-bold font-neulisalt flex items-center justify-center gap-1 bg-[#F3DEDE] text-[#3F3F43] hover:bg-[#E6C9C9]"
                                            onClick={() => onViewCandidates && onViewCandidates(job.id, job.title)}
                                        >
                                            <span>Voir les candidatures</span>
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
