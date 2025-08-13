'use client'

import { useState, useEffect } from 'react'
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
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
    const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null)

    // Récupérer toutes les soumissions de contact
    useEffect(() => {
        const fetchSubmissions = async () => {
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
                
                setSubmissions(submissionsData)
            } catch (error) {
                console.error('Erreur lors de la récupération des soumissions de contact:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchSubmissions()
    }, [])

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
        confirmDelete,
        openStatusMenu,
        formatDate,
        deleteSubmission,
        changeSubmissionStatus,
        setConfirmDelete,
        setOpenStatusMenu
    }
}
