import Image from "next/image";

interface CardTeamProps {
    image: string;
    role: string;
    name: string;
}

export default function CardTeam({ image, role, name }: CardTeamProps) {
    return (
        <article className="flex flex-col px-1 pt-1 pb-4">
            <Image
                src={image}
                alt={name}
                width={200}
                height={200}
                className="object-cover rounded-[20px] w-full"
            />
            <h2 className="font-bold font-neulisalt mt-2">{role}</h2>
            <p className="font-bold font-fractul text-2xl">{name}</p>
        </article>
    )
}