import Advertising from "@/app/components/Advertising";
import CardTeam from "@/app/components/CardTeam";
import { team } from "@/app/utils/team";

export default function Team() {
    return (
        <main className="px-6 md:px-24 xl:px-64 mt-32 h-[calc(100vh-12rem)]">
            <h2 className="font-bold font-fractul text-5xl mb-4">{`Rencontrez l’équipe de rédaction`}</h2>
            <p className="font-neulisalt mb-14">The Diplomatic Post est géré par une équipe de journalistes bénévoles, il méritent bien une page dédiée !</p>
            <Advertising />
            <section className="flex flex-col lg:grid lg:grid-cols-4 gap-2 mt-14">
                {team.map((member) => (
                    <CardTeam key={member.name} {...member} />
                ))}
            </section>
        </main>
    )
}