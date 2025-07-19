export const getColorCircle = (category: string): string => {
    switch (category.toLowerCase()) {
        case 'politique':
            return 'bg-tag-politic';
        case 'international':
            return 'bg-tag-international';
        case 'societe':
            return 'bg-tag-societe';
        case 'culture':
            return 'bg-tag-culture';
        default:
            return 'bg-tag-all';
    }
};
