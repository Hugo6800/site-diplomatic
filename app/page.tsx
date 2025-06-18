import SpotlightSection from '@/app/components/Sections/SpotlightSection'
import LastArticlesSection from '@/app/components/Sections/LastArticlesSection'

export default function Home() {
  return (
    <main className="px-6 md:px-24 xl:px-36">
      <SpotlightSection />  
      <LastArticlesSection />
    </main>
  );
}
