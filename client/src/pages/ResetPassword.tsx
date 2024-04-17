import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext, useRef, useState } from "react";
import { OAuthUser, User } from "../types/api";

function ResetPassword() {
    const { user } = useContext(AuthContext) as { user: User & OAuthUser | null};
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmedPasswordRef = useRef(null);

    async function handleSubmitResetPassword() {
        if (oldPassword.length < 6 || newPassword.length < 6 || confirmedPassword !== newPassword) {
            const message = oldPassword.length < 6 ? "Old password field must be at least 6 characters long" :
                newPassword.length < 6 ? "New password field must be at least 6 characters long" :
                "The confirmed password does not match the new password";
            toast.error(message);
            return;
        }

        const id = toast.loading("Please wait, request is pending...", {
            position: "top-center"
        });
        const response = await fetch('http://localhost:3001/auth/password/reset', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ oldPassword, newPassword, userId: user?.id })
        });

        const data = await response.json();

        if (response.status !== 200) {
            toast.update(id, {
                render: data.message || "An unexpected error has occurred",
                type: "error",
                isLoading: false,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
        } else if (data.accessToken && data.refreshToken) {
            toast.update(id, {
                render: "Reset password successfully",
                type: "success",
                isLoading: false,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
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
                <div className="flex-grow bg-gradient-to-r from-slate-100/40 to-gray-100 grid justify-center items-center">
                    <div className="grid grid-rows-[20px_1fr_1fr_1fr_50px] sm:h-[500px] sm:w-[450px] h-[500px] w-[350px] bg-white rounded-2xl border-[1px] border-slate-300 p-10">
                        <div className="inline-flex items-center border-l-4 border-slate-700 text-slate-700">
                            <p className="pl-2 font-bold text-lg">Reset password</p>
                        </div>
                        <div className="mt-4 border-b-[1px] border-slate-300">
                            <label htmlFor="old-password" className="text-sm font-semibold text-slate-700">
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
                                    className="p-2 border-2 w-full border-blue-300 rounded focus:outline-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="old-password" className="text-sm font-semibold text-slate-700">
                                New password
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={newPasswordRef}
                                    name="old-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="p-2 border-2 w-full border-blue-300 rounded focus:outline-blue-500"
                                />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="old-password" className="text-sm font-semibold text-slate-700">
                                Confirmed password
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={confirmedPasswordRef}
                                    name="old-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setConfirmedPassword(e.target.value)}
                                    className="p-2 border-2 w-full border-blue-300 rounded focus:outline-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid justify-end">
                            <button
                                className="sm:h-[50px] h-[40px] p-2 bg-blue-500 rounded font-semibold text-slate-100 hover:scale-105 duration-300"
                                onClick={handleSubmitResetPassword}>
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

export default ResetPassword