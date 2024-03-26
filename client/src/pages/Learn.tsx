import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { TOPICS_PAGE_SIZE } from "../utils/constants";
import Pagination from "../components/common/Pagination";

function Learn() {
    const navigate = useNavigate();

    function handlePageChange(pageNumber: number) {
        navigate(`page/${pageNumber}/topics/${pageNumber * TOPICS_PAGE_SIZE - TOPICS_PAGE_SIZE + 1}`)
    }
    
    return (
        <div className="bg-slate-50">
            <Header />
            <div className="grid grid-rows-7">
                <div className="row-span-6"> <Outlet /> </div>
                <div className="row-span-1 grid grid-cols-3 pt-4">
                    <div className="col-span-1 grid justify-items-center">
                        <Pagination totalPage={9} onCallback={handlePageChange}></Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Learn;