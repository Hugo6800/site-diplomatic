'use client'

import { useState, useEffect, useCallback } from 'react'
import { collection, getDocs, deleteDoc, doc, Timestamp, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'

export interface ContactSubmission {
    id: string
    name: string
    email: string
    theme: string
    subject: string
    message: string
    timestamp: Timestamp
    status: 'closed' | 'open'
}

export function useContactSubmissions() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
    const [loading, setLoading] = useState(true)
    const [searching, setSearching] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
    const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null)

    // Fonction pour trier les soumissions par statut et date
    const sortSubmissionsByStatusAndDate = (submissionsData: ContactSubmission[]) => {
        return [...submissionsData].sort((a, b) => {
            // Si a est "open" et b ne l'est pas, a vient en premier
            if (a.status === 'open' && b.status !== 'open') return -1;
            // Si b est "open" et a ne l'est pas, b vient en premier
            if (b.status === 'open' && a.status !== 'open') return 1;
            // Sinon, trier par date (du plus récent au plus ancien)
            return b.timestamp.seconds - a.timestamp.seconds;
        });
    };
    
    // Récupérer toutes les soumissions de contact
    const fetchAllSubmissions = useCallback(async () => {
        try {
            setLoading(true)
            const submissionsRef = collection(db, 'contactSubmissions')
            // Trier les soumissions par date (du plus récent au plus ancien)
            const q = query(submissionsRef, orderBy('timestamp', 'desc'))
            const snapshot = await getDocs(q)
            
            const submissionsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp || Timestamp.now()
            })) as ContactSubmission[]
            
            // Trier les soumissions pour mettre celles avec le statut "open" en premier
            const sortedSubmissions = sortSubmissionsByStatusAndDate(submissionsData);
            
            setSubmissions(sortedSubmissions)
        } catch (error) {
            console.error('Erreur lors de la récupération des soumissions de contact:', error)
        } finally {
            setLoading(false)
        }
    }, [])
    
    // Charger les soumissions au chargement initial
    useEffect(() => {
        fetchAllSubmissions()
    }, [fetchAllSubmissions])
    
    // Fonction pour rechercher des contacts par nom
    const searchContactsByName = useCallback(async (namePrefix: string) => {
        if (!namePrefix || namePrefix.length < 3) {
            // Si la recherche est vide ou trop courte, charger toutes les soumissions
            fetchAllSubmissions();
            return;
        }
        
        setSearching(true);
        try {
            console.log('Début de la recherche par nom:', namePrefix);
            const submissionsRef = collection(db, 'contactSubmissions');
            
            // Récupérer toutes les soumissions et filtrer côté client
            const q = query(submissionsRef, orderBy('timestamp', 'desc'));
            const snapshot = await getDocs(q);
            
            console.log(`Nombre de documents récupérés: ${snapshot.docs.length}`);
            
            const searchTermLower = namePrefix.toLowerCase();
            
            // Filtrer les soumissions dont le nom contient le terme de recherche (insensible à la casse)
            const submissionsData = snapshot.docs
                .map(doc => {
                    const data = doc.data();
                    // Vérifier si le document a un champ 'name'
                    if (!data.name) {
                        console.warn(`Document ${doc.id} n'a pas de champ 'name'`, data);
                    }
                    return {
                        id: doc.id,
                        ...data,
                        timestamp: data.timestamp || Timestamp.now()
                    } as ContactSubmission;
                })
                .filter(submission => {
                    if (!submission.name) {
                        return false;
                    }
                    const nameLower = submission.name.toLowerCase();
                    const match = nameLower.includes(searchTermLower);
                    console.log(`Vérification ${submission.id}: '${submission.name}' inclut '${namePrefix}'? ${match}`);
                    return match;
                });
            
            console.log(`Résultats filtrés: ${submissionsData.length} sur ${snapshot.docs.length}`);
            
            // Trier les soumissions pour mettre celles avec le statut "open" en premier
            const sortedSubmissions = sortSubmissionsByStatusAndDate(submissionsData);
            
            setSubmissions(sortedSubmissions);
        } catch (error) {
            console.error('Erreur lors de la recherche des contacts par nom:', error);
        } finally {
            setSearching(false);
        }
    }, [fetchAllSubmissions]);
    
    // Fonction pour rechercher des contacts par email
    const searchContactsByEmail = useCallback(async (emailPrefix: string) => {
        if (!emailPrefix || emailPrefix.length < 3) {
            // Si la recherche est vide ou trop courte, charger toutes les soumissions
            fetchAllSubmissions();
            return;
        }
        
        setSearching(true);
        try {
            console.log('Début de la recherche par email:', emailPrefix);
            const submissionsRef = collection(db, 'contactSubmissions');
            
            // Récupérer toutes les soumissions et filtrer côté client
            const q = query(submissionsRef, orderBy('timestamp', 'desc'));
            const snapshot = await getDocs(q);
            
            console.log(`Nombre de documents récupérés: ${snapshot.docs.length}`);
            
            const searchTermLower = emailPrefix.toLowerCase();
            
            // Filtrer les soumissions dont l'email contient le terme de recherche (insensible à la casse)
            const submissionsData = snapshot.docs
                .map(doc => {
                    const data = doc.data();
                    // Vérifier si le document a un champ 'email'
                    if (!data.email) {
                        console.warn(`Document ${doc.id} n'a pas de champ 'email'`, data);
                    }
                    return {
                        id: doc.id,
                        ...data,
                        timestamp: data.timestamp || Timestamp.now()
                    } as ContactSubmission;
                })
                .filter(submission => {
                    if (!submission.email) {
                        return false;
                    }
                    const emailLower = submission.email.toLowerCase();
                    const match = emailLower.includes(searchTermLower);
                    console.log(`Vérification ${submission.id}: '${submission.email}' inclut '${emailPrefix}'? ${match}`);
                    return match;
                });
            
            console.log(`Résultats filtrés: ${submissionsData.length} sur ${snapshot.docs.length}`);
            
            // Trier les soumissions pour mettre celles avec le statut "open" en premier
            const sortedSubmissions = sortSubmissionsByStatusAndDate(submissionsData);
            
            setSubmissions(sortedSubmissions);
        } catch (error) {
            console.error('Erreur lors de la recherche des contacts par email:', error);
        } finally {
            setSearching(false);
        }
    }, [fetchAllSubmissions]);

    // Formater la date (DD.MM.YY)
    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp || !timestamp.toDate) {
            return 'Date inconnue'
        }
        
        const date = timestamp.toDate()
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString().slice(2)
        
        return `${day}.${month}.${year}`
    }

    // Supprimer une soumission
    const deleteSubmission = async (submissionId: string) => {
        try {
            await deleteDoc(doc(db, 'contactSubmissions', submissionId))
            setSubmissions(submissions.filter(submission => submission.id !== submissionId))
            setConfirmDelete(null)
        } catch (error) {
            console.error('Erreur lors de la suppression de la soumission:', error)
        }
    }

    // Changer le statut d'une soumission
    const changeSubmissionStatus = async (submissionId: string, newStatus: 'closed' | 'open') => {
        try {
            const submissionRef = doc(db, 'contactSubmissions', submissionId);
            await updateDoc(submissionRef, { status: newStatus });
            
            // Mettre à jour l'état local
            setSubmissions(submissions.map(submission => 
                submission.id === submissionId 
                    ? { ...submission, status: newStatus } 
                    : submission
            ));
        } catch (error) {
            console.error('Erreur lors du changement de statut de la soumission:', error);
        }
    }

    return {
        submissions,
        loading,
        searching,
        confirmDelete,
        openStatusMenu,
        formatDate,
        deleteSubmission,
        changeSubmissionStatus,
        searchContactsByName,
        searchContactsByEmail,
        fetchAllSubmissions,
        setConfirmDelete,
        setOpenStatusMenu
    }
}
