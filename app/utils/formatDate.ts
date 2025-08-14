export function formatDate(dateInput: Date | string): string {
    try {
        // Si dateInput est déjà une chaîne au format JJ.MM.YY, la retourner directement
        if (typeof dateInput === 'string' && /^\d{2}\.\d{2}\.\d{2}$/.test(dateInput)) {
            return dateInput;
        }
        
        // Convertir en Date si c'est une chaîne
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        
        // Vérifier si la date est valide
        if (isNaN(date.getTime())) {
            return 'Date invalide';
        }
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        
        return `${day}.${month}.${year}`;
    } catch (error) {
        console.error('Erreur lors du formatage de la date:', error);
        return 'Date invalide';
    }
}
