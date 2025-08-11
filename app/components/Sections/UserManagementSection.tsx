'use client'

import { useUserManagement } from '@/app/hooks/useUserManagement'
import UsersTable from '@/app/components/Admin/UsersTable'

export default function UserManagement() {
    const {
        users,
        loading,
        roles,
        openRoleMenu,
        confirmDelete,
        formatDate,
        changeUserRole,
        deleteUser,
        setOpenRoleMenu,
        setConfirmDelete
    } = useUserManagement()

    return (
        <section className="mb-10">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Utilisateurs</h2>
            
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <UsersTable 
                    users={users}
                    roles={roles}
                    openRoleMenu={openRoleMenu}
                    confirmDelete={confirmDelete}
                    formatDate={formatDate}
                    changeUserRole={changeUserRole}
                    deleteUser={deleteUser}
                    setOpenRoleMenu={setOpenRoleMenu}
                    setConfirmDelete={setConfirmDelete}
                />
            )}
        </section>
    )
}