'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, Timestamp, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'

export interface Article {
    id: string
    title: string
    createdAt: Timestamp
    category: string
    authorEmail: string
    status: 'published' | 'waiting'
}

export function useArticleManagement() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
    const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null)

    // Récupérer tous les articles
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true)
                const articlesRef = collection(db, 'articles')
                // Trier les articles par date de création (du plus récent au plus ancien)
                const q = query(articlesRef, orderBy('createdAt', 'desc'))
                const snapshot = await getDocs(q)
                
                const articlesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt || Timestamp.now()
                })) as Article[]
                
                // Trier les articles pour mettre ceux avec le statut "waiting" en premier
                const sortedArticles = [...articlesData].sort((a, b) => {
                    // Si a est "waiting" et b ne l'est pas, a vient en premier
                    if (a.status === 'waiting' && b.status !== 'waiting') return -1;
                    // Si b est "waiting" et a ne l'est pas, b vient en premier
                    if (b.status === 'waiting' && a.status !== 'waiting') return 1;
                    // Sinon, trier par date de création (du plus récent au plus ancien)
                    return b.createdAt.seconds - a.createdAt.seconds;
                });
                
                setArticles(sortedArticles)
            } catch (error) {
                console.error('Erreur lors de la récupération des articles:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
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

    // Supprimer un article
    const deleteArticle = async (articleId: string) => {
        try {
            await deleteDoc(doc(db, 'articles', articleId))
            setArticles(articles.filter(article => article.id !== articleId))
            setConfirmDelete(null)
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'article:', error)
        }
    }

    // Changer le statut d'un article
    const changeArticleStatus = async (articleId: string, newStatus: 'published' | 'waiting') => {
        try {
            // Récupérer d'abord l'article pour vérifier sa structure
            const articleRef = doc(db, 'articles', articleId);
            
            // Créer un objet de mise à jour avec le nouveau statut
            const updateData = { status: newStatus };
            
            // Mettre à jour dans Firestore avec merge: true pour éviter les problèmes de structure
            await updateDoc(articleRef, updateData);
            
            // Mettre à jour l'état local
            setArticles(articles.map(article => 
                article.id === articleId 
                    ? { ...article, status: newStatus } 
                    : article
            ));
        } catch (error) {
            console.error('Erreur lors du changement de statut de l\'article:', error);
            // Afficher plus de détails sur l'erreur pour le débogage
            console.error('Détails de l\'erreur:', JSON.stringify(error));
        }
    }

    return {
        articles,
        loading,
        confirmDelete,
        openStatusMenu,
        formatDate,
        deleteArticle,
        changeArticleStatus,
        setConfirmDelete,
        setOpenStatusMenu
    }
}
