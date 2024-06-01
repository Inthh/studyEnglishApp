import { ReactNode, createContext, useEffect, useState } from "react";
import { extractPayloadFromToken } from "../utils/token";
import { useNavigate } from 'react-router-dom';
import Loading from "../components/common/Loading";
import { OAuthUser, User } from "../types/api";
import { getAuth } from "firebase/auth";
import { SERVER_BASE_URL } from "../utils/constants";
export const AuthContext = createContext({});

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User & OAuthUser | null>(null);
    const auth = getAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged((user) => {
            if (user && user.uid) {
                setUser({
                    uid: user.uid,
                    displayName: user.displayName ?? "",
                    email: user.email ?? "",
                    photoURL: user.photoURL ?? "",
                    auth: (user as any).auth,
                    type: "google"
                } as any);
                localStorage.setItem('accessToken', (user as unknown as OAuthUser).accessToken);
                setIsLoading(false);
                return;
            }
        })

        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setIsLoading(false);
            return;
        }

        const payload = extractPayloadFromToken(accessToken);
        if (payload && payload.userId && !user) {
            fetch(`${SERVER_BASE_URL}/user/${payload.userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "jwt expired") {
                    // Access token expired, reset pair token from refresh token
                    const refreshToken = localStorage.getItem('refreshToken');
                    fetch(`${SERVER_BASE_URL}/auth/refresh-token`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"                        
                        },
                        body: JSON.stringify({ refreshToken })
                    })            // Handle promise when call refresh token API
                    .then((res) => res.json())
                    .then((data) => {
                        if (!data) return;
                        const { accessToken, refreshToken } = data;
                        if (accessToken && refreshToken) {
                            localStorage.setItem('accessToken', accessToken);
                            localStorage.setItem('refreshToken', refreshToken);
                            navigate(0);
                        }
                    });
                    return;
                }
                if (data && data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    navigate('/login');
                }
                setIsLoading(false);
            })
        }
    });

    return <AuthContext.Provider value={{ user, setUser }}>
        {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
}

export default AuthProvider