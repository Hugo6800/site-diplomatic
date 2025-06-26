'use client'

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

interface LoginFormProps {
    onSwitchToSignUp: () => void;
    onForgotPassword: () => void;
    redirectUrl?: string;
}

export default function LoginForm({ onSwitchToSignUp, onForgotPassword, redirectUrl = '/' }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirection après connexion réussie
            window.location.href = redirectUrl;
        } catch (err) {
            console.error(err);
            setError('Email ou mot de passe incorrect');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h1 className="text-3xl font-bold font-fractul mb-6">Se connecter</h1>
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
                <div>
                    <label htmlFor="password" className="block font-neulisalt mb-2">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-md bg-white/5"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-[#DE595C] text-white font-neulisalt py-2 px-4 rounded-md hover:bg-[#DE595C]/90 transition-colors"
                >
                    Se connecter
                </button>
                <div className="flex flex-col items-center gap-2 text-sm mt-4">
                    <button
                        type="button"
                        onClick={() => onSwitchToSignUp()}
                        className="text-[#DE595C] hover:underline"
                    >
                        Créer un compte
                    </button>
                    <button
                        type="button"
                        className="text-[#DE595C] hover:underline text-sm"
                        onClick={onForgotPassword}
                    >
                        Mot de passe oublié ?
                    </button>
                </div>
            </form>
        </div>
    );
}
