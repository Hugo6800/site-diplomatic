'use client'

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

interface ForgotPasswordFormProps {
    onSwitchToLogin: () => void;
}

export default function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Une erreur est survenue. Vérifiez votre adresse email.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h1 className="text-3xl font-bold font-fractul mb-6">Mot de passe oublié</h1>
            {success ? (
                <div className="text-center">
                    <p className="text-green-600 mb-4">Un email de réinitialisation a été envoyé !</p>
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-[#DE595C] hover:underline"
                    >
                        Retour à la connexion
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block font-neulisalt mb-2">Adresse mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-md bg-white/5"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#DE595C] text-white font-neulisalt py-2 px-4 rounded-md hover:bg-[#DE595C]/90 transition-colors"
                    >
                        Envoyer
                    </button>
                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-[#DE595C] hover:underline text-sm"
                        >
                            Retour à la connexion
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
