'use client'

import Image from 'next/image';

interface LeftCardsEditorPanelProps {
    className: string;
    title: string;
    image: string;
    category: string;
}

export default function LeftCardsEditorPanel({ className, title, image, category }: LeftCardsEditorPanelProps) {
    return (
        <article className="flex flex-col gap-2.5">
            <div className={`rounded-full ${className} font-bold font-neulisalt`}>
                {category}
            </div>
            <Image
                src={image}
                alt={title}
                width={400}
                height={250}
                className="object-cover w-full rounded-[20px]"
            />  
            <h2 className="font-bold font-fractul text-2xl line-clamp-2 tracking-[0.03em] leading-[110%] mb-2">{title}</h2>
        </article>
    );
}