export const getCollectionStyles = (category: string) => {
    const styles = {
        culture: {
            bg: 'bg-[#C5FFA9] dark:bg-[#2B6011]',
            text: 'text-[#153A03] dark:text-[#C5FFA9]'
        },
        societe: {
            bg: 'bg-[#FFE1AA] dark:bg-[#996C18]',
            text: 'text-[#5E4007] dark:text-[#FFE1AA]'
        },
        international: {
            bg: 'bg-[#FFDFD2] dark:bg-[#662A11]',
            text: 'text-[#7C2908] dark:text-[#FFDFD2]'
        },
        politic: {
            bg: 'bg-[#C8D3FF] dark:bg-[#162255]',
            text: 'text-[#071652] dark:text-[#C8D3FF]'
        },
        default: {
            bg: 'bg-[#E5E5E5] dark:bg-[#333333]',
            text: 'text-[#333333] dark:text-[#E5E5E5]'
        }
    } as const;
    
    return styles[category as keyof typeof styles] || styles.default;
};