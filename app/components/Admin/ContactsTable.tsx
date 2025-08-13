'use client'

import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'

interface ContactSubmission {
    id: string
    name: string
    email: string
    theme: string
    subject: string
    message: string
    timestamp: Timestamp
    status: 'closed' | 'open'
}

interface ContactsTableProps {
    submissions: ContactSubmission[]
    formatDate: (timestamp: Timestamp) => string
    openStatusMenu: string | null
    setOpenStatusMenu: (submissionId: string | null) => void
    changeSubmissionStatus?: (submissionId: string, newStatus: 'closed' | 'open') => Promise<void>
}

export default function ContactsTable({
    submissions,
    formatDate,
    openStatusMenu,
    setOpenStatusMenu,
    changeSubmissionStatus
}: ContactsTableProps) {
    
    // Fonction pour obtenir le texte du statut
    const getStatusText = (status: string) => {
        switch (status) {
            case 'open':
                return 'Ouvert';
            case 'closed':
                return 'Traité';
            default:
                return 'Inconnu';
        }
    };

    // Fonction pour obtenir la classe CSS du statut
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'open':
                return 'bg-[#F2CF9A] text-[#1B0505]';
            case 'closed':
                return 'bg-[#9AF2A3] text-[#1B0505]';
            default:
                return 'bg-gray-200 text-gray-700';
        }
    };

    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/account_circle.svg" alt="Nom" width={20} height={20} className="dark:invert" />
                                <span>Nom</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/event_upcoming.svg" alt="Date" width={20} height={20} className="dark:invert" />
                                <span>Date</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/category.svg" alt="Thème" width={20} height={20} className="dark:invert" />
                                <span>Thème</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/topic.svg" alt="Sujet" width={20} height={20} className="dark:invert" />
                                <span>Sujet</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/mail.svg" alt="Email" width={20} height={20} className="dark:invert" />
                                <span>Email</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/app_badging.svg" alt="Statut" width={20} height={20} className="dark:invert" />
                                <span>Statut</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/subject.svg" alt="Contenu" width={20} height={20} className="dark:invert" />
                                <span>Contenu</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission) => (
                        <tr key={submission.id}>
                            <td className="px-4 py-2 text-[1rem] font-semibold">
                                <div className="line-clamp-2">{submission.name}</div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold">
                                {formatDate(submission.timestamp)}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold">
                                {submission.theme}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold">
                                {submission.email}
                            </td>
                            <td className="px-4 py-2 text-[1rem] font-semibold">
                                <div className="line-clamp-2">{submission.subject}</div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold">
                                <div className="relative">
                                    <button 
                                        onClick={() => setOpenStatusMenu(openStatusMenu === submission.id ? null : submission.id)}
                                        className="cursor-pointer w-full"
                                    >
                                        <div className={`flex items-center justify-center gap-2 px-5 py-1 rounded-full ${getStatusClass(submission.status)}`}>
                                            <Image 
                                                src={submission.status === 'closed' ? '/icons/check_circle.svg' : '/icons/arrow_upload_progress.svg'} 
                                                alt={submission.status === 'closed' ? 'Traité' : 'Ouvert'} 
                                                width={16} 
                                                height={16} 
                                                className="dark:invert" 
                                            />
                                            <span className="min-w-[60px] text-center">{getStatusText(submission.status)}</span>
                                            <div className="ml-1">
                                                <svg className="w-4 h-4" fill="#1B0505" stroke="#1B0505" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={openStatusMenu === submission.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                    
                                    {openStatusMenu === submission.id && (
                                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-[#1E1E1E] rounded-lg py-2 px-1 shadow-lg">
                                            <div className="flex flex-col gap-2" role="menu" aria-orientation="vertical">
                                                {submission.status !== 'closed' && (
                                                    <button
                                                        onClick={() => {
                                                            if (changeSubmissionStatus) {
                                                                changeSubmissionStatus(submission.id, 'closed');
                                                                setOpenStatusMenu(null);
                                                            }
                                                        }}
                                                        className="w-full cursor-pointer"
                                                        role="menuitem"
                                                    >
                                                        <div className="flex items-center justify-center gap-2 px-5 py-1 rounded-full bg-[#9AF2A3] text-[#1B0505]">
                                                            <Image src="/icons/check_circle.svg" alt="Traité" width={16} height={16} />
                                                            <span className="min-w-[60px] text-center">Traité</span>
                                                        </div>
                                                    </button>
                                                )}
                                                {submission.status !== 'open' && (
                                                    <button
                                                        onClick={() => {
                                                            if (changeSubmissionStatus) {
                                                                changeSubmissionStatus(submission.id, 'open');
                                                                setOpenStatusMenu(null);
                                                            }
                                                        }}
                                                        className="w-full cursor-pointer"
                                                        role="menuitem"
                                                    >
                                                        <div className="flex items-center justify-center gap-2 px-5 py-1 rounded-full bg-[#F2CF9A] text-[#1B0505]">
                                                            <Image src="/icons/arrow_upload_progress.svg" alt="Ouvert" width={16} height={16} />
                                                            <span className="min-w-[60px] text-center">Ouvert</span>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-2 text-[1rem] font-semibold">
                                <div className="line-clamp-2">
                                    {submission.message.split(' ').slice(0, 6).join(' ')}
                                    {submission.message.split(' ').length > 6 ? '...' : ''}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
