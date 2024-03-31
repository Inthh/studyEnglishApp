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
                        element: <Home />,
                        loader: vocabularySetsLoader
                    },
                    {
                        path: '/learn/:setId',
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
                        path: '/practice/:setId',
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