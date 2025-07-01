export const getTagStyles = (category: string) => {
    const styles = {
        international: {
            bg: 'bg-[#FFDFD2] dark:bg-[#7C2908]',
            text: 'text-[#7C2908] dark:text-[#FFDFD2]',
            circle: 'bg-[#7C2908] dark:bg-[#FFDFD2]'
        },
        societe: {
            bg: 'bg-[#FFE1AA] dark:bg-[#5E4007]',
            text: 'text-[#5E4007] dark:text-[#FFE1AA]',
            circle: 'bg-[#5E4007] dark:bg-[#FFE1AA]'
        },
        culture: {
            bg: 'bg-[#C5FFA9] dark:bg-[#153A03]',
            text: 'text-[#153A03] dark:text-[#C5FFA9]',
            circle: 'bg-[#153A03] dark:bg-[#C5FFA9]'
        },
        politic: {
            bg: 'bg-[#C8D3FF] dark:bg-[#071652]',
            text: 'text-[#071652] dark:text-[#C8D3FF]',
            circle: 'bg-[#071652] dark:bg-[#C8D3FF]'
        },
        all: {
            bg: 'bg-[#F3DEDE] dark:bg-[#3F2525]',
            text: 'text-[#3F2525] dark:text-[#F3DEDE]',
            circle: 'bg-[#3F2525] dark:bg-[#F3DEDE]'
        }
    } as const;
    
    return styles[category as keyof typeof styles];
};
