import Catalog from "../components/Catalog";
import Header from "../components/Header";

function Home() {
    return (
        <div className="bg-slate-50">
            <Header />
            <Catalog />
        </div>
    );
}

export default Home