'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, Timestamp, orderBy, query } from 'firebase/firestore'
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
                
                setArticles(articlesData)
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

    return {
        articles,
        loading,
        confirmDelete,
        formatDate,
        deleteArticle,
        setConfirmDelete
    }
}
