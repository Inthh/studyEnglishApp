import { useLoaderData } from "react-router-dom";
import Catalog from "../components/Catalog";
import Header from "../components/Header";
import { VocabularySet } from "../types/api";

function Home() {
    const { vocabularySets } = useLoaderData() as { vocabularySets: VocabularySet[] };

    return (
        <div className="bg-slate-50">
            <Header />
            <Catalog vocabularySets={vocabularySets} />
        </div>
    );
}

export default Home