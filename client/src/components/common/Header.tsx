import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthProvider";
import { OAuthUser, User } from "../../types/api";
import { ArrowUturnRightIcon } from "@heroicons/react/16/solid";

function Header() {
    const { user, setUser } = useContext(AuthContext) as {
        user: (User & OAuthUser | null),
        setUser: React.Dispatch<React.SetStateAction<(User & OAuthUser | null)>> };

    const navigate = useNavigate();
    async function handleLogout() {
        if (user && user.uid) {
            user.auth.signOut();
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        await fetch('http://localhost:3001/auth/logout', {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        navigate('/login');
    }

    function handleLogin() {
        navigate('/login');
    }

    return (
        <header className="bg-white border-b-[1px] border-slate-300">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                        </Link>
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        { user ? (
                            <>
                                <div className="relative">
                                    <div className="inline-flex items-center mr-3">
                                        <p className="text-sm font-semibold text-blue-600 mr-2">Hello, {(user as OAuthUser).displayName || `${(user as User).firstname} ${(user as User).lastname}`}</p>
                                        <div className="border-2 border-slate-500 h-9 w-9 rounded-full grid justify-center items-center">
                                            <img className="h-7 w-7 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png" alt="" />
                                        </div>
                                    </div>
                                    <nav className="absolute z-10 w-[150px] left-[20%] top-10 bg-slate-200 grid grid-rows-2 text-sm text-blue-400">
                                        <div className="font-semibold leading-6 rounded p-2 m-2 hover:bg-white hover:text-blue-600 inline-flex items-center" onClick={handleLogout}>
                                            <ArrowUturnRightIcon className="h-4 w-4 mr-2" />Log out
                                        </div>
                                    </nav>
                                </div>
                                {/* <button className="text-sm font-semibold leading-6 text-slate-100 py-1 px-1.5 rounded p-2 bg-blue-600 hover:bg-blue-500" onClick={handleLogout}>
                                    Log out <span aria-hidden="true">&rarr;</span>
                                </button> */}
                            </>
                        ) : (
                            <>
                                <button className="text-sm font-semibold leading-6 text-slate-100 py-1 px-1.5 rounded bg-blue-600 hover:bg-blue-500" onClick={handleLogin}>
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </button>
                            </>
                        )}

                    </div>
                </nav>
        </header>
    )
}

export default Header