import { Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../contexts/AuthProvider";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Learn from "../pages/Learn";
import { learnLoader, topicsLoader } from "../utils/topicsUtils";
import { updateMemoried, vocabularyListLoader, vocabularySetsLoader } from "../utils/vocabularyUtils";
import VocabularyList from "../components/learn/VocabularyList";
import Topics from "../components/common/Topics";
import WordChecker from "../components/practice/WordChecker";
import AuthTabsLayout from "../components/Layout/AuthTabsLayout";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import ProtectedPassword from "./ProtectedPassword";
import ResourcesProvider from "../contexts/ResourcesProvider";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import AboutMe from "../pages/AboutMe";

// eslint-disable-next-line react-refresh/only-export-components
const AuthLayout = () =>
    <ResourcesProvider>
        <AuthProvider><Outlet/></AuthProvider>
    </ResourcesProvider>

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
    {
        element: <AuthLayout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                element: <AuthTabsLayout />,
                children: [
                    {
                        element: <Login />,
                        path: '/login'
                    },
                    {
                        element: <Register />,
                        path: '/register'
                    }
                ]
            },
            {
                element: <Home />,
                path: '/',
                loader: vocabularySetsLoader
            },
            {
                element: <AboutMe />,
                path: '/about-me'
            },
            {
                element: <ResetPassword />,
                path: '/reset-password/:token'
            },
            {
                element: <ForgotPassword />,
                path: '/forgot-password'
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'profile',
                        element: <Profile />
                    },
                    {
                        element: <ProtectedPassword />,
                        children: [
                            {
                                path: 'change-password',
                                element: <ChangePassword />
                            }
                        ]
                    },
                    {
                        path: 'learn/:setId',
                        element: <Learn />,
                        loader: learnLoader,
                        children: [
                            {
                                path: 'page/:pageNum',
                                element: <Topics />,
                                loader: topicsLoader,
                                children: [
                                    {
                                        path: 'topics/:topicId',
                                        element: <VocabularyList />,
                                        loader: vocabularyListLoader,
                                        action: updateMemoried
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'practice/:setId',
                        element: <Learn />,
                        id: 'practice',
                        loader: learnLoader,
                        children: [
                            {
                                path: 'page/:pageNum',
                                element: <Topics />,
                                loader: topicsLoader,
                                children: [
                                    {
                                        path: 'topics/:topicId',
                                        element: <WordChecker />,
                                        loader: vocabularyListLoader
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    }
]);