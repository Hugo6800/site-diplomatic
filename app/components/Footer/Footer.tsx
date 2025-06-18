import Infos from "./Infos";
import Links from "./Links";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center gap-4 py-4 px-6 md:px-24 xl:px-36">
            <Infos />
            <Links />
        </footer>
    )
}