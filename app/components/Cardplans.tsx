import Link from "next/link";
import Image from "next/image";

export default function Cardplans({ title, image, line1, line2, line3, priceTag  }: { title: string, image: string, line1: string, line2: string, line3: string, priceTag: string }) {
    return (
        <article className="flex flex-col gap-4 px-4 pt-16 pb-8 bg-[#F3DEDE] rounded-3xl">
            <Image
                src={image}
                alt={title}
                width={100}
                height={32}
                className="object-contain"
            />
            <h2 className="font-bold font-neulisalt text-3xl mb-4">{title}</h2>
            <div className="bg-black h-[2px] w-full"></div>
            <div className="flex flex-col gap-1">
                <p className="flex items-center gap-2 font-neulisalt">
                    <Image
                        src="/icons/Checkbox.svg"
                        alt="Check"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                    {line1}
                </p>
                <p className="flex items-center gap-2">
                    <Image
                        src="/icons/Checkbox.svg"
                        alt="Check"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                    {line2}
                </p>
                <p className="flex items-center gap-2">
                    <Image
                        src="/icons/Checkbox.svg"
                        alt="Check"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                    {line3}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <p className="font-neulisalt">TOTAL</p>
                <div className="border-t-[2px] border-dashed border-black w-full"></div>
            </div>
            <div className="flex justify-between items-center gap- bg-[#F3DEDE] font-neulisalt">
                <Image
                    src={priceTag}
                    alt="Price tag"
                    width={100}
                    height={60}
                    className="object-cover w-[100px] h-[60px] mx-auto"
                />
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