'use client';

import { tagsNavigation, TagNavigation } from "@/app/utils/tags-navigation";
import DarkTheme from "./DarkTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TagNavigationArticles from "../TagNavigationArticles";
import { User } from "./User";

interface MenuNavigationProps {
  onNavigate?: () => void;
}

export default function MenuNavigation({ onNavigate }: MenuNavigationProps) {
  const pathname = usePathname();

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <nav className="flex flex-col xl:flex-row items-center px-6 md:px-24 xl:px-36 gap-4 bg-header p-4">
      <div className="flex justify-center xl:hidden items-center gap-4 w-full">
        <DarkTheme />
        <User />
      </div>
      <ul className="flex flex-col xl:flex-row xl:items-center gap-4 w-full font-bold">
        <li className="flex">
          <Link
            href="/"
            onClick={handleClick}
            className={`
              inline-flex justify-center items-center gap-2 px-4 py-1 rounded-full w-full
              ${pathname === "/" ? "[background-color:var(--color-gray)] dark:bg-[#433D3D] dark:text-[#EECECE]" : ""}
              hover:[background-color:var(--color-gray)] 
              dark:hover:[background-color:var(--color-gray)] dark:hover:text-[#EECECE]
            `}
          >
            Accueil
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/podcasts"
            onClick={handleClick}
            className={`
              inline-flex justify-center items-center gap-2 px-4 py-1 rounded-full w-full
              ${pathname === "/podcasts" ? "[background-color:var(--color-gray)] dark:bg-[#433D3D] dark:text-[#EECECE]" : ""}
              hover:[background-color:var(--color-gray)] 
              dark:hover:[background-color:var(--color-gray)] dark:hover:text-[#EECECE]
            `}
          >
            Podcasts
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/ateliers"
            onClick={handleClick}
            className={`
              inline-flex justify-center items-center gap-2 px-4 py-1 rounded-full w-full
              ${pathname === "/ateliers" ? "[background-color:var(--color-gray)] dark:bg-[#433D3D] dark:text-[#EECECE]" : ""}
              hover:[background-color:var(--color-gray)] 
              dark:hover:[background-color:var(--color-gray)] dark:hover:text-[#EECECE]
            `}
          >
            Ateliers
          </Link>
        </li>
        {tagsNavigation.map((tag: TagNavigation) => (
          <TagNavigationArticles
            key={tag.name}
            colorCircle={tag.colorCircle}
            name={tag.name}
            className={tag.className}
            onClick={handleClick}
          />
        ))}
      </ul>
    </nav>
  );
}