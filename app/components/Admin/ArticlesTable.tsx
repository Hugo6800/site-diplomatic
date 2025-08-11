'use client'

import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'
import TagArticle from '@/app/components/TagArticle'

interface Article {
    id: string
    title: string
    createdAt: Timestamp
    category: string
    authorEmail: string
    status: 'published' | 'waiting'
}

interface ArticlesTableProps {
    articles: Article[]
    formatDate: (timestamp: Timestamp) => string
}

export default function ArticlesTable({
    articles,
    formatDate,
}: ArticlesTableProps) {
    
    // Fonction pour obtenir le texte du statut
    const getStatusText = (status: string) => {
        switch (status) {
            case 'published':
                return 'Publié';
            case 'waiting':
                return 'A valider';
            default:
                return 'Inconnu';
        }
    };

    // Fonction pour obtenir la classe CSS du statut
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-[#9AF2A3] text-[#1B0505]';
            case 'waiting':
                return 'bg-[#F2CF9A] text-[#1B0505]';
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
                                <Image src="/icons/title.svg" alt="Titre" width={20} height={20} className="dark:invert" />
                                <span>Titre</span>
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
                                <Image src="/icons/category.svg" alt="Catégorie" width={20} height={20} className="dark:invert" />
                                <span>Catégorie</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/person_edit.svg" alt="Auteur" width={20} height={20} className="dark:invert" />
                                <span>Auteur</span>
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
                    {articles.map((article) => (
                        <tr key={article.id}>
                            <td className="px-4 py-2 text-[1rem] font-semibold">
                                <div className="line-clamp-2">{article.title}</div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold">
                                {formatDate(article.createdAt)}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold">
                                <TagArticle name={article.category} className={`tag-${article.category.toLowerCase()}`} />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold">
                                {article.authorEmail}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold">
                                <div className={`flex items-center justify-center gap-2 px-5 py-1 rounded-full ${getStatusClass(article.status)}`}>
                                    <Image 
                                        src={article.status === 'published' ? '/icons/check_circle.svg' : '/icons/arrow_upload_progress.svg'} 
                                        alt={article.status === 'published' ? 'Publié' : 'En attente'} 
                                        width={16} 
                                        height={16} 
                                        className="dark:invert" 
                                    />
                                    <span className="min-w-[60px] text-center">{getStatusText(article.status)}</span>
                                </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 rounded-full text-[14px] font-bold font-neulisalt flex items-center gap-1 text-[#4D0506] bg-[#F3DEDE] cursor-pointer">
                                        <Image src="/icons/edit.svg" alt="Éditer" width={16} height={16} />
                                        Éditer
                                    </button>
                                    <button className="p-2 rounded-full flex items-center justify-center text-[#4D0506] bg-[#F58688] cursor-pointer w-10 h-10">
                                        <Image src="/icons/delete_forever.svg" alt="Supprimer" width={20} height={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
