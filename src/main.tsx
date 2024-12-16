import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import TeacherSignupPage from "./pages/teacher/auth/TeacherSignupPage";
import TeacherLoginPage from "./pages/teacher/auth/TeacherLoginPage";
import Onboarding from "./pages/teacher/onboarding/OnboardingPage";
import OnboardingPage from "./pages/teacher/onboarding/OnboardingPage";
import App from "./App";
import {
    authLoader,
    fetchAccessTokenOnload,
} from "./utils/fetchAccessTokenOnLoad";

fetchAccessTokenOnload();
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
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
                path: "/teach",
                children: [
                    {
                        path: "/teach/login",
                        element: <TeacherLoginPage />,
                    },
                    {
                        path: "/teach/signup",
                        element: <TeacherSignupPage />,
                    },
                    {
                        path: "/teach/onboard",
                        loader: ()=>authLoader("teacher"),
                        hydrateFallbackElement: <p>loading...</p>,
                        element: <OnboardingPage />,
                    },
                ],
            },
        ],
    },
    {
        path: "/test",
        element: <Onboarding />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={appRouter} />
        </Provider>
    </StrictMode>
);
