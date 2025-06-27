'use client'

import { useState } from 'react';
import { auth } from '@/app/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { validateEmail, isValidEmail } from '@/app/hooks/authValidation';

interface ForgotPasswordFormProps {
    onSwitchToLogin: () => void;
}

export default function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [validationError, setValidationError] = useState({
        email: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateEmail(email);
        setValidationError(errors);
        
        if (!isValidEmail(errors)) {
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Une erreur est survenue. Vérifiez votre adresse email.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h2 className="text-2xl font-fractul font-bold mb-4">Mot de passe oublié</h2>
            {success ? (
                <div className="text-center">
                    <p className="mb-4 font-neulisalt">Un email de réinitialisation a été envoyé à {email}.</p>
                    <button
                        onClick={onSwitchToLogin}
                        className="text-primary hover:text-primary/80 font-semibold"
                    >
                        Retour à la connexion
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="block font-neulisalt mb-2">Adresse mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=" p-2 border rounded-md bg-white/5 focus:outline-none focus:border-primary"
                        />
                    </div>
                    {validationError.email && <p className="text-red-500 text-sm font-neulisalt">{validationError.email}</p>}
                    {error && <p className="text-red-500 text-sm font-neulisalt">{error}</p>}
                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            className=" bg-[#DE595C] text-white font-neulisalt py-2 px-4 rounded-md hover:bg-[#DE595C]/90 transition-colors"
                        >
                            Envoyer le lien de réinitialisation
                        </button>
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-[#DE595C] hover:underline"
                        >
                            Retour à la connexion
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
