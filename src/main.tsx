import React, { lazy, ReactNode, Suspense } from "react";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import StandardLayout from "./layout/StandardLayout";
import LayoutWithMinimalNav from "./layout/LayoutWithMinimalNav";
import { authLoader, fetchAccessTokenOnload } from "./utils/fetchAccessTokenOnLoad";
import LandingPage from "./pages/landing/LandingPage";

// lazy load
const LoginPage = lazy(() => import("./pages/user/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/user/auth/SignupPage"));
const ExplorePage = lazy(() => import("./pages/user/explore/ExplorePage"));
const FullCouseDetalsPage = lazy(
  () => import("./pages/user/fullCourseDetails/FullCouseDetalsPage")
);
const CartPage = lazy(() => import("./pages/user/cart/CartPage"));
const LearnPage = lazy(() => import("./pages/user/Learn/LearnPage"));
const UserProfileLayout = lazy(() => import("./pages/user/profile/UserProfileLayout"));
const ProfileOutlet = lazy(() => import("./pages/user/profile/ProfileOutlet"));
const ChangePasswordOutlet = lazy(() => import("./pages/user/profile/ChangePasswordOutlet"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ForgotPassowordPageUser = lazy(() => import("./pages/user/auth/ForgotPassowordPageUser"));
const MyLearning = lazy(() => import("./pages/user/myLearning/MyLearning"));
const ReportCourseIssue = lazy(() => import("./pages/user/Help/ReportCourseIssue"));
const OrdersPage = lazy(() => import("./pages/user/Orders/OrdersPage"));

import TeacherSignupPage from "./pages/teacher/auth/TeacherSignupPage";
import TeacherLoginPage from "./pages/teacher/auth/TeacherLoginPage";
import OnboardingPage from "./pages/teacher/onboarding/OnboardingPage";
import TeacherOnboadingPage from "./pages/admin/Teacher mangement/TeacherOnboarding/TeacherOnboadingPage";
import CreateCoursePage from "./pages/teacher/dashboard/create-course/CreateDraftPage";
import CourseDetailsOutlet from "./pages/teacher/dashboard/create-course/basic details/CourseDetailsOutlet";
import CourseStrucureOutlet from "./pages/teacher/dashboard/create-course/CourseStrucureOutlet";
import CourseAssetsOutlet from "./pages/teacher/dashboard/create-course/course-assets/CourseAssetsOutlet";
import PublishOutlet from "./pages/teacher/dashboard/create-course/PublishOutlet";
import TeacherDashboard from "./pages/teacher/dashboard/Layout";
import CourseDraft from "./pages/teacher/dashboard/create-course/CourseDraft";
import TeacherDashboardOverview from "./pages/teacher/dashboard/overview/TeacherDashboardOverviewPage";
import PayoutPage from "./pages/teacher/dashboard/payout/PayoutPage";

import AdminLoginPage from "./pages/admin/AminLoginPage";
import AdminDashBoardHomePage from "./pages/admin/AdminDashBoardHomePage";
import UserManagementPage from "./pages/admin/user/user-management/UserManagementPage";
import CouponManagementPage from "./pages/admin/course/coupon/CouponManagementPage";
import UserCourseReportPage from "./pages/admin/user/course-reports/UserCourseReportPage";
import AdminOverviewPage from "./pages/admin/Overview/AdminOverviewPage";
import AdminRevenuePage from "./pages/admin/Revenue/RevenuePage";
import TeacherPayoutApprovalPage from "./pages/admin/Teacher mangement/Payout/TeacherPayoutApprovalPage";
import CourseManagementPage from "./pages/admin/course/courseManagement/CourseManagementPage";
import { HashLoader } from "react-spinners";

const WrappinSuspense = (component: ReactNode) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <HashLoader></HashLoader>
        </div>
      }
    >
      {component}
    </Suspense>
  );
};

fetchAccessTokenOnload();
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <StandardLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "/explore",
            element: WrappinSuspense(<ExplorePage />),
          },
          {
            path: "/explore/course/:id",
            element: WrappinSuspense(<FullCouseDetalsPage />),
          },
        ],
      },
      {
        path: "/",
        element: <LayoutWithMinimalNav />,
        children: [
          {
            path: "/login",
            element: WrappinSuspense(<LoginPage />),
          },
          {
            path: "/signup",
            element: WrappinSuspense(<SignupPage />),
          },
          {
            path: "/user/forgotPassword",
            element: WrappinSuspense(<ForgotPassowordPageUser />),
          },
          {
            path: "/reset-password",
            element: WrappinSuspense(<ResetPasswordPage />),
          },
        ],
      },
      {
        path: "/user",
        loader: () => authLoader("user"),
        hydrateFallbackElement: <p>loading...</p>,
        element: <StandardLayout />,
        children: [
          {
            path: "/user/cart",
            element: WrappinSuspense(<CartPage />),
          },
          {
            path: "/user/my-learning",
            element: WrappinSuspense(<MyLearning />),
          },
          {
            path: "/user/help",
            element: WrappinSuspense(<ReportCourseIssue />),
          },
          {
            path: "/user/orders",
            element: WrappinSuspense(<OrdersPage />),
          },
        ],
      },
      {
        path: "/user",
        loader: () => authLoader("user"),
        hydrateFallbackElement: <p>loading...</p>,
        element: WrappinSuspense(<UserProfileLayout />),
        children: [
          { index: true, element: <ProfileOutlet /> },
          {
            path: "/user/profile",
            element: WrappinSuspense(<ProfileOutlet />),
          },
          {
            path: "/user/changePassword",
            element: WrappinSuspense(<ChangePasswordOutlet />),
          },
          {
            path: "/user/cart",
            element: WrappinSuspense(<CartPage />),
          },
          {
            path: "/user/my-learning",
            element: WrappinSuspense(<MyLearning />),
          },
        ],
      },
      {
        path: "/user/learn/:courseId",
        loader: () => authLoader("user"),
        hydrateFallbackElement: <p>loading...</p>,
        element: WrappinSuspense(<LearnPage />),
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
                path: "/teach/payout",
                element: <PayoutPage />,
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
                index: true,
                element: <AdminOverviewPage />,
              },
              {
                path: "/admin/dashboard/revenue",
                element: <AdminRevenuePage />,
              },
              {
                path: "/admin/dashboard/teacher/onboard",
                element: <TeacherOnboadingPage />,
              },
              {
                path: "/admin/dashboard/teacher/payout",
                element: <TeacherPayoutApprovalPage />,
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
              {
                path: "/admin/dashboard/course/management",
                element: <CourseManagementPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
  // </StrictMode>
);
