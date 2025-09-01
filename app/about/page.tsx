export default function About() {
    return (
        <main className="flex flex-col gap-4 px-6 md:px-24 xl:px-36 mt-28 lg:mt-48 mb-20">
            <h2 className="font-bold font-fractul text-5xl dark:text-[#F4DFDF]">À propos</h2>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold font-fractul text-lg dark:text-[#C5B0B0]">Notre mission</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`The Diplomatic Post est une plateforme indépendante dédiée à l'analyse
                et à la diffusion d'informations sur les enjeux géopolitiques mondiaux.
                Notre objectif est de fournir une perspective approfondie et nuancée
                des événements internationaux, loin des narratifs simplistes et des biais
                médiatiques traditionnels. Nous croyons fermement à l'importance d'une information
                libre et accessible pour permettre à chacun de comprendre les dynamiques complexes
                qui façonnent notre monde. C'est pourquoi nous nous engageons à offrir des analyses rigoureuses,
                basées sur des faits vérifiés et des sources fiables, rédigées par des experts et des passionnés de géopolitique.`}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold font-fractul text-lg dark:text-[#C5B0B0]">Nos valeurs</h3>
                <ul className="list-disc pl-6 font-neulisalt dark:text-[#F4DFDF]">
                    <li>{`Indépendance : Nous ne sommes affiliés à aucune entité politique, économique ou religieuse. Notre ligne éditoriale est guidée par l'objectivité et la recherche de la vérité.`}</li>
                    <li>{`Rigueur : Chaque article est soumis à un processus de vérification strict pour garantir l'exactitude des informations et la pertinence des analyses.`}</li>
                    <li>{`Transparence : Nos sources sont, dans la mesure du possible, clairement identifiées et accessibles, permettant à nos lecteurs de vérifier par eux-mêmes les faits cités.`}</li>
                    <li>{`Éducation : Au-delà de l'information, nous souhaitons contribuer à l'éducation de nos lecteurs sur les défis géopolitiques, en proposant des contenus clairs, structurés et accessibles à tous.`}</li>
                    <li>{`Diversité des points de vue : Nous encourageons la pluralité des analyses et des opinions, tout en maintenant un cadre de respect et de pensée critique.`}</li>
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold font-fractul text-lg dark:text-[#C5B0B0]">Notre équipe</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`The Diplomatic Post est une initiative passionnée. Notre équipe est composée de rédacteurs,
                d'analystes et de contributeurs bénévoles, tous animés par un intérêt commun pour les affaires
                internationales et le désir de partager leurs connaissances. Nous sommes constamment 
                à la recherche de nouvelles plumes pour enrichir notre contenu et offrir des perspectives variées.`}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold font-fractul text-lg dark:text-[#C5B0B0]">Nous soutenir</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`En tant que média indépendant, The Diplomatic Post ne dépend pas de la publicité intrusive
                ou de financements externes susceptibles de compromettre notre intégrité. 
                Si vous appréciez notre travail et souhaitez nous aider à maintenir la qualité et 
                l'indépendance de nos contenus, vous pouvez nous soutenir de plusieurs manières :`}
                </p>
                <ul className="list-disc pl-6 font-neulisalt dark:text-[#F4DFDF]">
                    <li>Partager nos articles : Diffusez nos analyses sur les réseaux sociaux et parlez-en autour de vous.</li>
                    <li>Interagir : Laissez des commentaires constructifs et participez aux discussions.</li>
                </ul>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Chaque geste, aussi petit soit-il, contribue à la pérennité de notre projet.`}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold font-fractul text-lg dark:text-[#C5B0B0]">Contactez nous</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Pour toute question, suggestion ou proposition de collaboration, n'hésitez pas à nous contacter à l'adresse suivante :`}
                </p>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`diplomaticpost@outlook.com`}
                </p>
            </div>
        </main >
    );
}