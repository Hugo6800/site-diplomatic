// app/articles/[id]/page.tsx
import { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ArticlePageClient from "@/app/components/ArticlePageClient";

// ⚡️ On va chercher l'article côté serveur pour créer le SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const articleRef = doc(db, "articles", params.id);
  const snap = await getDoc(articleRef);

  if (!snap.exists()) {
    return {
      title: "Article non trouvé",
      description: "Cet article n'existe pas ou a été supprimé",
    };
  }

  const article = snap.data();

  return {
    title: article.title,
    description: article.keywords?.join(", ") || article.content.slice(0, 150),
    keywords: article.keywords || [],
    openGraph: {
      title: article.title,
      description: article.content.slice(0, 150),
      images: article.imageUrl ? [article.imageUrl] : [],
    },
  };
}

export default function Page() {
  return <ArticlePageClient />;
}

