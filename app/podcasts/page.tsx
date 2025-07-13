import LastPodcastSection from "../components/Sections/LastPodcastsection";
import AllPodcastsSection from "../components/Sections/AllPodcastsSection";
import Advertising from "../components/Advertising";

export default function Podcasts() {
    return (
        <main className="px-6 md:px-24 xl:px-64 mt-32">
            <LastPodcastSection />
            <Advertising />
            <AllPodcastsSection />
        </main>
    )
}