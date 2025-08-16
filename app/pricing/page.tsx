import Cardplans from "../components/Cardplans";
import { plans } from "../utils/plans";

export default function Pricing() {
    return (
        <main className="px-6 md:px-24 xl:px-64 mt-32">
            <h2 className="font-bold font-fractul text-5xl mb-4">{`Débloquez l’entièreté de nos articles`}</h2>
            <p className="font-neulisalt mb-14">{`Pourquoi ? Certains des articles de The Diplomatic Post sont soumis
                à une barrière de prix. Les équipes de rédaction, de développement et de design sont constituées de
                bénévoles. Si fonctionnelle, cette méthode nous permet de réduire les publicités intrusives lors de
                votre lecture :)`}</p>  
            <div className="flex flex-col justify-center lg:flex-row gap-8 lg:gap-20 mb-10">
                {plans.map((plan, index) => (
                    <Cardplans
                        key={index}
                        title={plan.title}
                        priceTag={plan.priceTag}
                        image={plan.image}
                        line1={plan.line1}
                        line2={plan.line2}
                        line3={plan.line3}
                        line4={plan.line4}
                        duration={plan.duration}
                    />
                ))}
            </div>
        </main>
    )
}