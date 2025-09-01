import Image from "next/image";
import { CardPodcastProps } from '@/app/types/cardPodcast';
import { formatDate } from '@/app/utils/formatDate';

export default function CardPodcast({ coverUrl, duration, date, title, spotifyId }: CardPodcastProps) {
    const formattedDate = formatDate(new Date(parseInt(date) * 1000));
    return (
        <article 
            className="flex flex-col gap-4 mt-4 cursor-pointer hover:bg-[#F3DEDE] hover:dark:bg-[#433D3D]  transition-colors ease-in-out duration-300 rounded-3xl px-1 pt-1 pb-4" 
            onClick={() => window.open(`https://open.spotify.com/episode/${spotifyId}`, '_blank')}
        >
            <Image
                src={coverUrl}
                alt="Podcast"
                width={350}
                height={350}
                className="object-cover rounded-3xl lg:w-[200px] lg:h-[200px]"
            />
            <div className="flex flex-col gap-2">
                <Image
                    src="/Streaming_platform_tag.png"
                    alt="Podcast"
                    width={100}
                    height={32}
                    className="object-cover rounded-full w-[100px] h-[32px]"
                />
                <p className="font-bold font-neulisalt dark:text-[#C5B0B0]">{duration} - {formattedDate}</p>
                <h2 className="font-bold font-fractul text-3xl line-clamp-3 dark:text-[#F4DFDF] tracking-[0.03em] leading-[110%] mb-2">{title}</h2>
            </div>
        </article>
    )
}