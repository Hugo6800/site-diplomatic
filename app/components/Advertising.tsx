'use client';

import { usePaywall } from '@/app/hooks/usePaywall';

export default function Advertising({ className }: { className?: string }) {
    const { shouldShowAds } = usePaywall();
    
    // Don't render the ad component if user has paywall access
    if (!shouldShowAds) {
        return null;
    }
    
    return (
        <div className={`border-2 border-dashed border-[#F3DEDE] bg-slate-400 dark:border-white rounded-2xl p-4 ${className}`}>
            <h2 className="font-bold font-neulisalt italic text-[2rem] mb-4 dark:text-white">Publicité</h2>
        </div>
    );
}