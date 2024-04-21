import { useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { COMMON_TOAST_OPTIONS, EMAIL_VALIDATION_REGEX } from "../utils/constants";

function ForgotPassword() {
    const [email, setEmail] = useState<string>("");

    async function handleForgotPassword() {
        const id = toast.loading("Please wait, request is pending...", {
            position: "top-center"
        });

        if (!EMAIL_VALIDATION_REGEX.test(email)) {
            return toast.update(id, {
                render: "Email address is invalid",
                type: "error",
                isLoading: false,
                ...COMMON_TOAST_OPTIONS
            });
        }

        const response = await fetch('http://localhost:3001/auth/password/forgot', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();

        toast.update(id, {
            render: data.message || "An unexpected error has occurred",
            type: response.status === 200 ? "success" : "error",
            isLoading: false,
            ...COMMON_TOAST_OPTIONS
        });
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
                <div className="grid grid-rows-3 bg-white p-5 rounded-lg text-slate-700 justify-center gap-y-5">
                    <div className="text-2xl font-bold w-[400px] grid justify-center items-center">
                        <p>Enter your email</p>
                    </div>
                    <input 
                        type="email" required
                        placeholder="Reset link will be sent to this email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="placeholder:italic p-2 border-2 w-full border-slate-300 rounded focus:outline-slate-500"
                    />
                    <button
                        onClick={handleForgotPassword}
                        className="bg-blue-600 p-3 text-slate-100 font-semibold rounded text-center hover:bg-blue-500 drop-shadow-xl" >Submit</button>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;