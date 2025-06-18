import Image from "next/image";

export default function DarkTheme() {
    return (
        <div className="flex justify-center items-center gap-4 bg-gray rounded-3xl p-2 w-10 h-10">
            <Image
                src="/icons/moon.svg"
                alt="Dark Theme"
                width={20}
                height={20}
                className="cursor-pointer rounded-full"
            />
        </div>
    );
}