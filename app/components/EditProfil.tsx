'use client'

import Image from 'next/image';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { useState, useRef } from 'react';

export default function EditProfil() {
    const router = useRouter();
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showEmail, showStatus, showAccountAge, toggleEmail, toggleStatus, toggleAccountAge } = useUserPreferences();

    const handleProfilePictureUpload = async (file: File) => {
        if (!file || !user) return;

        // Vérifier la taille du fichier (1Mo = 1048576 octets)
        if (file.size > 1048576) {
            alert('Le fichier est trop volumineux. La taille maximum est de 1Mo.');
            return;
        }

        try {
            setUploading(true);

            console.log('Début de l\'upload vers Cloudinary');
            console.log('Nom du fichier:', file.name);
            console.log('Type du fichier:', file.type);
            console.log('Taille du fichier:', file.size, 'bytes');

            // Préparer les paramètres pour Cloudinary
            const timestamp = Math.round(new Date().getTime() / 1000);
            const folder = 'profile_pictures';

            // Faire une requête au serveur pour obtenir la signature
            const signatureResponse = await fetch('/api/cloudinary/sign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp,
                    folder
                })
            });

            if (!signatureResponse.ok) {
                throw new Error('Erreur lors de la génération de la signature');
            }

            const { signature } = await signatureResponse.json();

            // Préparer le formulaire pour Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');
            formData.append('timestamp', String(timestamp));
            formData.append('folder', folder);
            formData.append('signature', signature);

            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;
            console.log('URL Cloudinary:', cloudinaryUrl);

            // Envoyer l'image à Cloudinary
            const cloudinaryResponse = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData
            });

            if (!cloudinaryResponse.ok) {
                const errorData = await cloudinaryResponse.text();
                console.error('Réponse Cloudinary:', {
                    status: cloudinaryResponse.status,
                    statusText: cloudinaryResponse.statusText,
                    error: errorData
                });
                throw new Error(`Erreur lors du téléchargement de l'image: ${cloudinaryResponse.status} ${cloudinaryResponse.statusText}`);
            }

            const cloudinaryData = await cloudinaryResponse.json();

            // Mettre à jour le photoURL dans Firestore
            await updateDoc(doc(db, 'users', user.uid), {
                photoURL: cloudinaryData.secure_url
            });

            // Mettre à jour le photoURL dans Firebase Auth
            const currentUser = auth.currentUser;
            if (currentUser) {
                await updateProfile(currentUser, {
                    photoURL: cloudinaryData.secure_url
                });
            }

            // Recharger la page pour voir les changements
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            alert('Une erreur est survenue lors du téléchargement de l\'image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="flex flex-col gap-8 p-8 max-w-4xl mx-auto font-neulisalt">
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
                <div className="flex items-center justify-between py-2">
                    <p>Photo de profil</p>
                    <div className="relative w-16 h-16">
                        <Image
                            src={user?.photoURL || '/icons/account_circle.svg'}
                            alt="User"
                            width={60}
                            height={60}
                            className="rounded-full object-cover"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleProfilePictureUpload(file);
                            }}
                        />
                        <button
                            className={`absolute bottom-0 -right-2 bg-white rounded-full p-1 shadow ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                        >
                            <Image
                                src="/icons/pencil.svg"
                                alt="Modifier la photo"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Afficher l&apos;adresse email</span>
                    <button
                        onClick={toggleEmail}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showEmail ? 'bg-gray border-0' : 'bg-white border-2 border-black'}`}
                    >
                        <span className="sr-only">Afficher l&apos;adresse email</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${showEmail ? 'translate-x-5' : 'translate-x-1'}`}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Afficher le statut</span>
                    <button
                        onClick={toggleStatus}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showStatus ? 'bg-gray border-0' : 'bg-white border-2 border-black'}`}
                    >
                        <span className="sr-only">Afficher le statut</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${showStatus ? 'translate-x-5' : 'translate-x-1'}`}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Afficher l&apos;âge du compte</span>
                    <button
                        onClick={toggleAccountAge}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showAccountAge ? 'bg-gray border-0' : 'bg-white border-2 border-black'}`}
                    >
                        <span className="sr-only">Afficher l&apos;âge du compte</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${showAccountAge ? 'translate-x-5' : 'translate-x-1'}`}
                        />
                    </button>
                </div>
            </div>
        </section>
    )
}