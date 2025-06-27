'use client'

import Image from 'next/image'
import { useTheme } from '@/app/context/ThemeContext'

export default function DarkTheme() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div
      onClick={toggleTheme}
      className="flex justify-center items-center gap-4 bg-gray dark:bg-gray-700 rounded-3xl p-2 w-10 h-10 cursor-pointer"
    >
      <Image
        src={isDark ? '/icons/sun.svg' : '/icons/moon.svg'}
        alt={isDark ? 'dark' : 'light'}
        width={20}
        height={20}
        className="rounded-full"
      />
    </div>
  )
}

