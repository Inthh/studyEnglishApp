import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Topics from "../components/learn/Topics";
import { Topic } from "../types/api";
import Pagination from "../components/common/Pagination";
import { useState } from "react";
import { TOPICS_PAGE_SIZE } from "../utils/constants";

function Learn() {
    const { topics, totalTopics } = useLoaderData() as { topics: Topic[], totalTopics: number };
    const [totalPage, setTotalPage] = useState(Math.ceil(totalTopics/TOPICS_PAGE_SIZE));
    const [pageNumber, setPageNumber] = useState<number>(Math.floor(topics[0].id/TOPICS_PAGE_SIZE) + 1);
    const navigate = useNavigate();

    console.log("topics in Learn page", topics)

    function handlePageChange(pageNumber: number) {
        setTotalPage(Math.ceil(totalTopics/TOPICS_PAGE_SIZE))
        setPageNumber(pageNumber);
        navigate(`topics/${pageNumber * TOPICS_PAGE_SIZE - TOPICS_PAGE_SIZE + 1}`)
    }

    return (
        <div className="bg-slate-50">
            <Header />
            <div className="grid grid-cols-3 justify-items-center">
                <div className="col-span-1 w-[80%] grid grid-rows-6">
                    <div className="row-span-5">
                        <Topics topics={topics} />
                    </div>
                    <div className="row-span-1 grid justify-items-center items-center">
                        <Pagination totalPage={totalPage} onCallback={handlePageChange} currentPage={pageNumber}></Pagination>
                    </div>
                </div>
                <div className="col-span-2 w-[90%]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Learn;