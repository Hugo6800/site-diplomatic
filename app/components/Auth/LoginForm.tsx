'use client'

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase';
import { validateAuthFields, isValidAuth } from '@/app/hooks/authValidation';

interface LoginFormProps {
    onSwitchToSignUp: () => void;
    onForgotPassword: () => void;
    redirectUrl?: string;
}

export default function LoginForm({ onSwitchToSignUp, onForgotPassword, redirectUrl = '/' }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateAuthFields(email, password);
        setValidationErrors(errors);
        
        if (!isValidAuth(errors)) {
            return;
        }

        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            
            if (!user.emailVerified) {
                setError('Veuillez vérifier votre email avant de vous connecter.');
                return;
            }

            // Vérifier si l'utilisateur existe déjà dans Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));

            if (!userDoc.exists()) {
                // Récupérer les données temporaires du localStorage
                const pendingData = localStorage.getItem('pendingUserData');
                let userData = null;

                if (pendingData) {
                    userData = JSON.parse(pendingData);
                    localStorage.removeItem('pendingUserData'); // Nettoyer les données temporaires
                }

                // Créer l'utilisateur dans Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    firstName: userData?.firstName || user.displayName?.split(' ')[1] || '',
                    lastName: userData?.lastName || user.displayName?.split(' ')[0] || '',
                    role: 'reader',
                    createdAt: new Date()
                });
            }

            window.location.href = redirectUrl;
        } catch (err) {
            console.error(err);
            setError('Email ou mot de passe incorrect');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h1 className="text-3xl font-bold font-fractul mb-6">Se connecter</h1>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                    <label htmlFor="email" className="block font-neulisalt mb-2">Adresse mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-md bg-white/5"
                    />
                    {validationErrors.email && (
                        <div className="text-red-500 text-sm mt-1 font-neulisalt">
                            {validationErrors.email}
                        </div>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="block font-neulisalt mb-2">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-md bg-white/5"
                    />
                    {validationErrors.password && (
                        <div className="text-red-500 text-sm mt-1 font-neulisalt">
                            {validationErrors.password}
                        </div>
                    )}
                </div>
                {error && (
                    <div className="text-red-500 text-sm font-neulisalt text-center">
                        {error}
                    </div>
                )}
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
