'use client';

import { tagsNavigation, TagNavigation } from "@/app/utils/tags-navigation";
import DarkTheme from "./DarkTheme";
import User from "./User";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TagNavigationArticles from "../TagNavigationArticles";

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
    <nav className="flex flex-col xl:flex-row items-center px-6 md:px-24 xl:px-36 gap-4 bg-background p-4">
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
              inline-flex items-center gap-2 pl-2 pr-4 py-1 rounded-full
              ${pathname === "/" ? "bg-gray" : ""}
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
              inline-flex items-center gap-2 pl-2 pr-4 py-1 rounded-full
              ${pathname === "/podcasts" ? "bg-gray" : ""}
            `}
          >
            Podcasts
          </Link>
        </li>
        {tagsNavigation.map((tag: TagNavigation) => (
          <TagNavigationArticles
            key={tag.name}
            colorCircle={tag.colorCircle}
            name={tag.name}
            className={tag.className}
            variant="menu"
            onClick={handleClick}
          />
        ))}
      </ul>
    </nav>
  );
}