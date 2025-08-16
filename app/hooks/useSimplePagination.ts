'use client'

import { useState, useMemo } from 'react'

interface UseSimplePaginationOptions {
  itemsPerPage: number
}

interface UseSimplePaginationResult<T> {
  currentPage: number
  totalPages: number
  currentItems: T[]
  nextPage: () => void
  hasMorePages: boolean
}

/**
 * Hook simplifié pour la pagination avec une seule flèche "suivant"
 * Adapté pour les sections d'articles avec un nombre limité d'éléments par page
 */
export function useSimplePagination<T>(
  items: T[], 
  options: UseSimplePaginationOptions
): UseSimplePaginationResult<T> {
  const { itemsPerPage } = options
  const [currentPage, setCurrentPage] = useState<number>(0)
  
  // Calculer le nombre total de pages
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))
  
  // Obtenir les éléments pour la page actuelle
  const currentItems = useMemo(() => {
    return items.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    )
  }, [items, currentPage, itemsPerPage])
  
  // Passer à la page suivante ou revenir à la première
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(0)
    }
  }
  
  // Vérifier s'il y a plus de pages à afficher
  const hasMorePages = items.length > itemsPerPage
  
  return {
    currentPage,
    totalPages,
    currentItems,
    nextPage,
    hasMorePages
  }
}
