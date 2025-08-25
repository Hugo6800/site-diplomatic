'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ChangePasswordForm from './Forms/ChangePasswordForm';
import DeleteAccountForm from './Forms/DeleteAccountForm';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/app/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function AccountSettings() {
    const router = useRouter();
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setEmailNotifications(userData.newsletter || false);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, []);
    
    const handleNewsletterToggle = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const newValue = !emailNotifications;
                setEmailNotifications(newValue);
                
                // Update in Firestore
                await updateDoc(doc(db, 'users', currentUser.uid), {
                    newsletter: newValue
                });
                
                // Mettre à jour dans Brevo
                try {
                    if (newValue) {
                        // Ajouter à la liste Brevo
                        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                        const userData = userDoc.exists() ? userDoc.data() : null;
                        
                        await fetch('/api/newsletter', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: currentUser.email,
                                firstName: userData?.firstName || '',
                                lastName: userData?.lastName || ''
                            }),
                        });
                    } else {
                        // Supprimer de la liste Brevo
                        await fetch(`/api/newsletter?email=${encodeURIComponent(currentUser.email || '')}`, {
                            method: 'DELETE',
                        });
                    }
                } catch (brevoError) {
                    console.error('Erreur lors de la mise à jour de la newsletter Brevo:', brevoError);
                    // Ne pas bloquer la mise à jour Firestore si Brevo échoue
                }
            }
        } catch (error) {
            console.error('Error updating newsletter preference:', error);
            // Revert the UI state if update fails
            setEmailNotifications(!emailNotifications);
        }
    };

    return (
        <section className="flex flex-col gap-8 p-8 max-w-4xl mx-auto">
            <button
                onClick={() => router.push('/profil')}
                className="flex justify-center items-center gap-2 lg:w-1/4 px-2 py-4 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer"
            >
                <Image
                    src="/icons/arrow-left.svg"
                    alt="Retour"
                    width={24}
                    height={24}
                />
                Retour au compte
            </button>
            <ChangePasswordForm />
            <div className="flex flex-col gap-4">
                <h2 className="font-bold font-neulisalt bg-[#F3DEDE] dark:bg-[#1E1E1E] flex justify-center items-center rounded-2xl px-4 py-2 italic text-[1rem] mb-4 dark:text-white w-fit">Newsletter par email</h2>
                <div className="flex items-center justify-between py-2">
                    <span className="text-gray-700">Recevoir la newsletter par email</span>
                    <button
                        onClick={handleNewsletterToggle}
                        disabled={loading}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? 'bg-gray border-0' : 'bg-white border-2 border-black'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span className="sr-only">Activer les notifications par email</span>
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${emailNotifications ? 'translate-x-5' : 'translate-x-1'}`}
                        />
                    </button>
                </div>
            </div>
            <DeleteAccountForm />
        </section>
    );
}