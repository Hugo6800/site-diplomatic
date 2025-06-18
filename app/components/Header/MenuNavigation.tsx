'use client';

import { tagsNavigation, TagNavigation } from "@/app/utils/tags-navigation";
import DarkTheme from "./DarkTheme";
import User from "./User";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TagNavigationArticles from "./TagNavigationArticles";

export default function MenuNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center gap-4 bg-background p-4">
      <div className="flex justify-center items-center gap-4 w-full">
        <DarkTheme />
        <User />
      </div>
      <ul className="flex flex-col gap-4 w-full font-bold">
        <li className="flex">
          <Link
            href="/"
            className={`px-4 py-1 text-lg rounded-full transition-colors ${pathname === '/' ? 'bg-gray' : 'hover:bg-gray/50'}`}
          >
            Accueil
          </Link>
        </li>
        <li className="flex">
          <Link
            href="/podcasts"
            className={`px-4 py-1 text-lg rounded-full transition-colors ${pathname === '/podcasts' ? 'bg-gray' : 'hover:bg-gray/50'}`}
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
          />
        ))}
      </ul>
    </nav>
  );
}