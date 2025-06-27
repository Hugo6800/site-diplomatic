import LastPodcastSection from "../components/Sections/LastPodcastsection";
import AllPodcastsSection from "../components/Sections/AllPodcastsSection";

export default function Podcasts() {
    return (
        <main className="px-6 md:px-24 xl:px-36 mt-32">
            <LastPodcastSection />
            <AllPodcastsSection />
        </main>
    )
}