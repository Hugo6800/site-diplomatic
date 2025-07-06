"use client";

import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';

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
            setIsLoading(false);
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
            console.error('Erreur lors de l\'envoi:', error);
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
                <div className="flex flex-col gap-4 lg:w-1/2">
                    <label htmlFor="name" className="text-3xl font-bold">Nom</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5"
                        placeholder="Dubois"
                        required
                    />
                </div>
                <div className="flex flex-col gap-4 lg:w-1/2">
                    <label htmlFor="firstname" className="text-3xl font-bold">Prénom</label>
                    <input
                        type="text"
                        id="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5"
                        placeholder="Jean Eudes"
                        required
                    />
                </div>
            </div>
            <label htmlFor="email" className="text-3xl font-bold">Email</label>
            <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5"
                placeholder="jean.eudes@gmail.com"
                required
            />
            <label htmlFor="theme" className="text-3xl font-bold">Thème</label>
            <select
                id="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5"
                required
            >
                <option value="">Sélectionnez, la liste est longue !</option>
                <option value="Proposition article">{`Proposition d'article`}</option>
                <option value="Correction article">Correction ou suggestion sur un article publié</option>
                <option value="Demande collaboration">Demande de collaboration</option>
                <option value="Question">Question générale</option>
                <option value="Demande abonnement">{`Demande d'abonnement ou de suivi`}</option>
                <option value="Recommandation lecture">Recommandation de lecture ou de source</option>
                <option value="Invitation event interview">Invitation à un événement ou interview</option>
                <option value="Partenariat">Partenariat ou communication</option>
                <option value="Problème technique">Problème technique sur le site</option>
                <option value="Autre">Autre (à préciser dans le message)</option>
            </select>
            <label htmlFor="subject" className="text-3xl font-bold">Sujet</label>
            <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-[#F3DEDE] rounded-full bg-white/5"
                placeholder="Que nous vaut votre visite ?"
                required
            />
            <label htmlFor="message" className="text-3xl font-bold">Message</label>
            <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={8}
                className="w-full py-2 px-4 border border-[#F3DEDE] rounded-4xl bg-white/5"
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