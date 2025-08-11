'use client'

import { useState } from 'react';
import HeaderUserAccount from "@/app/components/HeaderUserAccount";
import AccountSettings from "@/app/components/AccountSettings";
import { useSearchParams } from 'next/navigation';
import StatisticsSection from '@/app/components/Sections/StatisticsSection';
import HistoryReadSection from '@/app/components/Sections/HistoryReadSection';
import EditProfil from '@/app/components/EditProfil';
import ArticlesWriting from '@/app/components/Sections/ArticlesWriting';
import { useAuth } from '@/app/hooks/useAuth';
import EditorPanel from '@/app/components/Sections/EditorPanel';
import MyArticlesPanel from '@/app/components/Sections/MyArticlesPanel';
import Image from 'next/image';

export default function Profil() {
    const searchParams = useSearchParams();
    const showSettings = searchParams.get('settings') === 'true';
    const showEditProfil = searchParams.get('editprofil') === 'true';
    const { user } = useAuth();
    const [showMyArticles, setShowMyArticles] = useState(false);

    return (
        <main className={`px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 ${showEditProfil ? 'h-[calc(100vh-178px-7rem)] flex flex-col' : 'mb-20'}`}>
            <div className="flex-grow">
                {showSettings ? <AccountSettings /> : showEditProfil ? <EditProfil /> : <HeaderUserAccount />}
                {!showSettings && !showEditProfil && (
                    <>
                        {showMyArticles ? (
                            <>
                                <button
                                    onClick={() => setShowMyArticles(false)}
                                    className="flex justify-center items-center gap-2 mt-6 w-1/4 px-2 py-4 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer"
                                >
                                    <Image
                                        src="/icons/arrow-left.svg"
                                        alt="Retour"
                                        width={24}
                                        height={24}
                                    />
                                    Retour au compte
                                </button>
                                <MyArticlesPanel />
                            </>
                        ) : (
                            <>
                                {(user?.role === 'journalist' || user?.role === 'admin') && (
                                    <EditorPanel onShowMyArticles={() => setShowMyArticles(true)} />
                                )}
                                <StatisticsSection />
                                {(user?.role === 'journalist' || user?.role === 'admin') && <ArticlesWriting />}
                                <HistoryReadSection />
                            </>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}