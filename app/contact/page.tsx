'use client'

import ContactForm from '@/app/components/Forms/ContactForm'

export default function Contact() {
    return (
        <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
            <h2 className="font-bold font-fractul text-4xl lg:text-5xl mb-5">Nous contacter</h2>
            <ContactForm />
        </main>
    )
}