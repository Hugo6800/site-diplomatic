import Image from "next/image";
import NavBar from "./NavBar";
import DarkTheme from "./DarkTheme";
import User from "./User";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center bg-background px-6 md:px-24 xl:px-36 h-24 fixed top-0 left-0 right-0 z-50">
            <NavBar />
            <Link href="/">
                <Image
                    src="/Logo_diplomatic.png"
                    alt="Logo"
                    width={200}
                    height={100}
                />
            </Link>
            <div className="hidden xl:flex items-center gap-4">
                <DarkTheme />
                <User />
            </div>
        </header>
    );
}