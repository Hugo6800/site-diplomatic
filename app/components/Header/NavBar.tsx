'use client'

import Image from "next/image"
import { useState } from "react"
import MenuNavigation from "./MenuNavigation"

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [animation, setAnimation] = useState<null | "in" | "out">(null)

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true)
      setAnimation("in")
    } else {
      closeMenu()
    }
  }

  const closeMenu = () => {
    setAnimation("out")
  }

  const handleAnimationEnd = () => {
    if (animation === "out") {
      setIsMenuOpen(false)
    }
    setAnimation(null)
  }

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center"
        aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        <Image
          src={isMenuOpen ? '/icons/xmark-solid.svg' : '/icons/menu_burger.svg'}
          alt={isMenuOpen ? 'Fermer' : 'Menu'}
          width={30}
          height={30}
          className="dark:invert"
        />
      </button>

      {(isMenuOpen || animation === "out") && (
        <div
          onAnimationEnd={handleAnimationEnd}
          className={`absolute top-24 left-0 right-0 z-50 bg-white dark:bg-background shadow-lg
            ${animation === "in" ? "slide-in" : ""}
            ${animation === "out" ? "slide-out" : ""}
            `}
        >
          <MenuNavigation onNavigate={closeMenu} />
        </div>
      )}
    </div>
  )
}
