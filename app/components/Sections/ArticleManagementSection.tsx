'use client'

import { useArticleManagement } from '@/app/hooks/useArticleManagement'
import ArticlesTable from '@/app/components/Admin/ArticlesTable'
import { usePagination } from '@/app/hooks/usePagination'
import Pagination from '@/app/components/Pagination'

export default function ArticleManagement() {
    const {
        articles,
        loading,
        formatDate
    } = useArticleManagement()
    
    // Utiliser le hook de pagination avec 10 éléments par page
    const {
        paginatedItems: paginatedArticles,
        currentPage,
        totalPages,
        pageNumbers,
        goToPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage
    } = usePagination(articles, {
        totalItems: articles.length,
        itemsPerPage: 10,
        initialPage: 1
    })
    
    return (
        <section className="mb-10">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Articles</h2>
            
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    <ArticlesTable 
                        articles={paginatedArticles}
                        formatDate={formatDate}
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
