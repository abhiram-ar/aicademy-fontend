import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AutheicatedNavbar from "./layout/AuthenticatedNavbar";
import LandingPage from "./pages/LandingPage";
import TeacherSignupPage from "./pages/teacher/auth/TeacherSignupPage";
import TeacherLoginPage from "./pages/teacher/auth/TeacherLoginPage";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/test",
        element: <AutheicatedNavbar />,
    },
    {
        path: "/teach",
        children: [
            {
                path: "/teach/login",
                element: <TeacherLoginPage />,
            },
            {
                path: "/teach/signup",
                element: <TeacherSignupPage/>
            }
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={appRouter} />
        </Provider>
    </StrictMode>
);
