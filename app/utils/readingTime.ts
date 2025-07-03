export const calculateReadingTime = (content: string): number => {
    const WORDS_PER_MINUTE = 238;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / WORDS_PER_MINUTE);
};

export const formatReadingTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
