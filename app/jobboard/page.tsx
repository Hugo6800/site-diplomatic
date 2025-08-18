'use client'

import LastJobSection from '@/app/components/Sections/LastJobSection'
import AllJobsSection from '@/app/components/Sections/AllJobsSection'

export default function JobBoard() {
    return (
        <main className="px-6 md:px-24 xl:px-64 mt-32">
            <LastJobSection />
            <AllJobsSection />
        </main>
    )
}