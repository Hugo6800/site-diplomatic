'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArticleFull from '../components/ArticleFull';
import { formatDate } from '../utils/formatDate';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FirestoreArticle } from '../types/firestore-article';
import { Article } from '../types/article';
import { useAuth } from '../hooks/useAuth';
import { usePaywall } from '../hooks/usePaywall';
import PaywallModal from '../components/PaywallModal';
import LoginForm from '../components/Auth/LoginForm';
import SignUpForm from '../components/Auth/SignUpForm';
import ForgotPasswordForm from '../components/Auth/ForgotPasswordForm';

export default function ArticlePage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const showAuth = searchParams.get('auth') === 'true';
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authMode, setAuthMode] = useState<'buttons' | 'login' | 'signup' | 'forgot'>('buttons');
    const { user } = useAuth();
    const { canAccessArticle } = usePaywall();
    
    // Détermine si l'utilisateur peut accéder à l'article complet
    const hasAccess = article ? canAccessArticle(article.paywall || false) : true;
    
    const handleForgotPassword = () => {
        setAuthMode('forgot');
    };

    useEffect(() => {
        async function fetchArticle() {
            setIsLoading(true);
            if (id) {                
                const articleRef = doc(db, 'articles', id);
                const articleSnap = await getDoc(articleRef);
                
                if (articleSnap.exists()) {
                    const articleData = articleSnap.data() as FirestoreArticle;
                    setArticle({
                        id: articleSnap.id,
                        title: articleData.title,
                        authorName: articleData.authorName,
                        category: articleData.category,
                        content: articleData.content,
                        imageUrl: articleData.imageUrl,
                        createdAt: formatDate(new Date(articleData.createdAt.seconds * 1000)),
                        paywall: articleData.paywall || false
                    });
                }
            }
            setIsLoading(false);
        }

        fetchArticle();
    }, [id]);

    if (isLoading) {
        return (
            <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 w-32 bg-gray-200 mb-4 rounded"></div>
                        <div className="h-12 w-3/4 bg-gray-200 mb-8 rounded"></div>
                        <div className="h-96 w-full bg-gray-200 rounded"></div>
                    </div>
                </div>
            </main>
        );
    }

    if (!article) {
        return (
            <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
                    <p>{`L'article que vous recherchez n'existe pas ou a été supprimé.`}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-28 mb-28 relative">
            <section className={`${(showAuth || (article?.paywall && !hasAccess)) ? 'mt-11 pt-12 max-h-[100vh] overflow-hidden relative' : ''}`}>
                <ArticleFull
                    id={article.id}
                    category={article.category}
                    title={article.title}
                    authorName={article.authorName}
                    date={article.createdAt}
                    imageUrl={article.imageUrl}
                    content={article.content}
                    paywall={article.paywall}
                />
                {(showAuth || (article?.paywall && !hasAccess)) && (
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
                )}
            </section>

            {/* Afficher la modale de paiement si l'utilisateur est connecté mais n'a pas d'accès premium */}
            {article?.paywall && !hasAccess && user && (
                <>
                    <div className="absolute inset-0 bg-black/20 z-40" aria-hidden="true" />
                    <div className="absolute left-0 right-0 z-50 mx-4 md:mx-12 lg:mx-64 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] bottom-8">
                        <PaywallModal />
                    </div>
                </>
            )}

            {/* Afficher la modale d'authentification si l'utilisateur n'est pas connecté et que l'article est premium */}
            {article?.paywall && !user && (
                <>
                    <div className="absolute inset-0 bg-black/20 z-40" aria-hidden="true" onClick={() => setAuthMode('buttons')} />
                    <div className="absolute left-0 right-0 z-50 mx-4 md:mx-12 lg:mx-64 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] bottom-8">
                        <div className="container mx-auto max-w-md px-4 py-8">
                            <div className="max-h-[80vh] md:max-h-none overflow-y-auto">
                                <h2 className="text-2xl font-fractul font-bold mb-4 text-center">Soutenez The Diplomatic Post</h2>
                                <p className="text-center mb-6 font-neulisalt">
                                    Cet article est réservé aux membres. Connectez-vous ou créez un compte gratuit !
                                </p>

                                {authMode === 'buttons' ? (
                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={() => setAuthMode('login')}
                                            className="bg-[#DE595C] font-bold tracking-wider cursor-pointer px-6 py-3 rounded-lg hover:bg-[#DE595C]/80 transition-colors text-center"
                                        >
                                            Se connecter
                                        </button>
                                        <button
                                            onClick={() => setAuthMode('signup')}
                                            className="bg-[#F3DEDE] font-bold tracking-wider cursor-pointer px-6 py-3 rounded-lg hover:bg-[#DE595C]/80 transition-colors text-center"
                                        >
                                            Créer un compte
                                        </button>
                                    </div>
                                ) : authMode === 'login' ? (
                                    <LoginForm
                                        onSwitchToSignUp={() => setAuthMode('signup')}
                                        onForgotPassword={handleForgotPassword}
                                        redirectUrl={`/article?id=${article.id}`}
                                    />
                                ) : authMode === 'signup' ? (
                                    <SignUpForm
                                        onSwitchToLogin={() => setAuthMode('login')}
                                    />
                                ) : (
                                    <ForgotPasswordForm
                                        onSwitchToLogin={() => setAuthMode('login')}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}