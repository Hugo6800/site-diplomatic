'use client'

import NavBar from "./NavBar";
import DarkTheme from "./DarkTheme";
import Link from "next/link";
import { User } from "./User";
import Logo from "./Logo";
// import PlansButton from "./PlansButton";

export default function Header() {
    return (
        <header className="flex justify-between items-center bg-header dark:bg-background py-5 px-6 md:px-24 xl:px-64 h-24 fixed top-0 left-0 right-0 z-[70]">
            <NavBar />
            <Link href="/">
                <Logo />
            </Link>
            <div className="hidden lg:flex items-center gap-4">
                {/* <PlansButton /> */}
                <DarkTheme />
                <User />
            </div>
        </header>
    );
}