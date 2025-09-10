export const tagToClass: Record<string, string> = {
    'politique': 'politic',
    'tous': 'all',
    'international': 'international',
    'societe': 'societe',
    'culture': 'culture'
} as const;

/**
 * Retourne les classes CSS pour les couleurs d'un tag en mode light et dark
 * @param tag - Le nom du tag (en minuscules)
 * @returns Un objet contenant les classes pour le cercle et le texte
 */
export function getTagColors(tag: string) {
    // Convertir le tag en classe CSS appropriée
    const cssTag = tagToClass[tag.toLowerCase()] || tag.toLowerCase();
    
    const styles = {
        politic: {
            circle: 'bg-[#071652] dark:bg-[#c8d3ff]',
            text: 'text-[#071652] dark:text-[#c8d3ff]'
        },
        all: {
            circle: 'bg-[#3f2525] dark:bg-[#EECECE]',
            text: 'text-[#3f2525] dark:text-[#EECECE]'
        },
        international: {
            circle: 'bg-[#7c2908] dark:bg-[#fdd8ca]',
            text: 'text-[#7c2908] dark:text-[#fdd8ca]'
        },
        societe: {
            circle: 'bg-[#5e4007] dark:bg-[#ffe1aa]',
            text: 'text-[#5e4007] dark:text-[#ffe1aa]'
        },
        culture: {
            circle: 'bg-[#153a03] dark:bg-[#e0d1a8]',
            text: 'text-[#153a03] dark:text-[#e0d1a8]'
        }
    } as const;
    
    return styles[cssTag as keyof typeof styles];
}
