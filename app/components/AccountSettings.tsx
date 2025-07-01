'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { deleteAccount } from '../utils/account';

export default function AccountSettings() {
    const router = useRouter();
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        setDeleteError('');

        const result = await deleteAccount(deletePassword);
        
        if (result.success) {
            router.push('/');
        } else {
            setDeleteError(result.error || 'Une erreur est survenue');
            setIsDeleting(false);
        }
    };

    return (
        <section className="flex flex-col gap-8 p-8 max-w-4xl mx-auto">
            <button
                onClick={() => router.push('/profil')}
                className="flex justify-center items-center gap-2 w-1/4 px-2 py-4 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer"
            >
                <Image
                    src="/icons/arrow-left.svg"
                    alt="Retour"
                    width={24}
                    height={24}
                />
                Retour au compte
            </button>
            <div className="flex flex-col gap-4">
                <h2 className="font-bold font-neulisalt text-[2rem]">Mot de passe</h2>
                <label htmlFor="password" className="text-2xl font-neulisalt font-semibold">Mot de passe actuel</label>
                <input type="password" id="password" className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5" placeholder="Celui que vous utilisez en ce moment !" />
                <label htmlFor="new-password" className="text-2xl font-neulisalt font-semibold">Nouveau mot de passe</label>
                <input type="password" id="new-password" className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5" placeholder="C’est le moment de faire parler votre imagination !" />
                <label htmlFor="confirm-password" className="text-2xl font-neulisalt font-semibold">Confirmer le nouveau mot de passe</label>
                <input type="password" id="confirm-password" className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5" placeholder="On n’est jamais sûr de rien !" />
                <button type="submit" className="w-1/3 px-2 py-4 bg-[#F3DEDE] cursor-pointer rounded-full font-semibold font-neulisalt">Modifier le mot de passe</button>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="font-bold font-neulisalt text-[2rem]">Notifications par email</h2>
                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Recevoir les notifications par email</span>
                    <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? 'bg-gray border-0' : 'bg-white border-2 border-black'}`}
                    >
                        <span className="sr-only">Activer les notifications par email</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${emailNotifications ? 'translate-x-5' : 'translate-x-1'}`}
                        />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="font-bold font-neulisalt text-[2rem]">Supprimer mon compte</h2>
                <label htmlFor="delete-password" className="text-2xl font-neulisalt font-semibold">Entrez votre mot de passe</label>
                <input
                    type="password"
                    id="delete-password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5"
                    placeholder="Une erreur est si vite arrivée !"
                />
                {deleteError && (
                    <p className="text-red-500 font-neulisalt">{deleteError}</p>
                )}
                <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className={`
                        flex items-center justify-center gap-2 w-[40%] px-2 py-4 
                        ${isDeleting ? 'bg-gray-400' : 'bg-[var(--button-color)]'} 
                        rounded-full font-semibold font-neulisalt
                        transition-colors duration-200
                        disabled:cursor-not-allowed
                    `}
                >
                    {isDeleting ? (
                        <span>Suppression en cours...</span>
                    ) : (
                        <>
                            <Image
                                src="/icons/delete_forever.svg"
                                alt="Supprimer mon compte"
                                width={24}
                                height={24}
                            />
                            Supprimer mon compte (hélas oui !)
                        </>
                    )}
                </button>
            </div>
        </section>
    );
}