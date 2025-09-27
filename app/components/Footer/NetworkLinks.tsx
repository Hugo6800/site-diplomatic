import Link from "next/link";
import Image from "next/image";

export default function NetworkLinks() {
    return (
        <div className="flex flex-col items-center gap-2">
            <h3 className="font-neulisalt dark:text-[#C5B0B0]">Suivez nous sur les réseaux</h3>
            <div className="flex justify-center items-center gap-4">
                <Link href="https://www.tiktok.com/@diplomatic.post" target="_blank">
                    <Image
                        src="/icons/tiktok.jpg"
                        alt="Tiktok"
                        width={38}
                        height={38}
                        className="object-cover"
                    />
                </Link>
                <Link href="https://www.instagram.com/diplomatic.post/" target="_blank" >
                    <Image
                        src="/icons/instagram.png"
                        alt="Instagram"
                        width={32}
                        height={32}
                        className="object-cover"
                    />
                </Link>
                <Link href="https://www.youtube.com/@CartePouvoir" target="_blank">
                    <Image
                        src="/icons/youtube_1.png"
                        alt="Youtube"
                        width={42}
                        height={42}
                        className="object-cover"
                    />
                </Link>
            </div>
        </div>
    );
}