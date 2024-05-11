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
                <div className="flex-grow bg-gradient-to-r from-slate-100/40 to-gray-100 dark:from-slate-600 dark:to-gray-700">
                    <Catalog vocabularySets={vocabularySets} />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Home