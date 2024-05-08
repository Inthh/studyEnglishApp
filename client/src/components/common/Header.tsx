import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUturnRightIcon, UserIcon } from "@heroicons/react/16/solid";

import { AuthContext } from "../../contexts/AuthProvider";
import { OAuthUser, User } from "../../types/api";
import { ResoucesContext, Resources } from "../../contexts/ResourcesProvider";

type ActivePage = "about-me";
type ActivePageNameMap = {
    [key in ActivePage]: string;
};
const ACTIVE_PAGE_NAME_MAP: ActivePageNameMap = {
    "about-me": "About me"
}
const pages: ActivePage[] = ["about-me"];

function Header() {
    const location = useLocation();
    const { user, setUser } = useContext(AuthContext) as {
        user: (User & OAuthUser | null),
        setUser: React.Dispatch<React.SetStateAction<(User & OAuthUser | null)>> };
    const { resources } = useContext(ResoucesContext) as { resources: Resources };
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const pageName = location.pathname.replace('/', '') as ActivePage;
    const [activePage, setActivePage] = useState<ActivePage | "">(
        pages.includes(pageName) ? pageName : ""
    );

    async function handleLogout() {
        if (!user) return;

        switch (user.type) {
            case "google": {
                user.auth.signOut();
                localStorage.removeItem('accessToken');
                setUser(null);
                navigate('/login');
                break;
            }

            case "default": {
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
        }
    }

    function handleLogin() {
        navigate('/login');
    }

    function handleProfile() {
        navigate('/profile');
    }

    function handleSwitchPage(page: ActivePage) {
        setActivePage(page);
        navigate(`/${page}`);
    }
    
    return (
        <header className="bg-white border-b-[1px] border-slate-300 h-[100px] grid items-center">
                <nav className="grid grid-cols-3 sm:mx-[50px] mx-[40px] items-center justify-between" aria-label="Global">
                    <div className="">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                        </Link>
                    </div>
                    <nav className={`grid grid-cols-${pages.length} justify-items-center`}>
                        {
                            pages.map((page) => (
                                <button
                                key={page}
                                onClick={() => handleSwitchPage(page)}
                                className={`text-lg font-bold text-slate-700 w-[120px] ${activePage === page && "p-2 rounded-lg bg-slate-300"}`}>
                                {ACTIVE_PAGE_NAME_MAP[page]}
                                </button>
                            )) 
                        }
                        
                    </nav>
                    { user ? (
                        <>
                            <div className="grid justify-end">
                                <div className="inline-flex items-center mr-3">
                                    <p className="text-sm font-semibold text-blue-600 mr-2">Hello, {(user as OAuthUser).displayName || `${(user as User).firstname} ${(user as User).lastname}`}</p>
                                    <div
                                        className="relative border-2 border-slate-500 h-9 w-9 rounded-full grid justify-center items-center hover:cursor-pointer"
                                        onClick={() => setShowMenu(!showMenu)}>
                                        <img className="object-cover h-7 w-7 rounded-full" src={user.photoURL || resources.avatarDefaultURL } alt="" />
                                        {
                                            showMenu &&
                                            <nav className="absolute z-10 w-[150px] h-[100px] right-1 top-10 bg-slate-500 grid grid-rows-2 text-sm text-slate-100 rounded-md">
                                                <div className="font-semibold leading-6 rounded p-2 m-2 hover:bg-white hover:text-slate-500 hover:cursor-pointer inline-flex items-center" onClick={handleProfile}>
                                                    <UserIcon className="h-4 w-4 mr-2" />Profile
                                                </div>
                                                <div className="font-semibold leading-6 rounded p-2 m-2 hover:bg-white hover:text-slate-500 hover:cursor-pointer inline-flex items-center" onClick={handleLogout}>
                                                    <ArrowUturnRightIcon className="h-4 w-4 mr-2" />Log out
                                                </div>
                                            </nav>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="grid justify-end">
                            <button className="text-sm font-semibold leading-6 text-slate-100 py-1 px-4 rounded bg-blue-600 hover:bg-blue-500" onClick={handleLogin}>
                                Log in <span aria-hidden="true">&rarr;</span>
                            </button>
                        </div>
                    )}
                </nav>
        </header>
    )
}

export default Header