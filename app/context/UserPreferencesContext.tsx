'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';

interface UserPreferencesContextType {
    showEmail: boolean;
    showStatus: boolean;
    showAccountAge: boolean;
    toggleEmail: () => void;
    toggleStatus: () => void;
    toggleAccountAge: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [showEmail, setShowEmail] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showAccountAge, setShowAccountAge] = useState(false);

    // Charger les préférences depuis Firestore au démarrage
    useEffect(() => {
        const loadPreferences = async () => {
            if (!user) return;

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const prefs = userDoc.data()?.preferences || {};
                setShowEmail(prefs.showEmail ?? false);
                setShowStatus(prefs.showStatus ?? false);
                setShowAccountAge(prefs.showAccountAge ?? false);
            } catch (error) {
                console.error('Erreur lors du chargement des préférences:', error);
            }
        };

        loadPreferences();
    }, [user]);

    // Fonctions de toggle avec sauvegarde Firestore
    const toggleEmail = async () => {
        if (!user) return;
        const newValue = !showEmail;
        setShowEmail(newValue);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                'preferences.showEmail': newValue
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour des préférences:', error);
            setShowEmail(!newValue); // Revenir à l'ancienne valeur en cas d'erreur
        }
    };

    const toggleStatus = async () => {
        if (!user) return;
        const newValue = !showStatus;
        setShowStatus(newValue);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                'preferences.showStatus': newValue
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour des préférences:', error);
            setShowStatus(!newValue);
        }
    };

    const toggleAccountAge = async () => {
        if (!user) return;
        const newValue = !showAccountAge;
        setShowAccountAge(newValue);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                'preferences.showAccountAge': newValue
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour des préférences:', error);
            setShowAccountAge(!newValue);
        }
    };

    return (
        <UserPreferencesContext.Provider 
            value={{
                showEmail,
                showStatus,
                showAccountAge,
                toggleEmail,
                toggleStatus,
                toggleAccountAge
            }}
        >
            {children}
        </UserPreferencesContext.Provider>
    );
}

export function useUserPreferences() {
    const context = useContext(UserPreferencesContext);
    if (context === undefined) {
        throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
    }
    return context;
}
