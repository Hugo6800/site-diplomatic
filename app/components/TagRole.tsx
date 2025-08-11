export default function TagRole({ role }: { role: string }) {
    const getRoleDisplay = (role: string) => {
        switch (role) {
            case 'reader':
                return 'Lecteur';
            case 'journalist':
                return 'Editeur';
            case 'admin':
                return 'Administrateur';
            default:
                return 'Lecteur';
        }
    };

    const getRoleStyle = (role: string) => {
        switch (role) {
            case 'reader':
                return 'bg-[#458F59] text-[#001D08]';
            case 'journalist':
                return 'bg-[#9160E2] text-[#001D08]';
            case 'admin':
                return 'bg-[#D35087] text-[#001D08]';
        }
    };

    return (
        <div className={`flex items-center gap-2 rounded-full px-2 py-1 ${getRoleStyle(role)}`}>
            <div className={`w-4 h-4 rounded-full bg-black`}></div>
            <span className={`text-sm font-bold`}>
                {getRoleDisplay(role)}
            </span>
        </div>
    );
}