import Link from "next/link";

export default function Links() {
    return (
        <ul className="grid grid-cols-2 md:w-full md:flex md:justify-around items-center font-neulisalt">
            <li className="text-[#DE595C] hover:font-bold transition-colors">
                <Link href="/about">À propos</Link>
            </li>
            <li className="text-[#DE595C] hover:font-bold transition-colors">
                <Link href="/">Articles</Link>
            </li>
            <li className="text-[#DE595C] hover:font-bold transition-colors">
                <Link href="/contact">Contact</Link>
            </li>
            <li className="text-[#DE595C] hover:font-bold transition-colors">
                <Link href="/mentions">Mentions légales</Link>
            </li>
        </ul>
    )
}