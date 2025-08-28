"use client";

import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        firstname: '',
        email: '',
        theme: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS configuration is missing')
            alert('Erreur de configuration du service d\'envoi d\'email')
            setIsLoading(false)
            return
        }

        try {
            // 1. Envoyer l'email via EmailJS
            await emailjs.send(
                serviceId,
                templateId,
                {
                    name: formData.name,
                    firstname: formData.firstname,
                    email: formData.email,
                    theme: formData.theme,
                    subject: formData.subject,
                    message: formData.message
                },
                publicKey
            );
            
            // 2. Enregistrer la soumission dans Firestore
            const contactSubmissionsRef = collection(db, 'contactSubmissions');
            await addDoc(contactSubmissionsRef, {
                // Combiner nom et prénom dans le champ name pour Firestore
                name: `${formData.name} ${formData.firstname}`,
                email: formData.email,
                theme: formData.theme,
                subject: formData.subject,
                message: formData.message,
                timestamp: Timestamp.now(),
                status: 'open' // Par défaut, le statut est 'open' (ouvert)
            });
            
            // Réinitialiser le formulaire
            setFormData({
                name: '',
                firstname: '',
                email: '',
                theme: '',
                subject: '',
                message: ''
            });

            alert('Message envoyé avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'envoi ou de l\'enregistrement:', error);
            alert('Une erreur est survenue lors de l\'envoi du message.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-neulisalt">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col lg:w-1/2">
                    <label htmlFor="name" className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-2 dark:text-white w-fit">Nom</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5 font-neulisalt"
                        placeholder="Dubois"
                        required
                    />
                </div>
                <div className="flex flex-col gap-4 lg:w-1/2">
                    <label htmlFor="firstname" className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-2 dark:text-white w-fit">Prénom</label>
                    <input
                        type="text"
                        id="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5 font-neulisalt"
                        placeholder="Jean Eudes"
                        required
                    />
                </div>
            </div>
            <label htmlFor="email" className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-2 dark:text-white w-fit">Email</label>
            <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5 font-neulisalt"
                placeholder="jean.eudes@gmail.com"
                required
            />
            <label htmlFor="theme" className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-2 dark:text-white w-fit">Thème</label>
            <select
                id="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5 font-neulisalt"
                required
            >
                <option value="">Sélectionnez, la liste est longue !</option>
                <option value="Proposition article">{`Proposition d'article`}</option>
                <option value="Correction ou suggestion sur un article publié">Correction ou suggestion sur un article publié</option>
                <option value="Demande collaboration">Demande de collaboration</option>
                <option value="Question générale">Question générale</option>
                <option value="Demande abonnement ou de suivi">{`Demande d'abonnement ou de suivi`}</option>
                <option value="Recommandation lecture ou source">Recommandation de lecture ou de source</option>
                <option value="Invitation à un événement ou interview">Invitation à un événement ou interview</option>
                <option value="Partenariat ou communication">Partenariat ou communication</option>
                <option value="Problème technique sur le site">Problème technique sur le site</option>
                <option value="Autre">Autre (à préciser dans le message)</option>
            </select>
            <label htmlFor="subject" className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-2 dark:text-white w-fit">Sujet</label>
            <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5 font-neulisalt"
                placeholder="Que nous vaut votre visite ?"
                required
            />
            <label htmlFor="message" className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-2 dark:text-white w-fit">Message</label>
            <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={8}
                className="w-full py-2 px-4 border border-[#F3DEDE] rounded-4xl bg-white/5 font-neulisalt"
                placeholder="Élaborez, on a tout le temps !"
                required
            ></textarea>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full lg:w-1/2 bg-[#DE595C] font-bold tracking-wider cursor-pointer font-neulisalt py-3 rounded-full hover:bg-[#DE595C]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Envoi en cours...' : 'Envoyer'}
            </button>
        </form>
    )
}