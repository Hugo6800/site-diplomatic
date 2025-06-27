export interface TagNavigationArticlesProps {
    colorCircle: string;
    name: string;
    className: string;
    variant?: 'menu' | 'article';
    onClick?: () => void;
}