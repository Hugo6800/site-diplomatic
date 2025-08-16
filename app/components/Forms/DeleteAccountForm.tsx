'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { deleteAccount } from '@/app/hooks/account';

export default function DeleteAccountForm() {
    const router = useRouter();
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <form 
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
                e.preventDefault();
                setIsDeleting(true);
                setDeleteError('');
                const result = await deleteAccount(deletePassword);
                if (result.success) {
                    router.push('/');
                } else {
                    setDeleteError(result.error || 'Une erreur est survenue');
                    setIsDeleting(false);
                }
            }}
        >
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Supprimer mon compte</h2>
            <label htmlFor="delete-password" className="text-2xl font-neulisalt font-semibold">Entrez votre mot de passe</label>
            <input
                type="password"
                id="delete-password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5"
                placeholder="Une erreur est si vite arrivée !"
                required
            />
            {deleteError && (
                <p className="text-red-500 font-neulisalt">{deleteError}</p>
            )}
            <button
                type="submit"
                disabled={isDeleting}
                className={`
                    flex items-center justify-center gap-2 lg:w-[40%] px-2 py-4 
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
        </form>
    );
}
