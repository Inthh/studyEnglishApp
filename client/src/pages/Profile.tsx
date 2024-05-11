import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { ArrowUpTrayIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import { OAuthUser, User } from "../types/api";
import { useNavigate } from "react-router-dom";
import { COMMON_TOAST_OPTIONS } from "../utils/constants";
import { storage } from "../firebase/config";
import { ResoucesContext, Resources } from '../contexts/ResourcesProvider';

function Profile() {
    const { user, setUser } = useContext(AuthContext) as { user: User & OAuthUser | null,
        setUser: React.Dispatch<React.SetStateAction<(User & OAuthUser | null)>> };
    const { resources } = useContext(ResoucesContext) as { resources: Resources };
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState(user?.firstname || "");
    const [lastname, setLastname] = useState(user?.lastname || "");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoURL, setPhotoURL] = useState<string | null>(user?.photoURL ?? null);

    useEffect(() => {
        return () => {
            photo && photoURL?.search("blob:") === 0 && URL.revokeObjectURL(photoURL)
        }
    }, [photo, photoURL])

    async function uploadPhotoToFirebaseStorage(photo: File) {
        try {
            const storageRef = ref(storage, `/photos/${(user?.id || user?.uid) + "-" + uuidv4()}`);
            const uploadTask = await uploadBytes(storageRef, photo);

            return await getDownloadURL(uploadTask.ref);
        } catch(err) {
            return null;
        }
    }

    function handlePhotoChange(photo: File | null) {
        if (photo) {
            setPhotoURL(URL.createObjectURL(photo));
            setPhoto(photo);
        }
    }

    async function handleUpdateUserInfo() {
        if (user?.type !== "default") {
            return;
        }

        if (!firstname) {
            toast.error("First name is required")
            return;
        }
        const id = toast.loading("Please wait, user's infomation updating...", {
            position: "top-center"
        });

        let photoFirebaseURL = null;
        if (photo) {
            photoFirebaseURL = await uploadPhotoToFirebaseStorage(photo);
        }

        const response = await fetch('http://localhost:3001/user', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ firstname, lastname, photoURL: photoFirebaseURL ?? photoURL })
        });

        const data = await response.json();

        if (response.status !== 200) {
            toast.update(id, {
                render: data.message || "An unexpected error has occurred",
                type: "error",
                isLoading: false,
                ...COMMON_TOAST_OPTIONS
            });
            if (response.status === 401) {
                setTimeout(() => {
                    navigate(0);
                }, 1500);
                return;
            }
        } else if (data) {
            toast.update(id, {
                render: "User's information updated",
                type: "success",
                isLoading: false,
                ...COMMON_TOAST_OPTIONS
            });
            setUser({ ...user, ...data });
        }
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
            <Header />
            <div className="flex flex-col justify-between min-h-screen">
                <div className="flex-grow bg-gradient-to-r from-slate-100/40 to-gray-100 dark:from-slate-600 dark:to-gray-700 grid justify-items-center items-center">
                    <div className="md:h-[450px] h-[900px] lg:w-[1000px] md:w-[750px] w-[90%] grid lg:grid-cols-[70%_30%] md:grid-cols-[60%_40%] grid-cols-1 bg-white dark:bg-gray-400 rounded-2xl border-[1px] border-slate-300 dark:border-slate-800 my-6">
                        <div className="grid grid-rows-[50px_1fr_50px] p-10 md:order-1 order-last">
                            <div className="inline-flex items-center border-l-4 mb-4 border-slate-700 text-slate-700">
                                <p className="pl-2 font-bold text-2xl">Information</p>
                                <UserCircleIcon className="pl-2 h-10 w-10"/>
                            </div>
                            <div className="grid sm:grid-rows-2">
                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-10">
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
                                                value={user?.email || ""}
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
                                                value={user?.username || ""}
                                                className="p-2 border-2 w-full rounded text-sm border-slate-300 focus:outline-none bg-slate-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-10">
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
                                                        value={user?.displayName || ""}
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
                                        <button
                                            className="h-[90%] p-2 bg-blue-500 dark:bg-blue-600 rounded font-semibold text-slate-100 hover:scale-105 duration-300"
                                            onClick={() => navigate('/change-password')}>Change password</button>
                                    </div>
                                    <div className="grid justify-end">
                                        <button
                                            className="h-[90%] p-2 bg-green-500 dark:bg-green-600 rounded font-semibold text-slate-100 hover:scale-105 duration-300"
                                            onClick={handleUpdateUserInfo}>Save changes</button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="grid justify-center items-center md:order-last order-1">
                            <div className="p-4 rounded-xl shadow-xl hover:-translate-y-3 duration-500">
                                <div className="relative">
                                    {
                                        user?.type === "default" &&
                                        <>
                                            <input
                                                type="file"
                                                id="avatar"
                                                onChange={(e) => handlePhotoChange(e.target.files ? e.target.files[0] : null)}
                                                hidden />
                                            <label
                                                htmlFor="avatar"
                                                className="absolute grid justify-center items-center top-0 left-0 h-[220px] w-[220px] bg-slate-100 rounded-lg hover:opacity-80 opacity-0" >
                                                <ArrowUpTrayIcon className="h-[50px] w-[50px] text-slate-700" />
                                            </label>
                                        </>
                                    }
                                    <LazyLoadImage 
                                        className="object-cover rounded-xl h-[220px] w-[220px]" 
                                        src={photoURL || resources.avatarDefaultURL} 
                                        effect="opacity"
                                        alt="" />
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