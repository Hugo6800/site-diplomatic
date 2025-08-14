'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'

interface ArticleAuthorProtectionProps {
  children: React.ReactNode
  articleId: string | null
}

export default function ArticleAuthorProtection({ children, articleId }: ArticleAuthorProtectionProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [checkingArticle, setCheckingArticle] = useState(true)

  useEffect(() => {
    async function checkAuthorization() {
      // Si pas d'utilisateur connecté, rediriger
      if (!user) {
        router.push('/')
        return
      }

      // Si pas d'ID d'article, rediriger
      if (!articleId) {
        router.push('/')
        return
      }

      try {
        // Récupérer l'article
        const articleRef = doc(db, 'articles', articleId)
        const articleSnap = await getDoc(articleRef)
        
        if (!articleSnap.exists()) {
          // L'article n'existe pas
          router.push('/')
          return
        }

        const articleData = articleSnap.data()
        
        // Vérifier si l'utilisateur est l'auteur ou un admin
        if (user.role === 'admin' || articleData.authorId === user.uid) {
          setIsAuthorized(true)
        } else {
          // L'utilisateur n'est pas autorisé
          router.push('/')
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'autorisation:", error)
        router.push('/')
      } finally {
        setCheckingArticle(false)
      }
    }

    if (!loading) {
      checkAuthorization()
    }
  }, [user, loading, articleId, router])

  if (loading || checkingArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
