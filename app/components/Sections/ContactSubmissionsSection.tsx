'use client'

import { useContactSubmissions } from '@/app/hooks/useContactSubmissions'
import ContactsTable from '@/app/components/Admin/ContactsTable'
import { usePagination } from '@/app/hooks/usePagination'
import Pagination from '@/app/components/Pagination'

export default function ContactSubmissionsSection() {
    const {
        submissions,
        loading,
        formatDate,
        openStatusMenu,
        setOpenStatusMenu,
        changeSubmissionStatus
    } = useContactSubmissions()
    
    // Utiliser le hook de pagination avec 10 éléments par page
    const {
        paginatedItems: paginatedSubmissions,
        currentPage,
        totalPages,
        pageNumbers,
        goToPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage
    } = usePagination(submissions, {
        totalItems: submissions.length,
        itemsPerPage: 10,
        initialPage: 1
    })
    
    return (
        <section className="mb-10">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Soumissions de contact</h2>
            
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    <ContactsTable 
                        submissions={paginatedSubmissions}
                        formatDate={formatDate}
                        openStatusMenu={openStatusMenu}
                        setOpenStatusMenu={setOpenStatusMenu}
                        changeSubmissionStatus={changeSubmissionStatus}
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
