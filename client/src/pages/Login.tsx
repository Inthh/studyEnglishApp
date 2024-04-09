import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { OAuthUser, User } from '../types/api';

type Tokens = {
    accessToken: string;
    refreshToken: string;
}

type ActiveTab = 'login' | 'register'

function Login() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext) as { user: (User & OAuthUser | null) };
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [activeTab, setActiveTab] = useState<ActiveTab>('login');
    async function handleSubmitLogin() {
        const username = (document.querySelector('#text') as HTMLInputElement)?.value;
        const password = (document.querySelector('#password') as HTMLInputElement)?.value;

        const response = await fetch('http://localhost:3001/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json() as Tokens;

        // Login successfull
        if (data && data.accessToken && data.refreshToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            navigate('/');
            return;
        }

        setShowErrorMsg(true);
    }

    async function handleLoginWithGoogle() {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);

        await fetch('http://localhost:3001/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: res.user.uid, displayName: res.user.displayName, type: 'google' })
        });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
        if (user && (user.uid || user.id)) {
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    function handleSwitchTab(activeTab: ActiveTab) {
        setActiveTab(activeTab);
    }


    return (
        <>
            <div className="h-screen w-screen bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 grid justify-center items-center">
                <div className="w-[350px] grid grid-rows-[50px_500px]">
                    <div className="grid grid-cols-2 bg-blue-900/20 rounded-lg text-slate-100 font-semibold">
                        <button className={`grid items-center justify-items-center m-1.5 rounded-lg ${
                            activeTab === "login" ? "bg-white text-blue-500" : "hover:bg-white/[0.14]"}`}
                            onClick={() => handleSwitchTab('login')}>
                            <p>Login</p>
                        </button>
                        <button className={`grid items-center justify-items-center m-1 rounded-lg ${
                            activeTab === "register" ? "bg-white text-blue-500" : "hover:bg-white/[0.14]"}`}
                            onClick={() => handleSwitchTab('register')}>
                            <p>Register</p>
                        </button>
                    </div>
                    <div className="bg-white mt-4 rounded-lg grid-rows-[70px_1fr_150px]">
                        <div className="grid justify-center items-center m-8">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                            </Link>
                        </div>
                        <div className="grid grid-rows-4 items-center justify-center mx-6">
                            <div className="w-[350px]">
                                <label htmlFor="text" className="text-sm font-semibold text-slate-700">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="text"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        className="p-2 border-2 w-full border-slate-300 rounded focus:outline-slate-500"
                                    />
                                </div>
                            </div>
                            <div className="w-[350px]">
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
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="text-sm font-semibold text-slate-700 inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked
                                        className="h-4 w-4"
                                    />
                                    <p className="pl-1">Remember me</p>
                                </div>
                                <div className="text-center text-sm text-blue-500 grid justify-end hover:cursor-pointer hover:underline font-medium">
                                    Forgot password
                                </div>
                            </div>
                            <button className="bg-blue-600 p-3 text-slate-100 font-semibold rounded text-center hover:bg-blue-500 drop-shadow-2xl">
                                LOGIN
                            </button>
                        </div>
                        <div className="grid justify-center text-sm text-slate-700">
                            <p className="text-center">Or sign in with: </p>
                            <div className="inline-flex mt-4">
                                <div className="mx-4 hover:cursor-pointer">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                        viewBox="-0.5 0 48 48" version="1.1">

                                        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                                <g id="Google" transform="translate(401.000000, 860.000000)">
                                                    <path
                                                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                        id="Fill-1" fill="#FBBC05"> </path>
                                                    <path
                                                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                        id="Fill-2" fill="#EB4335"> </path>
                                                    <path
                                                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                        id="Fill-3" fill="#34A853"> </path>
                                                    <path
                                                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                        id="Fill-4" fill="#4285F4"> </path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div className="mx-4 hover:cursor-pointer">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 48 48" version="1.1">
                                        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0">
                                                <path
                                                    d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                                                    id="Facebook">

                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        // <>
        //     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        //         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        //             <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        //             Sign in to your account
        //             </h2>
        //         </div>

        //         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        //             <div>
        //                 <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        //                 Username
        //                 </label>
        //                 <div className="mt-2">
        //                     <input
        //                         id="text"
        //                         name="text"
        //                         type="text"
        //                         autoComplete="text"
        //                         required
        //                         className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //                     />
        //                 </div>
        //             </div>

        //             <div>
        //                 <div className="flex items-center justify-between">
        //                     <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
        //                         Password
        //                     </label>
        //                     {/* <div className="text-sm">
        //                         <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
        //                         Forgot password?
        //                         </a>
        //                     </div> */}
        //                 </div>
        //                     <div className="mt-2">
        //                     <input
        //                         id="password"
        //                         name="password"
        //                         type="password"
        //                         autoComplete="current-password"
        //                         required
        //                         className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //                     />
        //                 </div>
        //             </div>

        //             {showErrorMsg && (
        //                 <p className= "flex justify-center text-red-600 mt-2">
        //                 Login information is incorrect, please try again
        //                 </p>
        //             )}

        //             <div id="btn-login">
        //                 <button
        //                 onClick={handleSubmitLogin}
        //                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
        //                 >
        //                 Sign in
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        //     <button onClick={handleLoginWithGoogle}>Login with google</button>
        // </>
    );
}

export default Login;