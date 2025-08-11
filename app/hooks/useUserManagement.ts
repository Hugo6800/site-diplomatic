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
        // Format manuel avec des points au lieu des slashs
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString().slice(-2)
        return `${day}.${month}.${year}`
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
                
                // Trier les utilisateurs par date de création (du plus récent au plus ancien)
                const sortedUsers = usersList.sort((a, b) => {
                    // Vérifier si createdAt existe
                    if (!a.createdAt && !b.createdAt) return 0;
                    if (!a.createdAt) return 1; // b est plus récent
                    if (!b.createdAt) return -1; // a est plus récent
                    
                    // Convertir en Date si nécessaire
                    let dateA: Date;
                    let dateB: Date;
                    
                    try {
                        dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
                        dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
                        
                        // Vérifier si les dates sont valides
                        if (isNaN(dateA.getTime())) return 1; // b est plus récent
                        if (isNaN(dateB.getTime())) return -1; // a est plus récent
                        
                        return dateB.getTime() - dateA.getTime();
                    } catch (error) {
                        console.log('Erreur lors du tri des dates:', error);
                        return 0; // Garder l'ordre original en cas d'erreur
                    }
                })
                
                setUsers(sortedUsers)
                setLoading(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error)
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    // Changer le rôle d'un utilisateur
    const changeUserRole = async (userId: string, newRole: string, currentUserId?: string) => {
        try {
            const userRef = doc(db, 'users', userId)
            await updateDoc(userRef, { role: newRole })
            
            // Mettre à jour l'état local
            setUsers(users.map(user => 
                user.id === userId ? { ...user, role: newRole } : user
            ))
            
            setOpenRoleMenu(null)
            
            // Vérifier si l'utilisateur modifie son propre rôle
            const isCurrentUser = currentUserId && userId === currentUserId ? true : false
            
            // Renvoyer si c'est l'utilisateur actuel qui a changé son rôle
            return { success: true, isCurrentUser }
        } catch (error) {
            console.error('Erreur lors de la modification du rôle:', error)
            return { success: false, isCurrentUser: false }
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
