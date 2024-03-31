import { CursorArrowRaysIcon } from "@heroicons/react/16/solid";

function WordChecker() {
    return (
        <div className="grid grid-rows-[50px_340px] w-[100%]">
            <p className=" text-2xl font-bold my-auto">Practice</p>
            <div className="grid grid-rows-3 mt-10 rounded-2xl bg-white drop-shadow-xl">
                <div className="row-span-2 grid grid-rows-3">
                    <div className="row-span-1 mt-7 ml-7">
                      (v) tôn trọng, tuân theo, giữ (lời)
                    </div>
                    <div className="row-span-2 grid grid-cols-8 gap-2 mx-3 mb-3 items-center justify-items-center">
                        <div className="col-span-1 bg-sky-300 md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center ">
                            <input type="text" maxLength="1" className="bg-sky-300 text-center text-4xl font-semibold text-blue-900 w-[60%] h-[100%] focus:outline-none " />
                        </div>
                        <div className="col-span-1 bg-sky-300 md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center ">
                            <input type="text" maxLength="1" className="bg-sky-300 text-center text-4xl font-semibold text-blue-900 w-[60%] h-[100%] focus:outline-none " />
                        </div>
                        <div className="col-span-1 bg-sky-300 md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center ">
                            <input type="text" maxLength="1" className="bg-sky-300 text-center text-4xl font-semibold text-blue-900 w-[60%] h-[100%] focus:outline-none " />
                        </div>
                        <div className="col-span-1 bg-sky-300 md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center ">
                            <input type="text" maxLength="1" className="bg-sky-300 text-center text-4xl font-semibold text-blue-900 w-[60%] h-[100%] focus:outline-none " />
                        </div>
                        <div className="col-span-1 bg-sky-300 md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center ">
                            <input type="text" maxLength="1" className="bg-sky-300 text-center text-4xl font-semibold text-blue-900 w-[60%] h-[100%] focus:outline-none " />
                        </div>
                        <div className="col-span-1 white md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center ">
                            <input type="text" readonly='true' maxLength="0" className="white text-center text-4xl font-semibold text-blue-900 w-[60%] h-[100%] focus:outline-none " />
                        </div>
                        <div className="col-span-1 bg-sky-300 md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center ">
                            <input type="text" maxLength="1" className="bg-sky-300 text-center text-4xl font-semibold text-blue-900 w-[60%] h-[100%] focus:outline-none " />
                        </div>
                        <div className="col-span-1 bg-sky-300 md:w-[70px] md:h-[70px] sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded grid justify-items-center items-center ">
                            <input type="text" maxLength="1" className="bg-sky-300 text-center text-4xl font-semibold text-blue-900 w-[60%] h-[100%] focus:outline-none " />
                        </div>
                    </div>
                    
                </div>
                <div className="grid justify-items-center">
                    <div className="grid grid-cols-2">
                        <div className="grid justify-items-end font-bold">Answer:</div>
                        <div className="ml-2">abide by</div>
                    </div>
                    <div className="bg-blue-800 w-[120px] h-[50px] grid rounded-2xl grid-cols-3 hover:cursor-pointer hover:opacity-80">
                        <div className="text-base font-medium text-white col-span-2 grid items-center ml-5">
                            Submit
                        </div>
                        <div className="grid items-center justify-items-end mr-5">
                            <CursorArrowRaysIcon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WordChecker;