import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
    return !localStorage.getItem('accessToken') ? <Navigate to='/login' /> :
        <Outlet />;
}

export default ProtectedRoute;
