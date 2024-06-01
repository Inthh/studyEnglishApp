import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { COMMON_TOAST_OPTIONS, SERVER_BASE_URL } from "../utils/constants";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [isReseted, setIsReseted] = useState(false);

    async function handleResetPassword() {
        if (!token || newPassword.length < 6 || newPassword !== confirmedPassword) {
            const message = !token ? "Reset link is invalid" : newPassword.length < 6 ?
                "New password field must be at least 6 characters long" :
                "The confirmed password does not match the new password";
            toast.error(message);
            return;
        }

        const id = toast.loading("Please wait, request is pending...", {
            position: "top-center"
        });

        const response = await fetch(`${SERVER_BASE_URL}/auth/password/reset`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, newPassword })
        });

        const data = await response.json();

        if (response.status !== 200) {
            toast.update(id, {
                render: data.message || "An unexpected error has occurred",
                type: "error",
                isLoading: false,
                ...COMMON_TOAST_OPTIONS
            });
        } else {
            toast.update(id, {
                render: data.message || "Reset password successfully",
                type: "success",
                isLoading: false,
                ...COMMON_TOAST_OPTIONS
            });
            setIsReseted(true);
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
            <div className="h-screen w-screen bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 grid justify-center items-center">
                {
                    isReseted ?
                    <div className="grid justify-center items-center bg-white p-5 rounded-lg text-slate-700 w-[400px]">
                        <button
                            onClick={() => navigate("/login")}
                            className="w-[360px] bg-blue-600 p-3 text-slate-100 font-semibold rounded text-center hover:bg-blue-500 drop-shadow-xl" >Back to the login page</button>
                    </div> :
                    <div className="grid grid-rows-4 bg-white p-5 rounded-lg text-slate-700 justify-center gap-y-5">
                        <div className="text-2xl font-bold w-[400px] grid justify-center items-center">
                            <p>Reset password</p>
                        </div>
                        <div className="">
                            <label htmlFor="new-password" className="text-sm font-semibold text-slate-700">
                                New password
                            </label>
                            <div className="mt-2">
                                <input
                                    name="new-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="p-2 border-2 w-full border-blue-300 rounded focus:outline-blue-500"
                                />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="confirmed-password" className="text-sm font-semibold text-slate-700">
                                Confirmed password
                            </label>
                            <div className="mt-2">
                                <input
                                    name="confirmed-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setConfirmedPassword(e.target.value)}
                                    className="p-2 border-2 w-full border-blue-300 rounded focus:outline-blue-500"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleResetPassword}
                            className="h-[65%] bg-blue-600 p-3 text-slate-100 font-semibold rounded text-center hover:bg-blue-500 drop-shadow-xl" >Submit</button>
                    </div>
                }
            </div>
        </>
    );
}

export default ResetPassword;