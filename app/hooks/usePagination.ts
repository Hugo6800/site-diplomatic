'use client'

import { useState, useMemo } from 'react'

interface PaginationOptions {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
}

interface PaginationResult<T> {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  paginatedItems: T[]
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  firstPage: () => void
  lastPage: () => void
  pageNumbers: number[]
  startIndex: number
  endIndex: number
}

export function usePagination<T>(items: T[], options: PaginationOptions): PaginationResult<T> {
  const { totalItems, itemsPerPage, initialPage = 1 } = options
  const [currentPage, setCurrentPage] = useState(initialPage)
  
  // Calculer le nombre total de pages
  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / itemsPerPage)), [totalItems, itemsPerPage])
  
  // S'assurer que la page actuelle est valide
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    } else if (currentPage < 1) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])
  
  // Calculer les indices de début et de fin pour la page actuelle
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1)
  
  // Extraire les éléments pour la page actuelle
  const paginatedItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1)
  }, [items, startIndex, endIndex])
  
  // Générer les numéros de page à afficher
  const pageNumbers = useMemo(() => {
    // Toujours afficher au moins la page 1, même si totalPages est 0
    if (totalPages === 0) return [1]
    
    const maxPageButtons = 5 // Nombre maximum de boutons de page à afficher
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
    let endPage = startPage + maxPageButtons - 1
    
    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPageButtons + 1)
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [currentPage, totalPages])
  
  // Fonctions de navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  
  const firstPage = () => {
    setCurrentPage(1)
  }
  
  const lastPage = () => {
    setCurrentPage(totalPages)
  }
  
  return {
    currentPage,
    totalPages,
    itemsPerPage,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    pageNumbers,
    startIndex,
    endIndex
  }
}
