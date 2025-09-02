'use client'

import { useUserManagement } from '@/app/hooks/useUserManagement'
import UsersTable from '@/app/components/Admin/UsersTable'
import { usePagination } from '@/app/hooks/usePagination'
import Pagination from '@/app/components/Pagination'

export default function UserManagement() {
    const {
        users,
        loading,
        searching,
        roles,
        openRoleMenu,
        confirmDelete,
        formatDate,
        changeUserRole,
        deleteUser,
        searchUsersByEmail,
        fetchAllUsers,
        setOpenRoleMenu,
        setConfirmDelete
    } = useUserManagement()

    // Utiliser le hook de pagination avec 10 éléments par page
    const {
        paginatedItems: paginatedUsers,
        currentPage,
        totalPages,
        pageNumbers,
        goToPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage
    } = usePagination(users, {
        totalItems: users.length,
        itemsPerPage: 10,
        initialPage: 1
    })
    
    return (
        <section className="mb-10">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#433D3D] dark:text-[#EECECE] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 w-fit">Utilisateurs</h2>
            
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    <UsersTable 
                        users={paginatedUsers}
                        roles={roles}
                        openRoleMenu={openRoleMenu}
                        confirmDelete={confirmDelete}
                        loading={loading}
                        searching={searching}
                        formatDate={formatDate}
                        changeUserRole={changeUserRole}
                        deleteUser={deleteUser}
                        searchUsersByEmail={searchUsersByEmail}
                        fetchAllUsers={fetchAllUsers}
                        setOpenRoleMenu={setOpenRoleMenu}
                        setConfirmDelete={setConfirmDelete}
                    />
                    
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageNumbers={pageNumbers}
                        goToPage={goToPage}
                        nextPage={nextPage}
                        prevPage={prevPage}
                        firstPage={firstPage}
                        lastPage={lastPage}
                    />
                </>
            )}
        </section>
    )
}