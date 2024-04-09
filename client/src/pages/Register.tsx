import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EMAIL_VALIDATION_REGEX } from "../utils/constants";

function Register() {
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmedPassword, setConfirmedPassword] = useState<string>('');

    async function handleRegister() {
        if (!firstname || !lastname ||  !EMAIL_VALIDATION_REGEX.test(email) || 
        !username || password.length < 6 || password !== confirmedPassword) {
            return;
        }

        const defaultInfo = { firstname, lastname, username, email, password }
        const response = await fetch('http://localhost:3001/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ defaultInfo, type: 'default' })
        });
        const { tokens } = await response.json();
        if (tokens && tokens.accessToken && tokens.refreshToken) {
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            navigate('/');
        }
    }

    return (
        <div className="bg-white mt-4 rounded-lg grid-rows-[70px_1fr]">
            <div className="grid justify-center items-center m-8">
                <Link to="/" className="-m-1.5 p-1.5">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </Link>
            </div>
            <div className="grid grid-rows-5 items-center justify-center mx-6">
                <div className="w-[350px] grid grid-cols-2 gap-x-2">
                    <div>
                        <label htmlFor="firstname" className="text-sm font-semibold text-slate-700">
                            Firstname
                        </label>
                        <div className="mt-2">
                            <input
                                name="firstname"
                                type="text"
                                autoComplete="text"
                                required
                                className="p-2 border-2 w-full border-slate-300 rounded focus:outline-slate-500"
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
                                className="p-2 border-2 w-full border-slate-300 rounded focus:outline-slate-500"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[350px]">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                            name="email"
                            type="email"
                            autoComplete="text"
                            required
                            className="p-2 border-2 w-full border-slate-300 rounded focus:outline-slate-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-[350px]">
                    <label htmlFor="username" className="text-sm font-semibold text-slate-700">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            name="username"
                            type="text"
                            autoComplete="text"
                            required
                            className="p-2 border-2 w-full border-slate-300 rounded focus:outline-slate-500"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-[350px] grid grid-cols-2 gap-x-2">
                    <div>
                        <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="p-2 border-2 w-full border-slate-300 rounded focus:outline-slate-500"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="text-sm font-semibold text-slate-700">
                            Confirm password
                        </label>
                        <div className="mt-2">
                            <input
                                name="confirm-password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="p-2 border-2 w-full border-slate-300 rounded focus:outline-slate-500"
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button 
                    className=" bg-blue-600 p-3 text-slate-100 font-semibold rounded text-center hover:bg-blue-500 drop-shadow-2xl"
                    onClick={handleRegister}>
                        REGISTER
                </button>
            </div>
        </div>
    );
}

export default Register;