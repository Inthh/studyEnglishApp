import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { EMAIL_VALIDATION_REGEX, LOGO_PATH, REGISTER_FIELD_ERROR_MESSAGES, SERVER_BASE_URL } from "../utils/constants";
import { HashLoader } from "react-spinners";

type ErrorField = keyof typeof REGISTER_FIELD_ERROR_MESSAGES

function Register() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [fieldError, setFieldError] = useState<ErrorField>('invalid');
    const [responseError, setResponseError] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    async function handleRegister() {
        if (!firstname) {
            return setFieldError('firstname');
        }

        if (!EMAIL_VALIDATION_REGEX.test(email)) {
            return setFieldError('email');
        }

        if (!username) {
            return setFieldError('username');
        }

        if (password.length < 6) {
            return setFieldError('password');
        }

        if (password !== confirmedPassword) {
            return setFieldError('confirmedPassword');
        }

        const defaultInfo = { firstname, lastname, username, email, password }
        setLoading(true);
        const response = await fetch(`${SERVER_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ defaultInfo, type: 'default' })
        });
        const data = await response.json();
        setLoading(false);

        const { tokens, message } = data;
        if (tokens && tokens.accessToken && tokens.refreshToken) {
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            navigate('/');
        } else if (message) {
            setResponseError(message);
        }
    }

    return (
        <>
            {
                loading &&
                <div className="fixed top-0 left-0 w-full h-full grid justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <HashLoader color="#3B82F6" />
                </div>
            }
            <div className="bg-white mt-4 rounded-lg grid-rows-[70px_1fr] h-[530px]">
                <div className="grid justify-center items-center mt-8 mb-2">
                    <Link to="/" className="-m-1.5 p-1.5 grid justify-center items-center">
                        <img className="h-[70px] w-auto" src={LOGO_PATH} alt="" />
                    </Link>
                    <p className="mt-6 text-xs text-red-500 h-[20px]">{REGISTER_FIELD_ERROR_MESSAGES[fieldError] ? responseError : ""}</p>
                </div>
                <div className="grid grid-rows-5 items-center justify-center mx-6">
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
                                    className={`p-2 border-2 w-full rounded focus:outline-slate-500 text-sm ${fieldError === "firstname" ? "bg-red-50 border-red-300" : "border-slate-300"}`}
                                    onChange={(e) => setFirstname(e.target.value)}
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
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[350px] sm:w-[270px] w-[270px]">
                        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                name="email"
                                type="email"
                                autoComplete="text"
                                required
                                className={`p-2 border-2 w-full rounded focus:outline-slate-500 text-sm ${fieldError === "email" ? "bg-red-50 border-red-300" : "border-slate-300"}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="md:w-[350px] sm:w-[270px] w-[270px]">
                        <label htmlFor="username" className="text-sm font-semibold text-slate-700">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                name="username"
                                type="text"
                                autoComplete="text"
                                required
                                className={`p-2 border-2 w-full rounded focus:outline-slate-500 text-sm ${fieldError === "username" ? "bg-red-50 border-red-300" : "border-slate-300"}`}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="md:w-[350px] sm:w-[270px] w-[270px] grid grid-cols-2 gap-x-2">
                        <div>
                            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`p-2 border-2 w-full rounded focus:outline-slate-500 text-sm ${fieldError === "password" ? "bg-red-50 border-red-300" : "border-slate-300"}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="text-sm font-semibold text-slate-700">
                                Confirm password <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`p-2 border-2 w-full rounded focus:outline-slate-500 text-sm ${fieldError === "confirmedPassword" ? "bg-red-50 border-red-300" : "border-slate-300"}`}
                                    onChange={(e) => setConfirmedPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className=" bg-blue-600 p-3 text-slate-100 font-semibold rounded text-center hover:bg-blue-500 drop-shadow-xl"
                        onClick={handleRegister}>
                            REGISTER
                    </button>
                </div>
            </div>
        </>
    );
}

export default Register;