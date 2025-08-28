import Link from "next/link";
import Image from "next/image";

export default function CardPlansUnique() {
    return (
        <article className="flex flex-col gap-4 px-4 pt-16 pb-8 bg-[#F3DEDE] rounded-3xl">
            <Image
                src="/Logo_plans.png"
                alt="Logo"
                width={100}
                height={32}
                className="object-contain"
            />
            <div className="bg-black h-[2px] w-full"></div>
            <div className="flex justify-between items-center gap- bg-[#F3DEDE] font-neulisalt">
                <p className="font-neulisalt">TOTAL</p>
                <Image
                    src="/Price_tag_monthly.svg"
                    alt="Price tag"
                    width={100}
                    height={60}
                    className="object-cover w-[100px] h-[60px] mx-auto"
                />
                <p className="font-neulisalt">/mois</p>
            </div>
            <div className="border-t-[3px] border-dotted border-black w-full"></div>
            <Link href={"/pricing"} className="font-bold font-neulisalt underline underline-offset-2 decoration-dotted w-full text-center hover:bg-black hover:text-[#F3DEDE] hover:no-underline hover:underline-offset-0">Payer avec Stripe</Link>
            <div className="border-t-[3px] border-dotted border-black w-full"></div>
            <p className="text-center font-neulisalt">Remboursable -- Abonnement récurrent</p>
            <Image
                src="/icons/TDP-PLAN-MENSUEL.svg"
                alt="Check"
                width={24}
                height={24}
                className="object-contain w-full"
            />
            <p className="text-center font-neulisalt">Merci de votre soutien !</p>
        </article>
    )
}