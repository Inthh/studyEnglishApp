import { useLayoutEffect, useState } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import Loading from "../components/common/Loading";
import { SERVER_BASE_URL } from "../utils/constants";

function ErrorPage() {
    const error = useRouteError() as Error;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        // Access token expired, reset pair token from refresh token
        if (error.message === "401") {
            setLoading(true);
            const refreshToken = localStorage.getItem('refreshToken');
            fetch(`${SERVER_BASE_URL}/auth/refresh-token`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"                        
                },
                body: JSON.stringify({ refreshToken })
            })            
            // Handle promise when call refresh token API
            .then((res) => res.json())
            .then((data) => {
                if (!data) return;
                const { accessToken, refreshToken } = data;
                if (accessToken && refreshToken) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    navigate(0);
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error.message]);

    return (
        loading ? <Loading /> :
        <>
            <div className="grid grid-rows-[1fr_20px] justify-center items-center min-h-screen bg-gradient-to-r from-slate-200/40 to-orange-200">
                <div>
                    <div className="sm:inline-flex">
                        <p className="text-9xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">Oops!</p>
                        <div className="ml-2 grid sm:grid-cols-2 grid-cols-[80px_80px] gap-x-2 justify-center sm:mt-0 mt-5">
                            <div className="relative bg-white w-[80px] h-[120px] rounded-full border-[1px]">
                                <div className="absolute bg-slate-600 w-[30px] h-[30px] rounded-full top-[60%] left-[50%] animate-bounce"></div>
                            </div>
                            <div className="relative bg-white w-[80px] h-[120px] rounded-full border-[1px]">
                                <div className="absolute bg-slate-600 w-[30px] h-[30px] rounded-full top-[60%] left-[50%] animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                    <div className="text-lg text-slate-700 mt-5 text-center">Something went wrong!</div>
                    <div className="mt-5 grid justify-center    ">
                        <Link to='/' className="text-lg text-slate-200 font-semibold text-center py-3 px-7 rounded-3xl bg-gradient-to-r from-green-400 to-blue-500">
                            Go to home</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ErrorPage;