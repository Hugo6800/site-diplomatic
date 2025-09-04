'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import ArticleFull from '@/app/components/ArticleFull'
import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Timestamp } from 'firebase/firestore'

interface Article {
  id: string
  title: string
  authorName?: string
  authorEmail?: string
  date: string
  content: string
  imageUrl?: string
  category?: string
  status?: string
  createdAt?: Timestamp // Firestore timestamp
}

export default function ArticlePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const articleId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : null
  
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const isPreview = searchParams.get('preview') === 'true'

  useEffect(() => {
    async function fetchArticle() {
      if (!articleId) {
        setError('Article non trouvé')
        setLoading(false)
        return
      }

      try {
        const articleRef = doc(db, 'articles', articleId)
        const articleSnap = await getDoc(articleRef)
        
        if (!articleSnap.exists()) {
          setError('Article non trouvé')
          setLoading(false)
          return
        }
        
        const articleData = articleSnap.data()
        
        // Si ce n'est pas un aperçu et que l'article n'est pas publié, 
        // rediriger vers la page d'accueil sauf si l'utilisateur est l'auteur ou un admin
        if (!isPreview && articleData.status !== 'published') {
          const isAuthor = user?.email === articleData.authorEmail
          const isAdmin = user?.role === 'admin'
          
          if (!isAuthor && !isAdmin) {
            router.push('/')
            return
          }
        }
        
        const formattedDate = articleData.createdAt 
          ? new Date(articleData.createdAt.toDate()).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            }).replace(/\//g, '.')
          : '';
          
        setArticle({
          id: articleId,
          title: articleData.title || '',
          content: articleData.content || '',
          authorName: articleData.authorName,
          authorEmail: articleData.authorEmail,
          date: formattedDate,
          imageUrl: articleData.imageUrl,
          category: articleData.category,
          status: articleData.status
        })
        
        setLoading(false)
      } catch (err) {
        console.error('Erreur lors du chargement de l\'article:', err)
        setError('Erreur lors du chargement de l\'article')
        setLoading(false)
      }
    }
    
    fetchArticle()
  }, [articleId, isPreview, router, user])

  if (loading) {
    return (
      <div className="min-h-screen bg-header flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-header flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Erreur</h1>
        <p>{error || 'Article non trouvé'}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-header">
      <div className="max-w-5xl mx-auto px-4 py-8 mt-20">
        {isPreview && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="flex items-center">
              <span className="font-bold">Mode aperçu</span>
              <span className="ml-2">{`Cet article n'est pas encore publié.`}</span>
            </p>
          </div>
        )}
        <ArticleFull
          id={article.id}
          title={article.title}
          authorName={article.authorName || 'Auteur inconnu'}
          authorEmail={article.authorEmail}
          date={article.date}
          content={article.content}
          imageUrl={article.imageUrl || '/placeholder_view.webp'}
          category={article.category || 'default'}
        />
      </div>
    </main>
  )
}
