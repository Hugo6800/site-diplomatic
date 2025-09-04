'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { UserWithId } from '@/app/hooks/useUserManagement'
import { Timestamp } from 'firebase/firestore'
import TagRole from '@/app/components/TagRole'
import { useAuth } from '@/app/hooks/useAuth'
import { useState } from 'react'
import SearchFilter from './SearchFilter'

interface UsersTableProps {
    users: UserWithId[]
    roles: string[]
    openRoleMenu: string | null
    confirmDelete: string | null
    loading: boolean
    searching: boolean
    formatDate: (timestamp: Timestamp) => string
    changeUserRole: (userId: string, newRole: string, currentUserId?: string) => Promise<{ success: boolean, isCurrentUser: boolean | undefined }>
    deleteUser: (userId: string) => Promise<void>
    searchUsersByEmail: (emailPrefix: string) => Promise<void>
    fetchAllUsers: () => Promise<void>
    setOpenRoleMenu: (userId: string | null) => void
    setConfirmDelete: (userId: string | null) => void
}

export default function UsersTable({
    users,
    roles,
    openRoleMenu,
    confirmDelete,
    loading,
    searching,
    formatDate,
    changeUserRole,
    deleteUser,
    searchUsersByEmail,
    fetchAllUsers,
    setOpenRoleMenu,
    setConfirmDelete
}: UsersTableProps) {
    const router = useRouter();
    const { user: currentUser } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Gestion de la recherche directement dans Firestore
    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        
        if (term.length >= 3) {
            // Rechercher dans Firestore
            await searchUsersByEmail(term.toLowerCase().trim());
        } else if (term === '') {
            // Si la recherche est vide, charger tous les utilisateurs
            await fetchAllUsers();
        }
    };
    
    // Fonction pour gérer le changement de rôle avec redirection si nécessaire
    const handleRoleChange = async (userId: string, newRole: string) => {
        // Vérifier si l'utilisateur est connecté
        if (!currentUser) return;
        
        // Appeler la fonction de changement de rôle avec l'ID de l'utilisateur actuel
        const result = await changeUserRole(userId, newRole, currentUser.uid);
        
        // Si l'utilisateur a changé son propre rôle et n'est plus admin, rediriger vers la page profil
        if (result.success && result.isCurrentUser && newRole !== 'admin') {
            // Attendre un peu pour que la modification soit prise en compte
            setTimeout(() => {
                router.push('/profil');
            }, 500);
        }
    };
    return (
        <div>
            <SearchFilter 
                placeholder="Rechercher par email..."
                onSearch={handleSearch}
                searchFields={['email']}
                className="mb-6"
                minCharacters={3}
                searchMode="startsWith"
            />
            
            <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/mail.svg" alt="Email" width={20} height={20} className="dark:invert" />
                                <span className="dark:text-[#EECECE]">E-Mail</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/event_upcoming.svg" alt="Date" width={20} height={20} className="dark:invert" />
                                <span className="dark:text-[#EECECE]">{`Date d'inscription`}</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/assignment_ind.svg" alt="Rôle" width={20} height={20} className="dark:invert" />
                                <span className="dark:text-[#EECECE]">Rôle</span>
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
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold dark:text-[#EECECE]">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold dark:text-[#EECECE]">
                                {formatDate(user.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold dark:text-[#EECECE]">
                                <div className="relative">
                                    <button 
                                        onClick={() => setOpenRoleMenu(openRoleMenu === user.id ? null : user.id)}
                                        className="flex items-center w-full cursor-pointer"
                                    >
                                        <div className="relative w-full">
                                            <TagRole role={user.role} />
                                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-4 h-4" fill="#1B0505" stroke="#1B0505" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={openRoleMenu === user.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                    
                                    {openRoleMenu === user.id && (
                                        <div className="absolute z-10 mt-1 w-full bg-[#F3DEDE] rounded-2xl py-2 px-1 shadow-lg">
                                            <div className="flex flex-col gap-2" role="menu" aria-orientation="vertical">
                                                {/* N'afficher que les rôles différents du rôle actuel */}
                                                {roles.filter(roleOption => roleOption !== user.role).map(roleOption => (
                                                    <button
                                                        key={roleOption}
                                                        onClick={() => handleRoleChange(user.id, roleOption)}
                                                        className="w-full cursor-pointer"
                                                        role="menuitem"
                                                    >
                                                        <TagRole role={roleOption} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="pl-6 py-4 whitespace-nowrap text-[1rem] font-semibold dark:text-[#EECECE]">
                                {confirmDelete === user.id ? (
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={async () => {
                                                await deleteUser(user.id);
                                                // Rafraîchir la liste des utilisateurs après la suppression
                                                await fetchAllUsers();
                                            }}
                                            className="text-[#4D0506] bg-[#B9B9B9] cursor-pointer px-2 py-1 rounded-2xl text-[1rem] font-semibold dark:bg-[#414141] dark:text-[#EECECE]"
                                        >
                                            Confirmer
                                        </button>
                                        <button 
                                            onClick={() => setConfirmDelete(null)}
                                            className="text-white bg-red-500 cursor-pointer px-2 py-1 rounded-2xl text-[1rem] font-semibold"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => user.role !== 'admin' && setConfirmDelete(user.id)}
                                        className={`p-2 w-full rounded-full text-[12px] sm:text-[14px] font-bold font-neulisalt flex items-center justify-center gap-1 ${user.role === 'admin' 
                                            ? 'text-[#4D0506] bg-[#B9B9B9] dark:bg-[#414141] cursor-not-allowed' 
                                            : 'text-[#4D0506] bg-[#F58688] dark:bg-[#560C0E] dark:text-[#979797] cursor-pointer'}`}
                                        disabled={user.role === 'admin'}
                                        title="Supprimer l'utilisateur"
                                    >
                                        <Image src="/icons/delete_forever.svg" alt="Supprimer" width={16} height={16} className={user.role === 'admin' ? 'opacity-50 dark:invert' : 'dark:invert'} />
                                        <span className="sm:inline dark:text-[#979797]">Supprimer</span>
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {users.length === 0 && searchTerm && !loading && !searching && (
                <div className="text-center py-4 text-gray-500 font-neulisalt dark:text-[#EECECE]">
                    Aucun utilisateur trouvé pour cette recherche
                </div>
            )}
            
            {searching && (
                <div className="text-center py-4 text-gray-500 font-neulisalt dark:text-[#EECECE]">
                    Recherche en cours...
                </div>
            )}
        </div>
    </div>
    )
}
