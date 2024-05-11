import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useRef, useState } from "react";
import { COMMON_TOAST_OPTIONS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';


function ChangePassword() {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmedPasswordRef = useRef(null);

    async function handleSubmitChangePassword() {
        if (oldPassword.length < 6 || newPassword.length < 6 ||
            confirmedPassword !== newPassword || oldPassword === newPassword) {
            const message = oldPassword.length < 6 ? "Old password field must be at least 6 characters long" :
                newPassword.length < 6 ? "New password field must be at least 6 characters long" :
                oldPassword === newPassword ? "The new password must be different from the previously created password" :
                "The confirmed password does not match the new password";
            toast.error(message);
            return;
        }

        const id = toast.loading("Please wait, request is pending...", {
            position: "top-center"
        });
        const response = await fetch('http://localhost:3001/auth/password/change', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ oldPassword, newPassword })
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
        } else if (data.accessToken && data.refreshToken) {
            toast.update(id, {
                render: "Change password successfully",
                type: "success",
                isLoading: false,
                ...COMMON_TOAST_OPTIONS
            });
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            // Reset input element's values
            setOldPassword("");
            setNewPassword("");
            setConfirmedPassword("");
            (oldPasswordRef.current! as HTMLInputElement).value = "";
            (newPasswordRef.current! as HTMLInputElement).value = "";
            (confirmedPasswordRef.current! as HTMLInputElement).value = "";
            (oldPasswordRef.current! as HTMLInputElement).focus();
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
                <div className="flex-grow bg-gradient-to-r from-slate-100/40 to-gray-100 dark:from-slate-600 dark:to-gray-700 grid justify-center items-center">
                    <div className="grid grid-rows-[20px_1fr_1fr_1fr_50px] sm:h-[500px] sm:w-[450px] h-[500px] w-[350px] bg-white dark:bg-gray-400 rounded-2xl border-[1px] border-slate-300 dark:border-slate-800 p-10">
                        <div className="inline-flex items-center border-l-4 border-slate-700 text-slate-700 dark:text-slate-900">
                            <p className="pl-2 font-bold text-lg">Change password</p>
                        </div>
                        <div className="mt-4 border-b-[1px] border-slate-300">
                            <label htmlFor="old-password" className="text-sm font-semibold text-slate-700 dark:text-slate-900">
                                Old password
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={oldPasswordRef}
                                    name="old-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="p-2 border-2 w-full border-blue-300 dark:border-blue-400 rounded focus:outline-blue-500 dark:focus:outline-blue-700"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="new-password" className="text-sm font-semibold text-slate-700 dark:text-slate-900">
                                New password
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={newPasswordRef}
                                    name="new-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="p-2 border-2 w-full border-blue-300 dark:border-blue-400 rounded focus:outline-blue-500 dark:focus:outline-blue-700"
                                />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="confirmed-password" className="text-sm font-semibold text-slate-700 dark:text-slate-900">
                                Confirmed password
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={confirmedPasswordRef}
                                    name="confirmed-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setConfirmedPassword(e.target.value)}
                                    className="p-2 border-2 w-full border-blue-300 dark:border-blue-400 rounded focus:outline-blue-500 dark:focus:outline-blue-700"
                                />
                            </div>
                        </div>
                        <div className="grid justify-end">
                            <button
                                className="sm:h-[50px] h-[40px] p-2 bg-blue-500 dark:bg-blue-700 rounded font-semibold text-slate-100 hover:scale-105 duration-300"
                                onClick={handleSubmitChangePassword}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default ChangePassword