'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Timestamp } from 'firebase/firestore'
import TagArticle from '@/app/components/TagArticle'
import { useAuth } from '@/app/hooks/useAuth'
import SearchFilter from './SearchFilter'

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
    openStatusMenu: string | null
    setOpenStatusMenu: (articleId: string | null) => void
    changeArticleStatus?: (articleId: string, newStatus: 'published' | 'waiting') => Promise<{ success: boolean; error?: unknown }>
    searchArticlesByTitle?: (title: string) => Promise<void>
    fetchAllArticles?: () => Promise<void>
    deleteArticle?: (articleId: string) => Promise<void>
    loading?: boolean
    searching?: boolean
}

export default function ArticlesTable({
    articles,
    formatDate,
    openStatusMenu,
    setOpenStatusMenu,
    changeArticleStatus,
    searchArticlesByTitle,
    fetchAllArticles,
    deleteArticle,
    loading = false,
    searching = false
}: ArticlesTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    // Fonction pour gérer la recherche
    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        if (searchArticlesByTitle) {
            if (term.length >= 3) {
                await searchArticlesByTitle(term.toLowerCase().trim());
            } else if (term === '' && fetchAllArticles) {
                await fetchAllArticles();
            }
        }
    };

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
            {/* Filtre de recherche */}
            {searchArticlesByTitle && (
                <div className="mb-4">
                    <SearchFilter
                        onSearch={handleSearch}
                        placeholder="Rechercher par titre..."
                        searchMode="startsWith"
                        minCharacters={3}
                    />
                </div>
            )}

            {/* Message de chargement ou de recherche */}
            {(loading || searching) && (
                <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    <span className="ml-2">{searching ? 'Recherche en cours...' : 'Chargement...'}</span>
                </div>
            )}

            {/* Message si aucun résultat */}
            {!loading && !searching && articles.length === 0 && (
                <div className="text-center py-4">
                    {searchTerm ?
                        <p>Aucun article trouvé pour <strong>&ldquo;{searchTerm}&rdquo;</strong></p> :
                        <p>Aucun article disponible</p>
                    }
                </div>
            )}

            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/title.svg" alt="Titre" width={20} height={20} className="dark:invert" />
                                <span className="dark:text-[#EECECE]">Titre</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/event_upcoming.svg" alt="Date" width={20} height={20} className="dark:invert" />
                                <span className="dark:text-[#EECECE]">Date</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/category.svg" alt="Catégorie" width={20} height={20} className="dark:invert" />
                                <span className="dark:text-[#EECECE]">Catégorie</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/person_edit.svg" alt="Auteur" width={20} height={20} className="dark:invert" />
                                <span className="dark:text-[#EECECE]">Auteur</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/app_badging.svg" alt="Statut" width={20} height={20} className="dark:invert" />
                                <span className="dark:text-[#EECECE]">Statut</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/interests.svg" alt="Actions" width={20} height={20} className="dark:invert" />
                                <span className="dark:text-[#EECECE]">Actions</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id}>
                            <td className="px-4 py-2 text-[1rem] font-semibold dark:text-[#EECECE]  ">
                                <div className="line-clamp-2">{article.title}</div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold dark:text-[#EECECE]">
                                {formatDate(article.createdAt)}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold dark:text-[#EECECE]">
                                <TagArticle name={article.category || 'default'} className={`tag-${article.category ? article.category.toLowerCase() : 'default'}`} />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold dark:text-[#EECECE]">
                                {article.authorEmail}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold dark:text-[#EECECE]">
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenStatusMenu(openStatusMenu === article.id ? null : article.id)}
                                        className="cursor-pointer w-full"
                                    >
                                        <div className={`flex items-center justify-center gap-2 px-5 py-1 rounded-full ${getStatusClass(article.status)}`}>
                                            <Image
                                                src={article.status === 'published' ? '/icons/check_circle.svg' : '/icons/arrow_upload_progress.svg'}
                                                alt={article.status === 'published' ? 'Publié' : 'En attente'}
                                                width={16}
                                                height={16}
                                            />
                                            <span className="min-w-[60px] text-center">{getStatusText(article.status)}</span>
                                            <div className="ml-1">
                                                <svg className="w-4 h-4" fill="#1B0505" stroke="#1B0505" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={openStatusMenu === article.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </button>

                                    {openStatusMenu === article.id && (
                                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-[#1E1E1E] rounded-lg py-2 px-1 shadow-lg">
                                            <div className="flex flex-col gap-2" role="menu" aria-orientation="vertical">
                                                {article.status !== 'published' && (
                                                    <button
                                                        onClick={() => {
                                                            if (changeArticleStatus) {
                                                                changeArticleStatus(article.id, 'published');
                                                                setOpenStatusMenu(null);
                                                            }
                                                        }}
                                                        className="w-full cursor-pointer"
                                                        role="menuitem"
                                                    >
                                                        <div className="flex items-center justify-center gap-2 px-5 py-1 rounded-full bg-[#9AF2A3] text-[#1B0505]">
                                                            <Image
                                                                src="/icons/check_circle.svg"
                                                                alt="Publié"
                                                                width={16}
                                                                height={16}
                                                            />
                                                            <span className="min-w-[60px] text-center">Publié</span>
                                                        </div>
                                                    </button>
                                                )}
                                                {article.status !== 'waiting' && (
                                                    <button
                                                        onClick={() => {
                                                            if (changeArticleStatus) {
                                                                changeArticleStatus(article.id, 'waiting');
                                                                setOpenStatusMenu(null);
                                                            }
                                                        }}
                                                        className="w-full cursor-pointer"
                                                        role="menuitem"
                                                    >
                                                        <div className="flex items-center justify-center gap-2 px-5 py-1 rounded-full bg-[#F2CF9A] text-[#1B0505]">
                                                            <Image src="/icons/arrow_upload_progress.svg" alt="A valider" width={16} height={16} />
                                                            <span className="min-w-[60px] text-center">A valider</span>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-[1rem] font-semibold">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            // Vérifier si l'utilisateur connecté est l'auteur de l'article
                                            const isAuthor = user?.email === article.authorEmail;
                                            
                                            if (isAuthor) {
                                                // Rediriger vers la page d'édition
                                                router.push(`/edit-article/${article.id}`);
                                            } else {
                                                // Rediriger vers la page d'aperçu
                                                router.push(`/article/${article.id}?preview=true`);
                                            }
                                        }}
                                        className="min-w-[90px] p-2 rounded-full text-[12px] sm:text-[14px] font-bold font-neulisalt flex items-center justify-center gap-1 text-[#4D0506] bg-[#F3DEDE] cursor-pointer hover:bg-[#F3DEDE]/80 transition-colors"
                                        title={user?.email === article.authorEmail ? "Éditer l'article" : "Voir l'article"}
                                    >
                                        <Image 
                                            src={user?.email === article.authorEmail ? "/icons/edit.svg" : "/icons/visibility.svg"} 
                                            alt={user?.email === article.authorEmail ? "Éditer" : "Voir"} 
                                            width={16} 
                                            height={16} 
                                        />
                                        <span>{user?.email === article.authorEmail ? "Éditer" : "Voir"}</span>
                                    </button>
                                    {confirmingDelete === article.id ? (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => {
                                                    if (deleteArticle) {
                                                        deleteArticle(article.id);
                                                        setConfirmingDelete(null);
                                                    }
                                                }}
                                                className="p-2 rounded-full flex items-center justify-center text-white bg-green-600 cursor-pointer w-10 h-10 hover:bg-green-700 transition-colors"
                                                title="Confirmer la suppression"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => setConfirmingDelete(null)}
                                                className="p-2 rounded-full flex items-center justify-center text-white bg-red-600 cursor-pointer w-10 h-10 hover:bg-red-700 transition-colors"
                                                title="Annuler"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfirmingDelete(article.id)}
                                            className="p-2 rounded-full flex items-center justify-center text-[#4D0506] bg-[#F58688] cursor-pointer w-10 h-10 hover:bg-[#F58688]/80 transition-colors"
                                            title="Supprimer l'article"
                                        >
                                            <Image src="/icons/delete_forever.svg" alt="Supprimer" width={20} height={20} />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
