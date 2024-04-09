import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthProvider";
import { OAuthUser, User } from "../../types/api";

function Header() {
    const { user, setUser } = useContext(AuthContext) as {
        user: (User & OAuthUser | null),
        setUser: React.Dispatch<React.SetStateAction<(User & OAuthUser | null)>> };

    const navigate = useNavigate();
    async function handleLogout() {
        if (user && user.uid) {
            localStorage.removeItem('accessToken');
            return user.auth.signOut();
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
        <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                        </Link>
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        { user ? (
                            <>
                                <p className="text-base font-semibold text-blue-700 pr-4">Hello, {(user as OAuthUser).displayName || `${(user as User).firstName} ${(user as User).lastName}`}</p>
                                <button className="text-base font-semibold leading-6 text-gray-900" onClick={handleLogout}>
                                    Log out <span aria-hidden="true">&rarr;</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="text-base font-semibold leading-6 text-gray-900" onClick={handleLogin}>
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