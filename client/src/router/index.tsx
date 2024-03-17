import { Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../contexts/AuthProvider";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Learn from "../pages/Learn";

// eslint-disable-next-line react-refresh/only-export-components
const AuthLayout = () => <AuthProvider><Outlet/></AuthProvider>

// eslint-disable-next-line react-refresh/only-export-components
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
                    },
                    {
                        path: '/learn/vocabulary/:setId',
                        element: <Learn />
                    }
                ]
            }
        ]
    }
]);