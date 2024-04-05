import { useLoaderData } from "react-router-dom";
import Catalog from "../components/home/Catalog";
import Header from "../components/common/Header";
import { VocabularySet } from "../types/api";
import Footer from "../components/common/Footer";

function Home() {
    const { vocabularySets } = useLoaderData() as { vocabularySets: VocabularySet[] };

    return (
        <>
            <Header />
            <div className="flex flex-col justify-between min-h-screen">
                <div className="flex-grow bg-gradient-to-r from-cyan-400 to-blue-400">
                    <Catalog vocabularySets={vocabularySets} />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Home