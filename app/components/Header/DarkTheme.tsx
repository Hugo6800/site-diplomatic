'use client'

import Image from 'next/image'
import { useTheme } from '@/app/context/ThemeContext'

export default function DarkTheme() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div
      onClick={toggleTheme}
      className="flex justify-center items-center gap-4 bg-gray dark:bg-gray-700 rounded-full p-2 cursor-pointer w-[48px] h-[48px] hover:bg-gray/80 transition-colors"
    >
      <Image
        src={isDark ? '/icons/brightness_empty.svg' : '/icons/bedtime.svg'}
        alt={isDark ? 'dark' : 'light'}
        width={48}
        height={48}
        className="rounded-full object-contain"
      />
    </div>
  )
}

