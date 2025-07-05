'use client'

import HeaderUserAccount from "@/app/components/HeaderUserAccount";
import AccountSettings from "@/app/components/AccountSettings";
import { useSearchParams } from 'next/navigation';
import StatisticsSection from '@/app/components/Sections/StatisticsSection';
import HistoryReadSection from '@/app/components/Sections/HistoryReadSection';
import EditProfil from '@/app/components/EditProfil';

export default function Profil() {
    const searchParams = useSearchParams();
    const showSettings = searchParams.get('settings') === 'true';
    const showEditProfil = searchParams.get('editprofil') === 'true';


    return (
        <main className="px-6 md:px-24 xl:px-36 mt-28 lg:mt-48 mb-20">
            {showSettings ? <AccountSettings /> : showEditProfil ? <EditProfil /> : <HeaderUserAccount />}
            {!showSettings && !showEditProfil && (
                <>
                    <StatisticsSection />
                    <HistoryReadSection />
                </>
            )}
        </main>
    )
}