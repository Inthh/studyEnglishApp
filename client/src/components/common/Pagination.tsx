import { useState } from "react";
import { useParams } from "react-router-dom";

const TOTAL_PAGES_SELECTED = 4;

function Pagination({ totalPage, onCallback }: { totalPage: number, onCallback: (value: number) => void }) {
    const { pageNum } = useParams()
    const currentPage = pageNum ? parseInt(pageNum) : 1
    const [activePage, setActivePage] = useState(currentPage);
    const [hideDots, setHideDots] = useState(currentPage === totalPage - 2);
    const [firstPage, setFirstPage] = useState(currentPage > 2 && currentPage < totalPage - 1 ? currentPage - 1 : 1);
    const [secondPage, setSecondPage] = useState(currentPage > 2 && currentPage < totalPage - 1 ? currentPage : 2);

    async function handleActivePage(pageNum: number, greaterThan4Pages: boolean = false) {
        if (greaterThan4Pages) {
            if (pageNum >= secondPage && pageNum < totalPage - 2) {
                setFirstPage(secondPage);
                setSecondPage(secondPage + 1);
            } else if (pageNum <= firstPage && pageNum > 1) {
                setFirstPage(pageNum - 1);
                setSecondPage(pageNum);
                setHideDots(false);
            } else if (pageNum === totalPage - 2) {
                setHideDots(true);
                setFirstPage(pageNum - 1);
                setSecondPage(pageNum);
            }
        }

        if (pageNum > totalPage) {
            if (greaterThan4Pages) {
                setFirstPage(1);
                setSecondPage(2);
                setHideDots(false);
            }
            onCallback(1)
            return setActivePage(1);
        }

        if (pageNum === 0) {
            onCallback(totalPage)
            return setActivePage(totalPage);
        }

        onCallback(pageNum)
        setActivePage(pageNum);
    }

    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }


    return (
        <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <div onClick={() => {handleActivePage(activePage - 1, pageNumbers.length > TOTAL_PAGES_SELECTED)}} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-blue-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:cursor-pointer">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                </div>
                {
                    (pageNumbers.length <= TOTAL_PAGES_SELECTED) ?
                        pageNumbers.map((pageNum) => {
                            return <div key={pageNum} onClick={() => {handleActivePage(pageNum)}} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold hover:cursor-pointer ${activePage === pageNum ?
                                'z-10 bg-blue-900 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' :
                                'text-blue-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-01'}`}>{pageNum}</div>
                        }) :
                        <div>
                            <div onClick={() => {handleActivePage(firstPage, true)}} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold hover:cursor-pointer ${activePage === firstPage ?
                                'z-10 bg-blue-900 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' :
                                'text-blue-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-01'}`}>{firstPage}</div>
                            <div onClick={() => {handleActivePage(secondPage, true)}} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold hover:cursor-pointer ${activePage === secondPage ?
                                'z-10 bg-blue-900 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' :
                                'text-blue-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-01'}`}>{secondPage}</div>
                            {!hideDots ? <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span> : ""}
                            <div onClick={() => {handleActivePage(pageNumbers[pageNumbers.length - 2])}} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold hover:cursor-pointer ${activePage === pageNumbers[pageNumbers.length - 2] ?
                                'z-10 bg-blue-900 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' :
                                'text-blue-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-01'}`}>{pageNumbers[pageNumbers.length - 2]}</div>
                            <div onClick={() => {handleActivePage(pageNumbers[pageNumbers.length - 1])}} className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold hover:cursor-pointer ${activePage === pageNumbers[pageNumbers.length - 1] ?
                                'z-10 bg-blue-900 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' :
                                'text-blue-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-01'}`}>{pageNumbers[pageNumbers.length - 1]}</div>
                        </div>
                }

                <div onClick={() => {handleActivePage(activePage + 1, pageNumbers.length > TOTAL_PAGES_SELECTED)}} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-blue-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:cursor-pointer">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                </div>
            </nav>
        </div>
    );
}

export default Pagination;