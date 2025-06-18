import Image from "next/image";
import NavBar from "./NavBar";

export default function Header() {
    return (
        <header className="flex justify-between items-center bg-background px-6 h-24 fixed top-0 left-0 right-0 z-50">
            <Image
                src="/Logo_diplomatic.png"
                alt="Logo"
                width={200}
                height={100}
            />
            <NavBar />
        </header>
    );
}