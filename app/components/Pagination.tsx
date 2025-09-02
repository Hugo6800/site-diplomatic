'use client'

import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageNumbers: number[]
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  firstPage: () => void
  lastPage: () => void
}

export default function Pagination({
  currentPage,
  totalPages,
  pageNumbers,
  goToPage,
  nextPage,
  prevPage,
  firstPage,
  lastPage
}: PaginationProps) {
  // Toujours afficher la pagination, même avec une seule page
  // if (totalPages <= 1) return null
  
  return (
    <div className="flex items-center justify-center mt-6 mb-4">
      <nav className="flex items-center space-x-1">
        {/* Bouton première page */}
        <button
          onClick={firstPage}
          disabled={currentPage === 1}
          className={`p-3 rounded-full ${
            currentPage === 1
              ? 'text-[#4D0506] dark:text-[#F3DEDE] cursor-not-allowed'
              : 'text-[#1B0505] dark:text-[#EECECE] hover:bg-[#F3DEDE] dark:hover:bg-[#560C0E] cursor-pointer'
          }`}
          aria-label="Première page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M9.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Bouton page précédente */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`p-3 rounded-full ${
            currentPage === 1
              ? 'text-[#4D0506] dark:text-[#F3DEDE] cursor-not-allowed'
              : 'text-[#1B0505] dark:text-[#EECECE] hover:bg-[#F3DEDE] dark:hover:bg-[#560C0E] cursor-pointer'
          }`}
          aria-label="Page précédente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Numéros de page */}
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => goToPage(number)}
            className={`px-3 py-1 rounded-full font-neulisalt ${
              currentPage === number
                ? 'bg-[#DE595C] text-white dark:text-[#EECECE] font-bold'
                : 'text-[#1B0505] dark:text-[#EECECE] hover:bg-[#F3DEDE] dark:hover:bg-[#560C0E] cursor-pointer'
            }`}
          >
            {number}
          </button>
        ))}
        
        {/* Bouton page suivante */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`p-3 rounded-full ${
            currentPage === totalPages
              ? 'text-[#4D0506] dark:text-[#F3DEDE] cursor-not-allowed'
              : 'text-[#1B0505] dark:text-[#EECECE] hover:bg-[#F3DEDE] dark:hover:bg-[#560C0E] cursor-pointer'
          }`}
          aria-label="Page suivante"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Bouton dernière page */}
        <button
          onClick={lastPage}
          disabled={currentPage === totalPages}
          className={`p-3 rounded-full ${
            currentPage === totalPages
              ? 'text-[#4D0506] dark:text-[#F3DEDE] cursor-not-allowed'
              : 'text-[#1B0505] dark:text-[#EECECE] hover:bg-[#F3DEDE] dark:hover:bg-[#560C0E] cursor-pointer'
          }`}
          aria-label="Dernière page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L14.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  )
}
