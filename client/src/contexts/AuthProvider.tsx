import { ReactNode, createContext, useEffect, useState } from "react";
import { extractPayloadFromToken } from "../utils/token";
import { useNavigate } from 'react-router-dom';
import Loading from "../components/common/Loading";
import { User } from "../types/api";

export const AuthContext = createContext({});

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setIsLoading(false);
            return;
        }

        const payload = extractPayloadFromToken(accessToken);
        if (payload && payload.userId && !user) {
            fetch(`http://localhost:3001/user/ ${payload.userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    navigate('/login');
                }
                setIsLoading(false);
            });
        }
    });

    return <AuthContext.Provider value={{ user, setUser }}>
        {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
}

export default AuthProvider