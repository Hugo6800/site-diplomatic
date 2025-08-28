'use client';

import { tagsNavigation, TagNavigation } from "@/app/utils/tags-navigation";
import DarkTheme from "./DarkTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TagNavigationArticles from "../TagNavigationArticles";
import { User } from "./User";
import PlansButton from "./PlansButton";

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
    <nav className="flex flex-col lg:flex-row items-center px-6 md:px-24 xl:px-64 gap-4 bg-header p-4">
      <div className="flex lg:hidden items-center gap-4 w-full">
        <DarkTheme onClick={handleClick} />
        <User onClick={handleClick} />
      </div>
      <ul className="flex flex-col xl:flex-row xl:items-center gap-4 w-full font-bold">
        <li className="flex">
          <Link
            href="/"
            onClick={handleClick}
            className={`
              inline-flex justify-center items-center gap-2 px-4 py-1 rounded-full
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
              inline-flex justify-center items-center gap-2 px-4 py-1 rounded-full
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
              inline-flex justify-center items-center gap-2 px-4 py-1 rounded-full
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
      <div className="flex justify-center items-center lg:hidden mr-auto bg-gray rounded-full p-2 cursor-pointer">
        <PlansButton />
        <p className="font-bold font-neulisalt text-[1rem] dark:text-white pr-2">Débloquer les articles !</p>
      </div>
    </nav>
  );
}