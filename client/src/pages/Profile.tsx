import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import { OAuthUser, User } from "../types/api";

function Profile() {
    const { user } = useContext(AuthContext) as { user: User & OAuthUser | null};
    return (
        <>
            <Header />
            <div className="flex flex-col justify-between min-h-screen">
                <div className="flex-grow bg-gradient-to-r from-slate-100/40 to-gray-100 grid justify-center items-center">
                    <div className="h-[450px] w-[1000px] grid grid-cols-[70%_30%] bg-white rounded-2xl border-[1px] border-slate-300">
                        <div className="grid grid-rows-[50px_1fr]">
                            <p>Information</p>
                            <div className="grid grid-rows-2">
                                <div className="md:w-[350px] sm:w-[270px] w-[270px] grid grid-cols-2 gap-x-2">
                                    <div>
                                        <label htmlFor="firstname" className="text-sm font-semibold text-slate-700">
                                            Firstname <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="firstname"
                                                type="text"
                                                autoComplete="text"
                                                required
                                                className="p-2 border-2 w-full rounded focus:outline-slate-500 text-sm border-slate-300"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="lastname" className="text-sm font-semibold text-slate-700">
                                            Lastname
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="lastname"
                                                type="text"
                                                autoComplete="text"
                                                required
                                                className="p-2 border-2 w-full rounded focus:outline-slate-500 text-sm border-slate-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid justify-center items-center">
                            <div>
                                <div className="p-1 h-[220px] w-[220px] border-2 rounded-2xl border-slate-300">
                                    <img className=" rounded-xl" src={(user && user.photoURL) || "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"} alt="" />
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