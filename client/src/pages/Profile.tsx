import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext, useState } from "react";
import { OAuthUser, User } from "../types/api";
import { ArrowUpTrayIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user } = useContext(AuthContext) as { user: User & OAuthUser | null};
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState(user?.firstname)
    const [lastname, setLastname] = useState(user?.lastname)

    return (
        <>
            <Header />
            <div className="flex flex-col justify-between min-h-screen">
                <div className="flex-grow bg-gradient-to-r from-slate-100/40 to-gray-100 grid justify-center items-center">
                    <div className="h-[450px] w-[1000px] grid grid-cols-[70%_30%] bg-white rounded-2xl border-[1px] border-slate-300">
                        <div className="grid grid-rows-[50px_1fr_50px] p-10">
                            <div className="inline-flex items-center border-l-4 mb-4 border-slate-700 text-slate-700">
                                <p className="pl-2 font-bold text-2xl">Information</p>
                                <UserCircleIcon className="pl-2 h-10 w-10"/>
                            </div>
                            <div className="grid grid-rows-2">
                                <div className="grid grid-cols-2 gap-x-10">
                                    <div>
                                        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="email"
                                                type="text"
                                                autoComplete="text"
                                                readOnly={true}
                                                value={user?.email}
                                                className="p-2 border-2 w-full rounded text-sm border-slate-300 focus:outline-none bg-slate-300"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="username" className="text-sm font-semibold text-slate-700">
                                            User name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="username"
                                                type="text"
                                                autoComplete="text"
                                                readOnly={true}
                                                value={user?.username}
                                                className="p-2 border-2 w-full rounded text-sm border-slate-300 focus:outline-none bg-slate-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-10">
                                    { user?.type === 'default' ?
                                        <>
                                            <div>
                                                <label htmlFor="firstname" className="text-sm font-semibold text-slate-700">
                                                    First name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        name="firstname"
                                                        type="text"
                                                        autoComplete="text"
                                                        value={firstname}
                                                        onChange={(event) => setFirstname(event.target.value)}
                                                        className="p-2 border-2 w-full rounded focus:outline-slate-500 text-sm border-slate-300"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="lastname" className="text-sm font-semibold text-slate-700">
                                                    Last name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        name="lastname"
                                                        type="text"
                                                        autoComplete="text"
                                                        value={lastname}
                                                        onChange={(event) => setLastname(event.target.value)}
                                                        className="p-2 border-2 w-full rounded focus:outline-slate-500 text-sm border-slate-300"
                                                    />
                                                </div>
                                            </div>
                                        </> :
                                        <>
                                            <div>
                                                <label htmlFor="displayName" className="text-sm font-semibold text-slate-700">
                                                    Display name
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        name="displayName"
                                                        type="text"
                                                        autoComplete="text"
                                                        readOnly={true}
                                                        value={user?.displayName}
                                                        className="p-2 border-2 w-full rounded text-sm border-slate-300 focus:outline-none bg-slate-300"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            {
                                user?.type === "default" &&
                                <div className="grid grid-cols-2">
                                    <div>
                                        <button className="h-[90%] p-2 bg-blue-500 rounded font-semibold text-slate-100 hover:scale-105 duration-300" onClick={() => navigate('/password/reset')}>Reset password</button>
                                    </div>
                                    <div className="grid justify-end">
                                        <button className="h-[90%] p-2 bg-green-500 rounded font-semibold text-slate-100 hover:scale-105 duration-300">Save changes</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="grid justify-center items-center">
                            <div className="p-4 rounded-xl shadow-xl hover:-translate-y-3 duration-500">
                                <div className="relative">
                                    {
                                        user?.type === "default" &&
                                        <button className="absolute grid justify-center items-center top-0 left-0 h-[220px] w-[220px] bg-slate-100 rounded-lg hover:opacity-80 opacity-0">
                                            <ArrowUpTrayIcon className="h-[50px] w-[50px] text-slate-700" />
                                        </button>
                                    }

                                    <img className="rounded-xl h-[220px] w-[220px]" src={(user && user.photoURL) || "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"} alt="" />
                                </div>
                                <div className="mt-4 text-center">
                                    {
                                        user &&
                                        <>
                                            <p className="font-semibold text-slate-700">{user.displayName || (user.firstname + user.lastname)}</p>
                                            <p className="text-slate-500 text-xs">{user.email}</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Profile