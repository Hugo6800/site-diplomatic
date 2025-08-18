'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface SearchFilterProps {
  placeholder: string
  onSearch: (searchTerm: string, mode: 'contains' | 'startsWith') => void
  searchFields?: string[]
  className?: string
  minCharacters?: number
  searchMode?: 'contains' | 'startsWith'
}

export default function SearchFilter({
  placeholder,
  onSearch,
  // searchFields,
  className = '',
  minCharacters = 3,
  searchMode = 'contains' // Ce mode est transmis au composant parent via onSearch
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Débounce la recherche quelle que soit la longueur
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    
    debounceTimeout.current = setTimeout(() => {
      // Toujours appeler onSearch, même si moins de minCharacters
      // Le composant parent décidera quoi faire
      onSearch(value, searchMode)
    }, 300)
  }
  
  const handleClearSearch = () => {
    setSearchTerm('')
    onSearch('', searchMode)
  }
  
  return (
    <div className={`relative mb-4 mt-2 ${className}`}>
      <div className="relative flex items-center lg:w-1/2">
        <div className="absolute left-3 flex items-center pointer-events-none">
          <Image 
            src="/icons/magnifying-glass.svg" 
            alt="Rechercher" 
            width={20} 
            height={20} 
            className="dark:invert"
          />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#DE595C] font-neulisalt"
        />
        {searchTerm && (
          <button 
            onClick={handleClearSearch}
            className="absolute right-3 cursor-pointer"
            aria-label="Effacer la recherche"
          >
            <Image 
              src="/icons/delete-left.svg" 
              alt="Effacer" 
              width={16} 
              height={16} 
              className="dark:invert"
            />
          </button>
        )}
      </div>
      {/* {searchFields && searchFields.length > 0 && (
        <div className="mt-1 text-xs text-gray-500 font-neulisalt">
          Recherche par : {searchFields.join(', ')}
        </div>
      )} */}
      {searchTerm.length > 0 && searchTerm.length < minCharacters && (
        <div className="mt-1 text-xs text-amber-500 font-neulisalt">
          Saisissez au moins {minCharacters} caractères pour lancer la recherche
        </div>
      )}
    </div>
  )
}
