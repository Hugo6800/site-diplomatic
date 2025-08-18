'use client'

import { useState, useEffect, useCallback } from 'react'
import { db } from '@/app/lib/firebase'
import { collection, getDocs, doc, updateDoc, Timestamp, query, where, orderBy, limit } from 'firebase/firestore'
import { deleteUserAccount } from '@/app/hooks/account'
import { UserData } from '@/app/types/user'

export interface UserWithId extends UserData {
    id: string;
}

export const useUserManagement = () => {
    const [users, setUsers] = useState<UserWithId[]>([])
    const [loading, setLoading] = useState(true)
    const [searching, setSearching] = useState(false)
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

    // Fonction pour rechercher des utilisateurs par email
    const searchUsersByEmail = async (emailPrefix: string) => {
        if (!emailPrefix || emailPrefix.length < 3) {
            // Si la recherche est vide ou trop courte, charger tous les utilisateurs
            fetchAllUsers();
            return;
        }
        
        setSearching(true);
        try {
            // Créer une requête qui recherche les emails commençant par le préfixe
            const usersCollection = collection(db, 'users');
            const endPrefixChar = emailPrefix.slice(0, -1) + String.fromCharCode(emailPrefix.charCodeAt(emailPrefix.length - 1) + 1);
            
            const q = query(
                usersCollection,
                where('email', '>=', emailPrefix),
                where('email', '<', endPrefixChar),
                orderBy('email'),
                limit(20)
            );
            
            const usersSnapshot = await getDocs(q);
            const usersList = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as UserData
            }));
            
            // Trier les utilisateurs par date de création (du plus récent au plus ancien)
            const sortedUsers = sortUsersByDate(usersList);
            
            setUsers(sortedUsers);
        } catch (error) {
            console.error('Erreur lors de la recherche des utilisateurs:', error);
        } finally {
            setSearching(false);
        }
    };
    
    // Fonction pour trier les utilisateurs par date
    const sortUsersByDate = (usersList: UserWithId[]) => {
        return usersList.sort((a, b) => {
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
        });
    };
    
    // Récupérer tous les utilisateurs
    const fetchAllUsers = useCallback(async () => {
        setLoading(true);
        try {
            const usersCollection = collection(db, 'users')
            const usersSnapshot = await getDocs(usersCollection)
            const usersList = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as UserData
            }))
                
                // Trier les utilisateurs par date de création
                const sortedUsers = sortUsersByDate(usersList)
                
                setUsers(sortedUsers)
                setLoading(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error)
                setLoading(false)
            }
        }, []);
        
    // Charger les utilisateurs au démarrage
    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

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
        searching,
        roles,
        openRoleMenu,
        confirmDelete,
        formatDate,
        changeUserRole,
        deleteUser,
        searchUsersByEmail,
        fetchAllUsers,
        setOpenRoleMenu,
        setConfirmDelete
    }
}
