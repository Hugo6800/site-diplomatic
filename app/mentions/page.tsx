import Link from "next/link";

export default function Mentions() {
    return (
        <main className="flex flex-col gap-4 px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
            <h2 className="font-bold font-fractul text-5xl dark:text-[#C5B0B0]">Mentions légales</h2>
            <p className="font-neulisalt dark:text-[#F4DFDF]">
                {`Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l’économie numérique,
                il est porté à la connaissance des utilisateurs et visiteurs, ci-après l' "Utilisateur", du site
                diplomaticpost.fr , ci-après le "Site", les présentes mentions légales.
                La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans
                réserve des présentes mentions légales.`}
            </p>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Éditeurs du site</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Propriétaire du site : Hugo Lambert`}
                </p>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Développement du site : Angélique Copéré`}
                </p>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Email : angelique.copere@free-dev.fr`}
                </p>
                <Link href="https://www.free-dev.fr" target="_blank" className="font-neulisalt dark:text-[#F4DFDF]">
                    {`free-dev.fr`}
                </Link>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Hébergement</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Netlify
                    610 22nd Street, 
                    Suite 315
                    CA 94107 San Francisco
                    États-Unis`}
                </p>
                <Link href="https://www.netlify.com" target="_blank" className="font-neulisalt dark:text-[#F4DFDF]">
                    {`netlify.com`}
                </Link>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Accès au site</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Le Site est normalement accessible, à tout moment, à l'Utilisateur. Toutefois, l'Editeur pourra, à tout
                    moment, suspendre, limiter ou interrompre le Site afin de procéder, notamment, à des mises à jour ou
                    des modifications de son contenu. L'Editeur ne pourra en aucun cas être tenu responsable des
                    conséquences éventuelles de cette indisponibilité sur les activités de l'Utilisateur.`}
                </p>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Stockages des données</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Firebase
                    1600 Amphitheatre Parkway
                    Mountain View, CA 94043
                    États-Unis`}
                </p>
                <Link href="https://www.firebase.google.com" target="_blank" className="font-neulisalt dark:text-[#F4DFDF]">
                    {`firebase.google.com`}
                </Link>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Propriété intellectuelle</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`L'ensemble du site The Diplomatic Post, notamment les textes, graphismes, logos,
                    icônes, sons, logiciels, sont la propriété de Hugo Lambert, sauf indication contraire.
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou
                    partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite,
                    sauf autorisation écrite préalable de Hugo Lambert.`}
                </p>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Collecte des données</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Le Site assure à l'Utilisateur une collecte et un traitement des données personnelles dans le respect
                    de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers
                    aux libertés et dans le respect de la règlementation applicable en matière de traitement des données
                    à caractère personnel conformément au règlement (UE) 2016/679 du Parlement européen et du
                    Conseil du 27 avril 2016 (ci-après, ensemble, la "Règlementation applicable en matière de
                    protection des Données à caractère personnel").
                    En vertu de la Règlementation applicable en matière de protection des Données à caractère
                    personnel, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de
                    ses données personnelles. L'Utilisateur peut exercer ce droit :`}
                </p>
                <ul className="list-disc pl-6 font-neulisalt dark:text-[#F4DFDF]">
                    <li>{`par mail à l'adresse email diplomaticpost@outlook.com`}</li>
                    <li>{`depuis le formulaire de contact ;`}</li>
                    <li>{`depuis son espace personnel ;`}</li>
                </ul>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Données personnelles</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`The Diplomatic Post s'engage à ce que la collecte et le traitement de vos données,
                    effectués à partir du site, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.
                    Pour toute information ou exercice de vos droits Informatique et Libertés sur les traitements de données personnelles gérés par The Diplomatic Post,
                    vous pouvez nous contacter par email à l'adresse : diplomaticpost@outlook.fr.`}
                </p>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Limitation de responsabilité</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`The Diplomatic Post ne pourra être tenu responsable des dommages directs et indirects
                    causés au matériel de l'utilisateur, lors de l'accès au site The Diplomatic Post, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées,
                    soit de l'apparition d'un bug ou d'une incompatibilité. The Diplomatic Post ne pourra également être tenu responsable des dommages indirects (tels par exemple qu'une perte de marché ou perte d'une chance)
                    consécutifs à l'utilisation du site.`}
                </p>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Droit applicable et application de juridiction</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Tout litige en relation avec l'utilisation du site The Diplomatic Post est soumis au droit français.
                     Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.`}
                </p>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2 dark:text-[#F4DFDF]">Contact</h3>
                <p className="font-neulisalt dark:text-[#F4DFDF]">
                    {`Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse suivante : diplomaticpost@outlook.fr.`}
                </p>
            </div>
        </main>
    );
}