import Link from "next/link";

export default function Mentions() {
    return (
        <main className="flex flex-col gap-4 px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
            <h2 className="font-bold font-fractul text-5xl">Mentions légales</h2>
            <p className="font-neulisalt">
                {`Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance
                en l'économie numérique, il est précisé aux utilisateurs du site The Diplomatic Post
                l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :`}
            </p>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2">Éditeur du site</h3>
                <p className="font-neulisalt">
                    {`Angélique Copéré - Email : angelique.copere@free-dev.fr`}
                </p>
                <Link href="https://free-dev.fr">
                    {`Free-dev.fr`}
                </Link>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2">Hébergement</h3>
                <p className="font-neulisalt">
                    {`Vercel Inc.
                    340 S Lemon Ave #4133
                    Walnut, CA 91789
                    États-Unis`}
                </p>
                <Link href="https://vercel.com">
                    {`Vercel.com`}
                </Link>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2">Propriété intellectuelle</h3>
                <p className="font-neulisalt">
                    {`L'ensemble du site The Diplomatic Post, notamment les textes, graphismes, logos,
                    icônes, sons, logiciels, sont la propriété de Hugo Lambert, sauf indication contraire.
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou
                    partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite,
                    sauf autorisation écrite préalable de Hugo Lambert.`}
                </p>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2">Données personnelles</h3>
                <p className="font-neulisalt">
                    {`The Diplomatic Post s'engage à ce que la collecte et le traitement de vos données,
                    effectués à partir du site, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.
                    Pour toute information ou exercice de vos droits Informatique et Libertés sur les traitements de données personnelles gérés par The Diplomatic Post,
                    vous pouvez nous contacter par email à l'adresse : privacy@diplomaticpost.com.`}
                </p>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2">Limitation de responsabilité</h3>
                <p className="font-neulisalt">
                    {`The Diplomatic Post ne pourra être tenu responsable des dommages directs et indirects
                    causés au matériel de l'utilisateur, lors de l'accès au site The Diplomatic Post, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées,
                    soit de l'apparition d'un bug ou d'une incompatibilité. The Diplomatic Post ne pourra également être tenu responsable des dommages indirects (tels par exemple qu'une perte de marché ou perte d'une chance)
                    consécutifs à l'utilisation du site.`}
                </p>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2">Droit applicable et application de juridiction</h3>
                <p className="font-neulisalt">
                    {`Tout litige en relation avec l'utilisation du site The Diplomatic Post est soumis au droit français.
                     Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.`}
                </p>
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold font-fractul text-lg mb-2">Contact</h3>
                <p className="font-neulisalt">
                    {`Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse suivante : contact@diplomaticpost.com.`}
                </p>
            </div>
        </main>
    );
}