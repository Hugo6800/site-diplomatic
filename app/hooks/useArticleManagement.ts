'use client'

import { useState, useEffect, useCallback } from 'react'
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
    const [searching, setSearching] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
    const [openStatusMenu, setOpenStatusMenu] = useState<string | null>(null)

    // Fonction pour trier les articles par statut et date
    const sortArticlesByStatusAndDate = (articlesData: Article[]) => {
        return [...articlesData].sort((a, b) => {
            // Si a est "waiting" et b ne l'est pas, a vient en premier
            if (a.status === 'waiting' && b.status !== 'waiting') return -1;
            // Si b est "waiting" et a ne l'est pas, b vient en premier
            if (b.status === 'waiting' && a.status !== 'waiting') return 1;
            // Sinon, trier par date de création (du plus récent au plus ancien)
            return b.createdAt.seconds - a.createdAt.seconds;
        });
    };
    
    // Récupérer tous les articles
    const fetchAllArticles = useCallback(async () => {
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
            const sortedArticles = sortArticlesByStatusAndDate(articlesData);
            
            setArticles(sortedArticles)
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error)
        } finally {
            setLoading(false)
        }
    }, []);
    
    // Fonction pour rechercher des articles par titre
    const searchArticlesByTitle = useCallback(async (titlePrefix: string) => {
        if (!titlePrefix || titlePrefix.length < 3) {
            // Si la recherche est vide ou trop courte, charger tous les articles
            fetchAllArticles();
            return;
        }
        
        setSearching(true);
        try {
            const articlesRef = collection(db, 'articles');
            
            // Récupérer tous les articles et filtrer côté client
            // Cette approche est nécessaire car Firestore ne supporte pas nativement
            // la recherche insensible à la casse ou la recherche partielle dans les chaînes
            const q = query(articlesRef, orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            
            const searchTermLower = titlePrefix.toLowerCase();
            
            // Filtrer les articles dont le titre contient le terme de recherche (insensible à la casse)
            const articlesData = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt || Timestamp.now()
                }) as Article)
                .filter(article => {
                    const titleLower = article.title.toLowerCase();
                    return titleLower.includes(searchTermLower);
                });
            
            // Trier les articles pour mettre ceux avec le statut "waiting" en premier
            const sortedArticles = sortArticlesByStatusAndDate(articlesData);
            
            setArticles(sortedArticles);
        } catch (error) {
            console.error('Erreur lors de la recherche des articles:', error);
        } finally {
            setSearching(false);
        }
    }, [fetchAllArticles]);

    // Charger les articles au démarrage
    useEffect(() => {
        fetchAllArticles();
    }, [fetchAllArticles]);

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
            // Si le statut est 'published', mettre isDraft à false
            // Si le statut est 'waiting', mettre isDraft à true
            const updateData = newStatus === 'published' 
                ? { status: newStatus, isDraft: false } 
                : { status: newStatus, isDraft: true };
            
            // Mettre à jour dans Firestore
            await updateDoc(articleRef, updateData);
            
            // Mettre à jour l'état local
            setArticles(articles.map(article => 
                article.id === articleId 
                    ? { ...article, status: newStatus } 
                    : article
            ));

            return { success: true };
        } catch (error) {
            console.error('Erreur lors du changement de statut:', error);
            return { success: false, error };
        }
    }

    return {
        articles,
        loading,
        searching,
        confirmDelete,
        openStatusMenu,
        formatDate,
        deleteArticle,
        changeArticleStatus,
        searchArticlesByTitle,
        fetchAllArticles,
        setConfirmDelete,
        setOpenStatusMenu
    }
}
