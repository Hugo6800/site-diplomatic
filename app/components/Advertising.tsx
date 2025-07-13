export default function Advertising({ className }: { className?: string }) {
    return (
        <div className={`border-2 border-dashed border-[#F3DEDE] bg-slate-400 dark:border-white rounded-2xl p-4 ${className}`}>
            <h2 className="font-bold font-neulisalt italic text-[2rem] mb-4 dark:text-white">Publicité</h2>
        </div>
    );
}