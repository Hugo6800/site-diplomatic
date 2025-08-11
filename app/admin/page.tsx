'use client'

import RoleProtection from '@/app/components/RoleProtection'
import UserManagement from '@/app/components/Sections/UserManagementSection'

export default function Admin() {
    return (
        <RoleProtection allowedRoles={['admin']}>
            <main className="px-6 md:px-24 xl:px-64 mt-28 lg:mt-48 mb-20">
                <h2 className="font-bold font-fractul text-4xl lg:text-5xl mb-10">Administration du site</h2>
                <UserManagement />
            </main>
        </RoleProtection>
    )
}