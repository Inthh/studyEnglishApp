import Header from "../components/Header";
import Topics from "../components/learn/Topics";
import Vocabulary from "../components/learn/Vocabulary";

function Learn() {
    return (
        <div className="bg-slate-50">
            <Header />
            <div className="grid grid-cols-3 justify-items-center">
                <Topics />
                <Vocabulary/>
            </div>
        </div>
    );
}

export default Learn;