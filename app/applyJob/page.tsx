'use client'

import { Suspense } from 'react';
import ApplyJobContent from '../content/ApplyJobContent';

export default function ApplyJobPage() {
    return (
        <Suspense fallback={<p>Chargement de l’article...</p>}>
            <ApplyJobContent />
        </Suspense>
    );
}