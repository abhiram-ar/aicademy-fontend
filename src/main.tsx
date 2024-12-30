import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./pages/user/auth/LoginPage";
import SignupPage from "./pages/user/auth/SignupPage";
import LandingPage from "./pages/landing/LandingPage";
import TeacherSignupPage from "./pages/teacher/auth/TeacherSignupPage";
import TeacherLoginPage from "./pages/teacher/auth/TeacherLoginPage";
import OnboardingPage from "./pages/teacher/onboarding/OnboardingPage";
import App from "./App";
import {
    authLoader,
    fetchAccessTokenOnload,
} from "./utils/fetchAccessTokenOnLoad";
import AdminLoginPage from "./pages/admin/AminLoginPage";
import AdminDashBoardHomePage from "./pages/admin/AdminDashBoardHomePage";
import TeacherOnboadingPage from "./pages/admin/Teacher mangement/TeacherOnboadingPage";
import Page from "./pages/teacher/dashboard/Layout";
import TeacherDashboard from "./pages/teacher/dashboard/Layout";
import CreateCoursePage from "./pages/teacher/dashboard/create-course/CreateDraftPage";
import CourseDraft from "./pages/teacher/dashboard/create-course/CourseDraft";
import CourseDetailsOutlet from "./pages/teacher/dashboard/create-course/basic details/CourseDetailsOutlet";
import CourseStrucureOutlet from "./pages/teacher/dashboard/create-course/CourseStrucureOutlet";
import CourseAssetsOutlet from "./pages/teacher/dashboard/create-course/course-assets/CourseAssetsOutlet";
import PublishOutlet from "./pages/teacher/dashboard/create-course/PublishOutlet";
import ExplorePage from "./pages/user/explore/ExplorePage";
import FullCouseDetalsPage from "./pages/user/fullCourseDetails/FullCouseDetalsPage";

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
                path: "/explore",
                element: <ExplorePage />,
            },
            {
                path: "/explore/course/:id",
                element: <FullCouseDetalsPage />,
            },
            {
                path: "/teach",
                children: [
                    {
                        path: "/teach",
                        loader: () => authLoader("teacher"),
                        hydrateFallbackElement: <p>loading...</p>,
                        element: <TeacherDashboard />,
                        children: [
                            {
                                path: "/teach/course/create",
                                element: <CreateCoursePage />,
                            },
                            {
                                path: "/teach/course/draft/:id",
                                element: <CourseDraft />,
                                children: [
                                    {
                                        index: true,
                                        element: <CourseDetailsOutlet />,
                                    },
                                    {
                                        path: "details",
                                        element: <CourseDetailsOutlet />,
                                    },
                                    {
                                        path: "structure",
                                        element: <CourseStrucureOutlet />,
                                    },
                                    {
                                        path: "assets",
                                        element: <CourseAssetsOutlet />,
                                    },
                                    {
                                        path: "publish",
                                        element: <PublishOutlet />,
                                    },
                                ],
                            },
                        ],
                    },
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
                        loader: () => authLoader("teacher"),
                        hydrateFallbackElement: <p>loading...</p>,
                        element: <OnboardingPage />,
                    },
                ],
            },
            {
                path: "/admin",
                children: [
                    {
                        path: "/admin/login",
                        element: <AdminLoginPage />,
                    },
                    {
                        path: "/admin/dashboard",
                        loader: () => authLoader("admin"),
                        hydrateFallbackElement: <p>loading...</p>,
                        element: <AdminDashBoardHomePage />,
                        children: [
                            {
                                path: "/admin/dashboard/onboard",
                                element: <TeacherOnboadingPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "/test",
        element: <Page />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={appRouter} />
        </Provider>
    </StrictMode>
);
