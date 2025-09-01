'use client'

import Image from 'next/image'
import { useTheme } from '@/app/context/ThemeContext'

interface DarkThemeProps {
  onClick?: () => void;
}

export default function DarkTheme({ onClick }: DarkThemeProps) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div
      title="Changer de thème"
      onClick={() => {
        toggleTheme();
        if (onClick) onClick();
      }}
      className="flex justify-center items-center gap-4 bg-[#F3DEDE] dark:bg-[#433D3D] rounded-full p-2 cursor-pointer w-[48px] h-[48px] hover:bg-gray/80 transition-colors"
    >
      <Image
        src={isDark ? '/icons/brightness_empty.svg' : '/icons/bedtime.svg'}
        alt={isDark ? 'dark' : 'light'}
        width={48}
        height={48}
        className="rounded-full object-contain dark:hidden"
      />
      <Image
        src={isDark ? '/icons/dark_collection/brightness_empty.png' : '/icons/bedtime.svg'}
        alt={isDark ? 'dark' : 'light'}
        width={48}
        height={48}
        className="rounded-full object-contain hidden dark:block"
      />
    </div>
  )
}

