'use client'

import RoleProtection from '@/app/components/RoleProtection'
import UserManagement from '@/app/components/Sections/UserManagementSection'
import ArticleManagementSection from '../components/Sections/ArticleManagementSection'
import ContactSubmissionsSection from '../components/Sections/ContactSubmissionsSection'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Admin() {
    const router = useRouter();
    return (
        <RoleProtection allowedRoles={['admin']}>
            <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
                <h2 className="font-bold font-fractul text-4xl lg:text-5xl mb-10">Administration du site</h2>
                <button
                    onClick={() => router.push('/profil')}
                    className="flex justify-center items-center gap-2 lg:w-1/4 px-2 py-4 bg-[#F3DEDE] rounded-full font-semibold font-neulisalt cursor-pointer my-6"
                >
                    <Image
                        src="/icons/arrow-left.svg"
                        alt="Retour"
                        width={24}
                        height={24}
                    />
                    Retour au compte
                </button>
                <UserManagement />
                <ArticleManagementSection />
                <ContactSubmissionsSection />
            </main>
        </RoleProtection>
    )
}