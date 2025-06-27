import SpotlightSection from '@/app/components/Sections/SpotlightSection'
import LastArticlesSection from '@/app/components/Sections/LastArticlesSection'
import CollectionsSection from '@/app/components/Sections/CollectionsSection'

export default function Home() {
  return (
    <main className="px-7 md:px-24 xl:px-36">
      <SpotlightSection />  
      <LastArticlesSection />
      <CollectionsSection />
    </main>
  );
}
