import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Utiliser les variables d'environnement pour les informations sensibles
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialiser l'application Firebase Admin si elle n'existe pas déjà
const apps = getApps();
const adminApp = apps.length === 0 
  ? initializeApp({
      credential: cert(serviceAccount),
    })
  : apps[0];

// Exporter les services Firebase Admin
export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
