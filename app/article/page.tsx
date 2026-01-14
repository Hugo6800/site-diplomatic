'use client'

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-48B8PFD2C7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-48B8PFD2C7');
</script>
    
import ArticleContent from '../content/ArticleContent';
import { Suspense } from 'react';

export default function ArticlePage() {
    return (
        <Suspense fallback={<p>Chargement de l’article...</p>}>
          <ArticleContent />
        </Suspense>
      );
}
