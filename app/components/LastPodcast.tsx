import Image from "next/image";
import { LastPodcastProps } from '@/app/types/LastPodcast';
import { formatDate } from '@/app/utils/formatDate';

export default function LastPodcast({ coverUrl, duration, date, title, description, spotifyId }: LastPodcastProps) {
    const formattedDate = formatDate(new Date(parseInt(date) * 1000));

    return (
        <article
            className="flex flex-col gap-4 lg:flex-row mt-4 cursor-pointer"
            onClick={() => window.open(`https://open.spotify.com/episode/${spotifyId}`, '_blank')}
        >
            <Image
                src={coverUrl}
                alt="Podcast"
                width={350}
                height={350}
                className="object-cover rounded-lg lg:w-[200px] lg:h-[200px]"
            />
            <div className="flex flex-col gap-2">
                <Image
                    src="/Streaming_platform_tag.png"
                    alt="Podcast"
                    width={100}
                    height={32}
                    className="object-cover rounded-full"
                />
                <p className="font-bold font-neulisalt">{duration} - {formattedDate}</p>
                <h2 className="font-bold font-fractul text-3xl line-clamp-3 tracking-[0.03em] leading-[110%] mb-2">{title}</h2>
                <p className="font-neulisalt line-clamp-5">{description}</p>
            </div>
        </article>
    );
}