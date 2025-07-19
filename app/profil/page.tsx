'use client'

import HeaderUserAccount from "@/app/components/HeaderUserAccount";
import AccountSettings from "@/app/components/AccountSettings";
import { useSearchParams } from 'next/navigation';
import StatisticsSection from '@/app/components/Sections/StatisticsSection';
import HistoryReadSection from '@/app/components/Sections/HistoryReadSection';
import EditProfil from '@/app/components/EditProfil';
import ArticlesWriting from '@/app/components/Sections/ArticlesWriting';
import { useAuth } from '@/app/hooks/useAuth';

export default function Profil() {
    const searchParams = useSearchParams();
    const showSettings = searchParams.get('settings') === 'true';
    const showEditProfil = searchParams.get('editprofil') === 'true';
    const { user } = useAuth();


    return (
        <main className={`px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 ${showEditProfil ? 'h-[calc(100vh-178px-7rem)] flex flex-col' : 'mb-20'}`}>
            <div className="flex-grow">
                {showSettings ? <AccountSettings /> : showEditProfil ? <EditProfil /> : <HeaderUserAccount />}
                {!showSettings && !showEditProfil && (
                    <>
                        <StatisticsSection />
                        {user?.role === 'journalist' && <ArticlesWriting />}
                        <HistoryReadSection />
                    </>
                )}
            </div>
        </main>
    )
}