import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

type ActiveTab = 'login' | 'register'

function AuthTabsLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<ActiveTab>(location.pathname.replace('/', '') as ActiveTab);
    function handleSwitchTab(activeTab: ActiveTab) {
        setActiveTab(activeTab);
        navigate(`/${activeTab}`);
    }

    return (
        <>
            <div className="h-screen w-screen bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 grid justify-center items-center">
                <div className="w-[400px] grid grid-rows-[50px_minmax(500px,_1fr)]">
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
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default AuthTabsLayout;