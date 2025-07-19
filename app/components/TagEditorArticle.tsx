'use client'

import Image from 'next/image';
import Link from 'next/link';

interface TagEditorArticleProps {
    articleId: string;
}

export default function TagEditorArticle({ articleId }: TagEditorArticleProps) {
    return (
        <Link 
            href={`/edit-article/${articleId}`}
            className="inline-flex justify-center items-center gap-2 px-3 py-2 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer hover:bg-[#e5c8c8] transition-colors duration-200"
        >
            <Image
                src="/icons/edit.svg"
                alt="Éditer"
                width={24}
                height={24}
                className="w-6 h-6 object-cover"
            />
            <span className="font-bold font-neulisalt text-sm text-[#3F2525]">
                Éditer
            </span>
        </Link>
    );
}