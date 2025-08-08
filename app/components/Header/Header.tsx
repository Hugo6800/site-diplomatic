'use client'

import Image from "next/image";
import NavBar from "./NavBar";
import DarkTheme from "./DarkTheme";
import Link from "next/link";
import { User } from "./User";
import { useTheme } from '@/app/context/ThemeContext';

export default function Header() {
    const { isDark } = useTheme();

    return (
        <header className="flex justify-between items-center bg-header py-5 px-6 md:px-24 xl:px-64 h-24 fixed top-0 left-0 right-0 z-50">
            <NavBar />
            <Link href="/">
                <Image
                    src={isDark ? "/Logo_blanc.png" : "/Logo_diplomatic.png"}
                    alt="Logo"
                    width={200}
                    height={100}
                />
            </Link>
            <div className="hidden lg:flex items-center gap-4">
                <DarkTheme />
                <User />
            </div>
        </header>
    );
}