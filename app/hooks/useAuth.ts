'use client'

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase';
import { User, UserData } from '@/app/types/user';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Vérifier si l'email est vérifié
                    if (!firebaseUser.emailVerified) {
                        console.log('Email non vérifié');
                        setUser(null);
                        return;
                    }

                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data() as UserData;
                        
                        // Mettre à jour emailVerified dans Firestore si nécessaire
                        if (!userData.emailVerified && firebaseUser.emailVerified) {
                            await setDoc(doc(db, 'users', firebaseUser.uid), {
                                ...userData,
                                emailVerified: true
                            });
                        }

                        setUser({
                            ...firebaseUser,
                            role: userData.role,
                            createdAt: userData.createdAt instanceof Date ? userData.createdAt : userData.createdAt?.toDate()
                        });
                    } else {
                        setUser({ ...firebaseUser, role: 'reader', createdAt: new Date() });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
}
