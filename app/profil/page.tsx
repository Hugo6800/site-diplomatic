'use client'

import { Suspense } from 'react';
import ProfilContent from '../content/ProfilContent';

export default function ProfilPage() {
    return (
        <Suspense fallback={<p>Chargement de l’article...</p>}>
            <ProfilContent />
        </Suspense>
    );
}