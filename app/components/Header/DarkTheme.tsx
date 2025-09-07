'use client'

import Image from 'next/image'
import { useTheme } from '@/app/context/ThemeContext'

interface DarkThemeProps {
  onClick?: () => void;
}

export default function DarkTheme({ onClick }: DarkThemeProps) {
  const { theme, setThemeMode } = useTheme()

  const handleClick = () => {
    // rotation entre light -> dark -> system
    if (theme === "light") {
      setThemeMode("dark")
    } else if (theme === "dark") {
      setThemeMode("system")
    } else {
      setThemeMode("light")
    }

    if (onClick) onClick()
  }

  return (
    <div
      onClick={handleClick}
      className="flex justify-center items-center gap-4 bg-[#F3DEDE] dark:bg-[#433D3D] rounded-full p-2 cursor-pointer w-[48px] h-[48px] hover:bg-gray/80 transition-colors"
    >
      {theme === "light" && (
        <Image
          src="/icons/bedtime.svg"
          title="Thème clair"
          alt="light"
          width={32}
          height={32}
          className="rounded-full object-contain"
        />
      )}
      {theme === "dark" && (
        <Image
          src="/icons/dark_collection/brightness_empty.png"
          title="Thème sombre"
          alt="dark"
          width={32}
          height={32}
          className="rounded-full object-contain"
        />
      )}
      {theme === "system" && (
        <>
          <Image
            src="/icons/laptop.svg"
            title="Thème système"
            alt="system"
            width={32}
            height={32}
            className="rounded-full object-contain dark:hidden"
          />
          <Image
            src="/icons/dark_collection/laptop.svg"
            alt="system"
            width={32}
            height={32}
            className="rounded-full object-contain hidden dark:block"
          />
        </>
      )}
    </div>
  )
}


