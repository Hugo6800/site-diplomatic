'use client'

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase';
import { validateAuthFields, isValidAuth } from '@/app/hooks/authValidation';

interface SignUpFormProps {
    onSwitchToLogin: () => void;
}

export default function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
          await updateProfile(user, {
            displayName: `${firstName} ${lastName}`
          });
      
          await sendEmailVerification(user);
      
          await setDoc(doc(db, 'users', user.uid), {
            email,
            firstName,
            lastName,
            role: "reader",
            createdAt: new Date()
          });
      
          setError('Un email de vérification vous a été envoyé. Veuillez vérifier votre boîte de réception.');
      
        } catch (err) {
          console.error(err);
          setError('Une erreur est survenue lors de la création du compte');
        }
      };
      

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h1 className="text-3xl font-bold font-fractul mb-6">Créer un compte</h1>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="lastName" className="block font-neulisalt mb-2">Nom</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border rounded-md bg-white/5"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="firstName" className="block font-neulisalt mb-2">Prénom</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border rounded-md bg-white/5"
                            required
                        />
                    </div>
                </div>
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
                    <label htmlFor="password" className="block font-neulisalt mb-2">Mot de passe (min. 6 caractères)</label>
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
                    S&apos;inscrire
                </button>
                <div className="text-sm text-center mt-4">
                    <button
                        type="button"
                        onClick={() => onSwitchToLogin()}
                        className="text-[#DE595C] hover:underline"
                    >
                        Déjà membre ? Se connecter
                    </button>
                </div>
            </form>
        </div>
    );
}
