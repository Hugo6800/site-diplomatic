'use client'

import { useState } from 'react';
import Image from 'next/image';
import { changePassword } from '@/app/utils/password';

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <form 
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
                e.preventDefault();
                setIsChangingPassword(true);
                setPasswordError('');
                
                const result = await changePassword(currentPassword, newPassword, confirmPassword);
                if (result.success) {
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    // Optionnel : afficher un message de succès
                } else {
                    setPasswordError(result.error || 'Une erreur est survenue');
                }
                setIsChangingPassword(false);
            }}
        >
            <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Mot de passe</h2>
            <label htmlFor="password" className="text-2xl font-neulisalt font-semibold">Mot de passe actuel</label>
            <div className="relative">
                <input 
                    type={showCurrentPassword ? "text" : "password"} 
                    id="password" 
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5 font-neulisalt pr-12" 
                    placeholder="Celui que vous utilisez en ce moment !" 
                    required
                />
                <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    aria-label={showCurrentPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                    <Image 
                        src={showCurrentPassword ? "/icons/visibility.svg" : "/icons/visibility_off.svg"}
                        alt={showCurrentPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <label htmlFor="new-password" className="text-2xl font-neulisalt font-semibold">Nouveau mot de passe</label>
            <div className="relative">
                <input 
                    type={showNewPassword ? "text" : "password"} 
                    id="new-password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5 font-neulisalt pr-12" 
                    placeholder="C'est le moment de faire parler votre imagination !" 
                    required
                    minLength={6}
                />
                <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={showNewPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                    <Image 
                        src={showNewPassword ? "/icons/visibility.svg" : "/icons/visibility_off.svg"}
                        alt={showNewPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <label htmlFor="confirm-password" className="text-2xl font-neulisalt font-semibold">Confirmer le nouveau mot de passe</label>
            <div className="relative">
                <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    id="confirm-password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5 font-neulisalt pr-12" 
                    placeholder="On n'est jamais sûr de rien !" 
                    required
                />
                <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                    <Image 
                        src={showConfirmPassword ? "/icons/visibility.svg" : "/icons/visibility_off.svg"}
                        alt={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            {passwordError && (
                <p className="text-red-500 font-neulisalt">{passwordError}</p>
            )}
            <button 
                type="submit"
                disabled={isChangingPassword}
                className={`
                    lg:w-1/3 px-2 py-4 
                    ${isChangingPassword ? 'bg-gray-400' : 'bg-[#F3DEDE]'} 
                    cursor-pointer rounded-full font-semibold font-neulisalt
                    transition-colors duration-200
                    disabled:cursor-not-allowed
                `}
            >
                {isChangingPassword ? 'Modification...' : 'Modifier le mot de passe'}
            </button>
        </form>
    );
}
