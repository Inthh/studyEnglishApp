import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { TOPICS_PAGE_SIZE } from "../utils/constants";
import Pagination from "../components/common/Pagination";
import Footer from "../components/common/Footer";

function Learn() {
    const { totalTopics } = useLoaderData() as { totalTopics: number };
    const navigate = useNavigate();

    function handlePageChange(pageNumber: number) {
        navigate(`page/${pageNumber}/topics/${pageNumber * TOPICS_PAGE_SIZE - TOPICS_PAGE_SIZE + 1}`)
    }

    return (
        <>
            <Header />
            <div className="bg-gradient-to-r from-cyan-400 to-blue-400">
                <div className="grid grid-rows-[1fr_84px]">
                    <Outlet />
                    <div className="grid lg:grid-cols-3 sm:grid-cols-1 grid-cols-1">
                        <div className="lg:col-span-1 grid justify-items-center">
                            <Pagination totalPage={Math.ceil(totalTopics/TOPICS_PAGE_SIZE)} onCallback={handlePageChange}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Learn;