'use client'

import { Suspense } from 'react';
import CollectionsContent from '../content/CollectionsContent';

export default function CollectionsPage() {
    return (
        <Suspense fallback={<p>Chargement de l’article...</p>}>
            <CollectionsContent />
        </Suspense>
    );
}