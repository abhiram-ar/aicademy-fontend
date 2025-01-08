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
import CartPage from "./pages/user/cart/CartPage";
import UserProfileLayout from "./pages/user/profile/UserProfileLayout";
import ProfileOutlet from "./pages/user/profile/ProfileOutlet";
import ChangePasswordOutlet from "./pages/user/profile/ChangePasswordOutlet";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UserManagementPage from "./pages/admin/user/user-management/UserManagementPage";
import ForgotPassowordPageUser from "./pages/user/auth/ForgotPassowordPageUser";
import CouponManagementPage from "./pages/admin/course/coupon/CouponManagementPage";
import MyLearning from "./pages/user/myLearning/MyLearning";
import ReportCourseIssue from "./pages/user/Help/ReportCourseIssue";
import UserCourseReportPage from "./pages/admin/user/course-reports/UserCourseReportPage";
import OrdersPage from "./pages/user/Orders/OrdersPage";
import TeacherDashboardOverview from "./pages/teacher/dashboard/overview/TeacherDashboardOverviewPage";

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
                path: "/user/forgotPassword",
                element: <ForgotPassowordPageUser />,
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
                path: "/reset-password",
                element: <ResetPasswordPage />,
            },
            {
                path: "/user",
                loader: () => authLoader("user"),
                hydrateFallbackElement: <p>loading...</p>,
                children: [
                    {
                        path: "/user/cart",
                        element: <CartPage />,
                    },
                    {
                        path: "/user/my-learning",
                        element: <MyLearning />,
                    },
                    {
                        path: "/user/help",
                        element: <ReportCourseIssue />,
                    },
                    {
                        path: "/user/orders",
                        element: <OrdersPage />,
                    },
                ],
            },
            {
                path: "/user",
                loader: () => authLoader("user"),
                hydrateFallbackElement: <p>loading...</p>,
                element: <UserProfileLayout />,
                children: [
                    { index: true, element: <ProfileOutlet /> },
                    { path: "/user/profile", element: <ProfileOutlet /> },
                    {
                        path: "/user/changePassword",
                        element: <ChangePasswordOutlet />,
                    },
                    {
                        path: "/user/cart",
                        element: <CartPage />,
                    },
                    {
                        path: "/user/my-learning",
                        element: <MyLearning />,
                    },
                ],
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
                                index: true,
                                element: <TeacherDashboardOverview />,
                            },
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
                            {
                                path: "/admin/dashboard/user/management",
                                element: <UserManagementPage />,
                            },
                            {
                                path: "/admin/dashboard/user/reports",
                                element: <UserCourseReportPage />,
                            },
                            {
                                path: "/admin/dashboard/course/coupon",
                                element: <CouponManagementPage />,
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
