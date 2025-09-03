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
import MyDraftsPanel from '@/app/components/Sections/MyDraftsPanel';
import Image from 'next/image';

export default function ProfilContent() {
    const searchParams = useSearchParams();
    const showSettings = searchParams.get('settings') === 'true';
    const showEditProfil = searchParams.get('editprofil') === 'true';
    const { user } = useAuth();
    const [showMyArticles, setShowMyArticles] = useState(false);
    const [showMyDrafts, setShowMyDrafts] = useState(false);

    return (
        <main className={`px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 ${showEditProfil ? 'h-[calc(100vh-178px-7rem)] flex flex-col' : 'mb-20'}`}>
            <div className="flex-grow">
                {showSettings ? <AccountSettings /> : showEditProfil ? <EditProfil /> : <HeaderUserAccount />}
                {!showSettings && !showEditProfil && (
                    <>
                        {showMyArticles ? (
                            <>
                                <button
                                    onClick={() => {
                                        setShowMyArticles(false);
                                        setShowMyDrafts(false);
                                    }}
                                    className="flex justify-center items-center gap-2 mt-6 w-1/4 px-2 py-4 bg-[#F3DEDE] dark:bg-[#433D3D] dark:text-[#EECECE] rounded-full font-semibold font-neulisalt cursor-pointer"
                                >
                                    <Image
                                        src="/icons/arrow-left.svg"
                                        alt="Retour"
                                        width={24}
                                        height={24}
                                        className="dark:hidden"
                                    />
                                    <Image
                                        src="/icons/dark_collection/arrow-left.svg"
                                        alt="Retour"
                                        width={24}
                                        height={24}
                                        className="hidden dark:block"
                                    />
                                    Retour au compte
                                </button>
                                <MyArticlesPanel />
                            </>
                        ) : showMyDrafts ? (
                            <>
                                <button
                                    onClick={() => {
                                        setShowMyArticles(false);
                                        setShowMyDrafts(false);
                                    }}
                                    className="flex justify-center items-center gap-2 mt-6 w-1/4 px-2 py-4 bg-[#F3DEDE] dark:bg-[#433D3D] dark:text-[#EECECE] rounded-full font-semibold font-neulisalt cursor-pointer"
                                >
                                    <Image
                                        src="/icons/arrow-left.svg"
                                        alt="Retour"
                                        width={24}
                                        height={24}
                                        className="dark:hidden"
                                    />
                                    <Image
                                        src="/icons/dark_collection/arrow-left.svg"
                                        alt="Retour"
                                        width={24}
                                        height={24}
                                        className="hidden dark:block"
                                    />
                                    Retour au compte
                                </button>
                                <MyDraftsPanel />
                            </>
                        ) : (
                            <>
                                {(user?.role === 'journalist' || user?.role === 'admin') && (
                                    <EditorPanel 
                                        onShowMyArticles={() => setShowMyArticles(true)}
                                        onShowMyDrafts={() => setShowMyDrafts(true)}
                                    />
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