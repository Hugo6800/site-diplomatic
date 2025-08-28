'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebase';

// Interface for our user data including paywall status
export interface UserData {
  id: string;
  email: string | null;
  paywall: boolean;
  displayName: string | null;
  photoURL: string | null;
  isLoading: boolean;
}

// Default user state
const defaultUserState: UserData = {
  id: '',
  email: null,
  paywall: false,
  displayName: null,
  photoURL: null,
  isLoading: true,
};

// Create the context
export const UserContext = createContext<{
  user: UserData;
  isAuthenticated: boolean;
}>({
  user: defaultUserState,
  isAuthenticated: false,
});

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(defaultUserState);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setIsAuthenticated(true);
        
        try {
          // Fetch additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              paywall: userData.paywall || false, // Default to false if not specified
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              isLoading: false,
            });
          } else {
            // User document doesn't exist in Firestore
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              paywall: false, // Default to false
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              isLoading: false,
            });
            
            console.warn('User document not found in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            ...defaultUserState,
            id: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isLoading: false,
          });
        }
      } else {
        // User is signed out
        setIsAuthenticated(false);
        setUser({
          ...defaultUserState,
          isLoading: false,
        });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}
