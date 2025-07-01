'use client'

import HeaderUserAccount from "@/app/components/HeaderUserAccount";
import AccountSettings from "@/app/components/AccountSettings";
import { useSearchParams } from 'next/navigation';
import StatisticsSection from '@/app/components/Sections/StatisticsSection';

export default function Profil() {
    const searchParams = useSearchParams();
    const showSettings = searchParams.get('settings') === 'true';

    return (
        <main className="px-6 md:px-24 xl:px-36 mt-28 lg:mt-48 mb-20">
            {showSettings ? <AccountSettings /> : <HeaderUserAccount />}
            <StatisticsSection />
        </main>
    )
}