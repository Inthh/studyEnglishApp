import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { OAuthUser, User } from "../types/api";

function ProtectedPassword() {
    const { user } = useContext(AuthContext) as { user: User & OAuthUser | null};
    return user?.type !== "default" ? <Navigate to='/' /> : <Outlet />;
}

export default ProtectedPassword;
