'use client'

import { useState, useEffect } from 'react'
import { db } from '@/app/lib/firebase'
import { collection, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { deleteUserAccount } from '@/app/hooks/account'
import { UserData } from '@/app/types/user'

export interface UserWithId extends UserData {
    id: string;
}

export const useUserManagement = () => {
    const [users, setUsers] = useState<UserWithId[]>([])
    const [loading, setLoading] = useState(true)
    const [openRoleMenu, setOpenRoleMenu] = useState<string | null>(null)
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

    const roles = ['reader', 'journalist', 'admin']
    
    // Fonction pour formater la date
    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return ''
        const date = timestamp.toDate()
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format(date)
    }

    // Récupérer tous les utilisateurs
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users')
                const usersSnapshot = await getDocs(usersCollection)
                const usersList = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data() as UserData
                }))
                setUsers(usersList)
                setLoading(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error)
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    // Changer le rôle d'un utilisateur
    const changeUserRole = async (userId: string, newRole: string) => {
        try {
            const userRef = doc(db, 'users', userId)
            await updateDoc(userRef, { role: newRole })
            
            // Mettre à jour l'état local
            setUsers(users.map(user => 
                user.id === userId ? { ...user, role: newRole } : user
            ))
            
            setOpenRoleMenu(null)
        } catch (error) {
            console.error('Erreur lors de la modification du rôle:', error)
        }
    }

    // Supprimer un utilisateur
    const deleteUser = async (userId: string) => {
        try {
            // Utiliser la fonction deleteUserAccount du hook account.ts
            // qui gère la suppression dans Firestore et Firebase Authentication
            const result = await deleteUserAccount(userId);
            
            if (result.success) {
                // Mettre à jour l'état local si la suppression a réussi
                setUsers(users.filter(user => user.id !== userId))
                setConfirmDelete(null)
            } else {
                console.error('Erreur lors de la suppression de l\'utilisateur:', result.error)
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error)
        }
    }

    return {
        users,
        loading,
        roles,
        openRoleMenu,
        confirmDelete,
        formatDate,
        changeUserRole,
        deleteUser,
        setOpenRoleMenu,
        setConfirmDelete
    }
}
