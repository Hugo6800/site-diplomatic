'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { UserWithId } from '@/app/hooks/useUserManagement'
import { Timestamp } from 'firebase/firestore'
import TagRole from '@/app/components/TagRole'
import { useAuth } from '@/app/hooks/useAuth'

interface UsersTableProps {
    users: UserWithId[]
    roles: string[]
    openRoleMenu: string | null
    confirmDelete: string | null
    formatDate: (timestamp: Timestamp) => string
    changeUserRole: (userId: string, newRole: string, currentUserId?: string) => Promise<{ success: boolean, isCurrentUser: boolean | undefined }>
    deleteUser: (userId: string) => Promise<void>
    setOpenRoleMenu: (userId: string | null) => void
    setConfirmDelete: (userId: string | null) => void
}

export default function UsersTable({
    users,
    roles,
    openRoleMenu,
    confirmDelete,
    formatDate,
    changeUserRole,
    deleteUser,
    setOpenRoleMenu,
    setConfirmDelete
}: UsersTableProps) {
    const router = useRouter();
    const { user: currentUser } = useAuth();
    
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
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/mail.svg" alt="Email" width={20} height={20} className="dark:invert" />
                                <span>E-Mail</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/event_upcoming.svg" alt="Date" width={20} height={20} className="dark:invert" />
                                <span>{`Date d'inscription`}</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold tracking-wider text-[#3F3F43] dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Image src="/icons/assignment_ind.svg" alt="Rôle" width={20} height={20} className="dark:invert" />
                                <span>Rôle</span>
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
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold">
                                {formatDate(user.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold">
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
                            <td className="px-6 py-4 whitespace-nowrap text-[1rem] font-semibold">
                                {confirmDelete === user.id ? (
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => deleteUser(user.id)}
                                            className="text-[#4D0506] bg-[#F58688] px-2 py-1 rounded text-[1rem] font-semibold"
                                        >
                                            Confirmer
                                        </button>
                                        <button 
                                            onClick={() => setConfirmDelete(null)}
                                            className="text-[#4D0506] bg-[#F58688] px-2 py-1 rounded text-[1rem] font-semibold"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => user.role !== 'admin' && setConfirmDelete(user.id)}
                                        className={`p-2 w-full rounded-full text-[14px] font-bold font-neulisalt flex items-center gap-1 ${user.role === 'admin' 
                                            ? 'text-gray-400 bg-gray-200 cursor-not-allowed' 
                                            : 'text-[#4D0506] bg-[#F58688] cursor-pointer'}`}
                                        disabled={user.role === 'admin'}
                                    >
                                        <Image src="/icons/delete_forever.svg" alt="Supprimer" width={16} height={16} className={user.role === 'admin' ? 'opacity-50' : ''} />
                                        Supprimer
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
