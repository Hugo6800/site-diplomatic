'use client'

import HeaderUserAccount from "../HeaderUserAccount";

export default function PanelSection() {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="font-bold font-fractul text-4xl lg:text-5xl">{`Panel d'éditeur`}</h2>
            <HeaderUserAccount />
        </section>
    )
}