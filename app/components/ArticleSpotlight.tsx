'use client'

import Image from "next/image";
import TagNavigationArticles from "./TagNavigationArticles";
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from './Auth/LoginForm';
import SignUpForm from './Auth/SignUpForm';

export interface ArticleProps {
    id: string;
    colorCircle: string;
    name: string;
    className: string;
    author: string;
    title: string;
    date: string;
    imageUrl: string;
}

export default function Article({ id, colorCircle, name, className, author, title, date, imageUrl }: ArticleProps) {
    const { user } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState<'buttons' | 'login' | 'signup'>('buttons');

    const handleArticleClick = () => {
        if (!user) {
            setShowAuthModal(true);
        } else {
            window.location.href = `/article?id=${id}`;
        }
    };

    return (
        <>
            <article className="flex flex-col md:flex-row gap-4 cursor-pointer" onClick={handleArticleClick}>
                <div className="flex flex-col md:w-1/2">
                    <TagNavigationArticles
                        colorCircle={colorCircle}
                        name={name}
                        className={className}
                        variant="article"
                    />
                    <p className="mt-2 font-semibold text-[1rem] font-neulisalt">{author} - {date}</p>
                    <h3 className="font-bold font-fractul text-5xl line-clamp-3 tracking-[0.03em] leading-[110%] hover:text-primary transition-colors">{title}</h3>
                </div>
                <div className="relative w-full md:w-1/2 aspect-[16/9]">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            </article>

            {showAuthModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                        <h2 className="text-2xl font-fractul font-bold mb-4 text-center">Soutenez The Diplomatic Post</h2>
                        <p className="text-center mb-6 font-neulisalt">Cet article est réservé aux membres. Connectez-vous ou créez un compte gratuit !</p>

                        {authMode === 'buttons' ? (
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => setAuthMode('login')}
                                    className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors text-center"
                                >
                                    Se connecter
                                </button>
                                <button
                                    onClick={() => setAuthMode('signup')}
                                    className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors text-center"
                                >
                                    Créer un compte
                                </button>
                            </div>
                        ) : authMode === 'login' ? (
                            <>
                                <LoginForm
                                    onSwitchToSignUp={() => setAuthMode('signup')}
                                    onForgotPassword={() => { }}
                                    redirectUrl={`/article?id=${id}`}
                                />
                            </>
                        ) : (
                            <>
                                <SignUpForm
                                    onSwitchToLogin={() => setAuthMode('login')}
                                    redirectUrl={`/article?id=${id}`}
                                />
                            </>
                        )}

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAuthModal(false);
                            }}
                            className="mt-4 w-full text-gray-500 hover:text-gray-700"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}