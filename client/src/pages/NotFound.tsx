import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

function NotFound() {
    return (
        <>
            <Header />
            <div className="flex flex-col justify-between min-h-screen">
                <div className="flex-grow grid justify-center items-center bg-gradient-to-r from-slate-100/40 to-gray-100">
                    <div className="w-[560px]">
                        <div className="grid grid-cols-3">
                            <div className="grid justify-end items-center text-9xl font-bold text-sky-600">4</div>
                            <div className="grid justify-center">
                                <svg viewBox="0 0 160 160" width="150" height="150">
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="rgb(125 211 252)" stopOpacity="1" />
                                            <stop offset="100%" stopColor="rgb(14 165 233)" stopOpacity="1" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="80" cy="80" r="50" fill="url(#gradient)" />
                                    <g transform=" matrix(0.866, -0.5, 0.25, 0.433, 80, 80)">
                                        <path d="M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z" fill="rgb(186 230 253)">
                                        <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="1s" repeatCount="indefinite" />
                                        </path>
                                    </g>
                                    <path d="M 50,0 A 50,50 0 0,0 -50,0Z" transform="matrix(0.866, -0.5, 0.5, 0.866, 80, 80)" fill="url(#gradient)" />
                                </svg>
                            </div>
                            <div className="grid justify-start items-center text-9xl font-bold text-sky-600">4</div>
                        </div>
                        <p className="h-[50px] text-center text-3xl font-bold text-slate-700 mt-2">
                            UH OH! You're lost.
                        </p>
                        <p className="h-[50px] text-center text-sm italic text-slate-700">
                            The page you are looking for does not exist. How you got here is a mystery. But you can click the button bellow to go back to the your planet.
                        </p>
                        <div className="text-center mt-5">
                            <Link to='/' className="text-lg text-slate-200 font-semibold text-center py-3 px-7 rounded-3xl bg-gradient-to-r from-sky-300 to-sky-500">
                                Go to home</Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default NotFound;