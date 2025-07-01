'use client'

import { useState } from 'react';
import { changePassword } from '@/app/utils/password';

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);

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
            <h2 className="font-bold font-neulisalt text-[2rem]">Mot de passe</h2>
            <label htmlFor="password" className="text-2xl font-neulisalt font-semibold">Mot de passe actuel</label>
            <input 
                type="password" 
                id="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5" 
                placeholder="Celui que vous utilisez en ce moment !" 
                required
            />
            <label htmlFor="new-password" className="text-2xl font-neulisalt font-semibold">Nouveau mot de passe</label>
            <input 
                type="password" 
                id="new-password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5" 
                placeholder="C'est le moment de faire parler votre imagination !" 
                required
                minLength={6}
            />
            <label htmlFor="confirm-password" className="text-2xl font-neulisalt font-semibold">Confirmer le nouveau mot de passe</label>
            <input 
                type="password" 
                id="confirm-password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 border-2 border-[#F3DEDE] rounded-full bg-white/5" 
                placeholder="On n'est jamais sûr de rien !" 
                required
            />
            {passwordError && (
                <p className="text-red-500 font-neulisalt">{passwordError}</p>
            )}
            <button 
                type="submit"
                disabled={isChangingPassword}
                className={`
                    w-1/3 px-2 py-4 
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
