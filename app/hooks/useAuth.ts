'use client'

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase';
import { User, UserData } from '@/app/types/user';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data() as UserData;
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
                    setUser({ ...firebaseUser, role: 'reader', createdAt: new Date() });
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
