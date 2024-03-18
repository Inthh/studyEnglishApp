import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Topics from "../components/learn/Topics";
import { Topic } from "../types/api";

function Learn() {
    const { topics } = useLoaderData() as { topics: Topic[] };
    return (
        <div className="bg-slate-50">
            <Header />
            <div className="grid grid-cols-3 justify-items-center">
                <Topics topics={topics} />
                <Outlet />
            </div>
        </div>
    );
}

export default Learn;