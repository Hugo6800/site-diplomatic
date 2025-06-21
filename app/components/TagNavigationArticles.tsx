interface TagNavigationArticlesProps {
    colorCircle: string;
    name: string;
    className: string;
    variant?: 'menu' | 'article';
}

export default function TagNavigationArticles({
    colorCircle,
    name,
    className,
    variant = 'menu'
}: TagNavigationArticlesProps) {
    const category = className.match(/tag-([^\s]+)/)?.[1] || ''
    const baseColor = `tag-${category}`

    const variantStyles = variant === 'menu' ? {
        container: `text-${baseColor} border-2 border-${baseColor}`,
        text: 'text-sm'
    } : {
        container: `bg-background-tag-${category} text-${baseColor}`,
        text: 'text-sm'
    }

    return (
        <li className="flex">
            <div className={`
                inline-flex items-center gap-2 pl-2 pr-4 py-1 rounded-full
                ${variantStyles.container}
                ${variantStyles.text}
            `}>
                <div className={`w-4 h-4 rounded-full ${colorCircle}`}></div>
                <p className="font-bold">{name}</p>
            </div>
        </li>
    )
}