'use client';

import { getTagStyles } from '../utils/tag-styles';

interface TagArticleProps {
    name: string;
    className: string;
}

export default function TagArticle({
    name,
    className
}: TagArticleProps) {
    const category = className.match(/tag-([^\s]+)/)?.[1] || '';
    const tagStyles = getTagStyles(category);

    return (
        <div className={`
            inline-flex w-fit items-center gap-2 pl-2 pr-4 py-1 rounded-full
            ${tagStyles.bg} ${tagStyles.text}
            text-sm transition-colors duration-200
        `}>
            <div className={`w-4 h-4 rounded-full ${tagStyles.circle} transition-colors duration-200`}></div>
            <p className="font-bold font-neulisalt tracking-wider">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        </div>
    );
}
