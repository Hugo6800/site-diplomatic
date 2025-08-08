'use client'

import Image from 'next/image'
import { useTheme } from '@/app/context/ThemeContext'

export default function DarkTheme() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div
      onClick={toggleTheme}
      className="flex justify-center items-center gap-4 bg-gray dark:bg-gray-700 rounded-full p-2 w-[56px] h-[56px] cursor-pointer hover:bg-gray/80 transition-colors"
    >
      <Image
        src={isDark ? '/icons/sun.svg' : '/icons/moon.svg'}
        alt={isDark ? 'dark' : 'light'}
        width={40}
        height={40}
        className="rounded-full object-contain w-10 h-10"
      />
    </div>
  )
}

