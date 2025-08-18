'use client'

import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'
import SearchFilter from './SearchFilter'
import { useState } from 'react'

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
    searchContactsByName?: (name: string) => Promise<void>
    searchContactsByEmail?: (email: string) => Promise<void>
    fetchAllSubmissions?: () => Promise<void>
    loading?: boolean
    searching?: boolean
}

export default function ContactsTable({
    submissions,
    formatDate,
    openStatusMenu,
    setOpenStatusMenu,
    changeSubmissionStatus,
    searchContactsByName,
    searchContactsByEmail,
    fetchAllSubmissions,
    loading,
    searching
}: ContactsTableProps) {
    // État local pour le terme de recherche et le mode de recherche (nom ou email)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchMode, setSearchMode] = useState<'name' | 'email'>('name')
    
    // Fonction pour gérer la recherche
    const handleSearch = (value: string, mode: 'contains' | 'startsWith') => {
        setSearchTerm(value)
        
        // Vérifier si les fonctions de recherche sont disponibles
        console.log('Fonctions de recherche disponibles:', {
            searchContactsByName: !!searchContactsByName,
            searchContactsByEmail: !!searchContactsByEmail,
            fetchAllSubmissions: !!fetchAllSubmissions
        });
        
        if (!value || value.length < 3) {
            // Si la recherche est vide ou trop courte, réinitialiser la liste
            console.log('Recherche trop courte, réinitialisation de la liste');
            fetchAllSubmissions?.();
            return;
        }
        
        // Log pour déboguer
        console.log(`Recherche avec mode: ${mode}, searchMode: ${searchMode}, valeur: ${value}`);
        
        if (searchMode === 'name' && searchContactsByName) {
            console.log('Recherche par nom:', value);
            searchContactsByName(value);
        } else if (searchMode === 'email' && searchContactsByEmail) {
            console.log('Recherche par email:', value);
            searchContactsByEmail(value);
        } else {
            console.warn('Aucune fonction de recherche appropriée disponible pour le mode:', searchMode);
        }
    };
    
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
            {/* Filtre de recherche */}
            <div className="mb-4">
                <div className="flex items-center space-x-4">
                    <SearchFilter 
                        onSearch={handleSearch}
                        placeholder={searchMode === 'name' ? "Rechercher par nom..." : "Rechercher par email..."}
                        className="flex-grow"
                    />
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setSearchMode('name')}
                            className={`px-3 py-1 rounded-md ${searchMode === 'name' ? 'bg-[#DE595C] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                        >
                            Nom
                        </button>
                        <button 
                            onClick={() => setSearchMode('email')}
                            className={`px-3 py-1 rounded-md ${searchMode === 'email' ? 'bg-[#DE595C] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                        >
                            Email
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Indicateur de chargement */}
            {(loading || searching) && (
                <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
                </div>
            )}
            
            {/* Message si aucun contact */}
            {!loading && !searching && submissions.length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    {searchTerm && searchTerm.length >= 3 ? 
                        "Aucun contact trouvé pour cette recherche." : 
                        "Aucun contact disponible."}
                </div>
            )}
            
            {/* Tableau des contacts */}
            {!loading && !searching && submissions.length > 0 && (
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
                                    <Image src="/icons/interests.svg" alt="Actions" width={20} height={20} className="dark:invert" />
                                    <span>Actions</span>
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
                                <td className="px-4 py-2 text-[1rem] font-semibold">
                                    <div className="line-clamp-2">
                                        {submission.theme.length > 20 ? `${submission.theme.substring(0, 20)}...` : submission.theme}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-[1rem] font-semibold">
                                    <div className="line-clamp-2">{submission.subject}</div>
                                </td>
                                <td className="px-4 py-2 text-[1rem] font-semibold">
                                    <div className="flex flex-col">
                                        <span className="truncate">{submission.email.substring(0, 14)}</span>
                                        {submission.email.length > 14 && (
                                            <span className="truncate">{submission.email.substring(14)}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-[1rem] font-semibold">
                                    <div className="line-clamp-2">
                                        {submission.message.split(' ').slice(0, 6).join(' ')}
                                        {submission.message.split(' ').length > 6 ? '...' : ''}
                                    </div>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
