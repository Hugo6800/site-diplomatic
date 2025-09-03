'use client'

import ArticleContent from '../content/ArticleContent';
import { Suspense } from 'react';

export default function ArticlePage() {
    return (
        <Suspense fallback={<p>Chargement de l’article...</p>}>
          <ArticleContent />
        </Suspense>
      );
}