import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useContext, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

type Tokens = {
    accessToken: string;
    refreshToken: string;
}

function login() {
    const auth = getAuth();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useContext(AuthContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    async function handleSubmitLogin () {
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
            navigate(-1);
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
            navigate(-1)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="text"
                                name="text"
                                type="text"
                                autoComplete="text"
                                required
                                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                                </a>
                            </div> */}
                        </div>
                            <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {showErrorMsg && (
                        <p className= "flex justify-center text-red-600 mt-2">
                        Login information is incorrect, please try again
                        </p>
                    )}

                    <div id="btn-login">
                        <button
                        onClick={handleSubmitLogin}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
                        >
                        Sign in
                        </button>
                    </div>
                </div>
            </div>
            <button onClick={handleLoginWithGoogle}>Login with google</button>
        </>
    );
}

export default login;