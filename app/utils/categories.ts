export function getColorCircle(category: string): string {
    const colors: { [key: string]: string } = {
        'Politique': '#FF8989',
        'Économie': '#89FFA2',
        'Société': '#89D5FF',
        'Culture': '#FFE289',
        'Sport': '#FF89E4',
        'Science': '#D489FF',
        'Technologie': '#89FFE8',
        'Santé': '#FF89B0',
        'Environnement': '#B0FF89',
        'International': '#FFC289'
    };

    return colors[category] || '#89FFA2'; // Couleur par défaut si la catégorie n'existe pas
}
