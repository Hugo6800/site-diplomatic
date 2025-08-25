export function getColorCircle(category: string): string {
    const colors: { [key: string]: string } = {
        'Politique': '#FF8989',
        'Société': '#89D5FF',
        'Culture': '#FFE289',
        'International': '#FFC289'
    };

    return colors[category] || '#89FFA2'; // Couleur par défaut si la catégorie n'existe pas
}
