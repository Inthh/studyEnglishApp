import { useLoaderData } from "react-router-dom";
import Catalog from "../components/home/Catalog";
import Header from "../components/common/Header";
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