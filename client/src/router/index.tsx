import { Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../contexts/AuthProvider";
import Login from "../pages/Login";
import Home from "../pages/Home";

const AuthLayout = () => <AuthProvider><Outlet/></AuthProvider>

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                element: <Login />,
                path: '/login'
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/',
                        element: <Home />
                    }
                ]
            }
        ]
    }
]);