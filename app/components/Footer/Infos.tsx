import NetworkLinks from "./NetworkLinks";

export default function Infos() {
    return (
        <div className="flex flex-col justify-between font-neulisalt items-center lg:flex-row gap-4 w-full">
            <p className="text-[#3F2525] dark:text-[#C5B0B0]">{`Média indépendant dédié à l'analyse géopolitique mondiale.`}</p>   
            <NetworkLinks />
            <p className="text-[#3F2525] dark:text-[#C5B0B0]">© The Diplomatic Post 2025 - Tous droits réservés</p>
        </div>
    )
}