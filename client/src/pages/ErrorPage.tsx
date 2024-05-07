import { useLayoutEffect, useState } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import Loading from "../components/common/Loading";

function ErrorPage() {
    const error = useRouteError() as Error;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        setLoading(true);
        // Access token expired, reset pair token from refresh token
        if (error.message === "401") {
            const refreshToken = localStorage.getItem('refreshToken');
            fetch(`http://localhost:3001/auth/refresh-token`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"                        
                },
                body: JSON.stringify({ refreshToken })
            })            
            // Handle promise when call refresh token API
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
        }
    });

    return (
        <> 
        {
            loading ? <Loading /> :
            <div>
                An error occurred !!
            </div>
        }
        </>
    );
}

export default ErrorPage;

function useEffectLayout(arg0: () => void) {
    throw new Error("Function not implemented.");
}
