'use client'

import HeaderUserAccount from "../HeaderUserAccount";

export default function PanelSection() {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">{`Panel d'éditeur`}</h2>
            <HeaderUserAccount />
        </section>
    )
}