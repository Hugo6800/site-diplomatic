interface TagNavigationArticlesProps {
    colorCircle: string;
    name: string;
    className: string;
}

export default function TagNavigationArticles({ colorCircle, name, className }: TagNavigationArticlesProps) {
    return (
        <li className="flex">
            <div className={`inline-flex items-center gap-2 pl-2 pr-4 rounded-full text-lg ${className}`}>
                <div className={`w-4 h-4 rounded-full ${colorCircle}`}></div>
                <p className="font-bold">{name}</p>
            </div>
        </li>
    )
}