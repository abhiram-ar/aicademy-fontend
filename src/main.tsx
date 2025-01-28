// import { StrictMode } from "react";
import { lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import StandardLayout from "./layout/StandardLayout";
import LayoutWithMinimalNav from "./layout/LayoutWithMinimalNav";
import { authLoader, fetchAccessTokenOnload } from "./utils/fetchAccessTokenOnLoad";
import LandingPage from "./pages/landing/LandingPage";
import { HashLoader } from "react-spinners";
import { WrappinSuspense } from "./utils/wrapinSuspense";

// lazy load
const LoginPage = lazy(() => import("./pages/user/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/user/auth/SignupPage"));
const ExplorePage = lazy(() => import("./pages/user/explore/ExplorePage"));
const FullCouseDetalsPage = lazy(() => import("./pages/user/fullCourseDetails/FullCouseDetalsPage"));
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

const TeacherSignupPage = lazy(() => import("./pages/teacher/auth/TeacherSignupPage"));
const TeacherLoginPage = lazy(() => import("./pages/teacher/auth/TeacherLoginPage"));
const OnboardingPage = lazy(() => import("./pages/teacher/onboarding/OnboardingPage"));
const TeacherOnboadingPage = lazy(() => import("./pages/admin/Teacher mangement/TeacherOnboarding/TeacherOnboadingPage"));
const CreateCoursePage = lazy(() => import("./pages/teacher/dashboard/create-course/CreateDraftPage"));
const CourseDetailsOutlet = lazy(() => import("./pages/teacher/dashboard/create-course/basic details/CourseDetailsOutlet"));
const CourseStrucureOutlet = lazy(() => import("./pages/teacher/dashboard/create-course/CourseStrucureOutlet"));
const CourseAssetsOutlet = lazy(() => import("./pages/teacher/dashboard/create-course/course-assets/CourseAssetsOutlet"));
const PublishOutlet = lazy(() => import("./pages/teacher/dashboard/create-course/PublishOutlet"));
const TeacherDashboard = lazy(() => import("./pages/teacher/dashboard/Layout"));
const CourseDraft = lazy(() => import("./pages/teacher/dashboard/create-course/CourseDraft"));
const TeacherDashboardOverview = lazy(() => import("./pages/teacher/dashboard/overview/TeacherDashboardOverviewPage"));
const PayoutPage = lazy(() => import("./pages/teacher/dashboard/payout/PayoutPage"));

const AdminLoginPage = lazy(() => import("./pages/admin/AminLoginPage"));
const AdminDashBoardHomePage = lazy(() => import("./pages/admin/AdminDashBoardHomePage"));
const UserManagementPage = lazy(() => import("./pages/admin/user/user-management/UserManagementPage"));
const CouponManagementPage = lazy(() => import("./pages/admin/course/coupon/CouponManagementPage"));
const UserCourseReportPage = lazy(() => import("./pages/admin/user/course-reports/UserCourseReportPage"));
const AdminOverviewPage = lazy(() => import("./pages/admin/Overview/AdminOverviewPage"));
const AdminRevenuePage = lazy(() => import("./pages/admin/Revenue/RevenuePage"));
const TeacherPayoutApprovalPage = lazy(() => import("./pages/admin/Teacher mangement/Payout/TeacherPayoutApprovalPage"));
const CourseManagementPage = lazy(() => import("./pages/admin/course/courseManagement/CourseManagementPage"));

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
        hydrateFallbackElement: (
          <div className="w-full h-screen flex justify-center items-center">
            <HashLoader></HashLoader>
          </div>
        ),
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
        hydrateFallbackElement: (
          <div className="w-full h-screen flex justify-center items-center">
            <HashLoader></HashLoader>
          </div>
        ),
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
        hydrateFallbackElement: (
          <div className="w-full h-screen flex justify-center items-center">
            <HashLoader></HashLoader>
          </div>
        ),
        element: WrappinSuspense(<LearnPage />),
      },
      {
        path: "/teach",
        children: [
          {
            path: "/teach",
            loader: () => authLoader("teacher"),
            hydrateFallbackElement: (
              <div className="w-full h-screen flex justify-center items-center">
                <HashLoader></HashLoader>
              </div>
            ),
            element: WrappinSuspense(<TeacherDashboard />),
            children: [
              {
                index: true,
                element: WrappinSuspense(<TeacherDashboardOverview />),
              },
              {
                path: "/teach/payout",
                element: WrappinSuspense(<PayoutPage />),
              },
              {
                path: "/teach/course/create",
                element: WrappinSuspense(<CreateCoursePage />),
              },
              {
                path: "/teach/course/draft/:id",
                element: WrappinSuspense(<CourseDraft />),
                children: [
                  {
                    index: true,
                    element: WrappinSuspense(<CourseDetailsOutlet />),
                  },
                  {
                    path: "details",
                    element: WrappinSuspense(<CourseDetailsOutlet />),
                  },
                  {
                    path: "structure",
                    element: WrappinSuspense(<CourseStrucureOutlet />),
                  },
                  {
                    path: "assets",
                    element: WrappinSuspense(<CourseAssetsOutlet />),
                  },
                  {
                    path: "publish",
                    element: WrappinSuspense(<PublishOutlet />),
                  },
                ],
              },
            ],
          },
          {
            path: "/teach/login",
            element: WrappinSuspense(<TeacherLoginPage />),
          },
          {
            path: "/teach/signup",
            element: WrappinSuspense(<TeacherSignupPage />),
          },
          {
            path: "/teach/onboard",
            loader: () => authLoader("teacher"),
            hydrateFallbackElement: (
              <div className="w-full h-screen flex justify-center items-center">
                <HashLoader></HashLoader>
              </div>
            ),
            element: WrappinSuspense(<OnboardingPage />),
          },
        ],
      },
      {
        path: "/admin",
        children: [
          {
            path: "/admin/login",
            element: WrappinSuspense(<AdminLoginPage />),
          },
          {
            path: "/admin/dashboard",
            loader: () => authLoader("admin"),
            hydrateFallbackElement: <p>loading...</p>,
            element: WrappinSuspense(<AdminDashBoardHomePage />),
            children: [
              {
                index: true,
                element: WrappinSuspense(<AdminOverviewPage />),
              },
              {
                path: "/admin/dashboard/revenue",
                element: WrappinSuspense(<AdminRevenuePage />),
              },
              {
                path: "/admin/dashboard/teacher/onboard",
                element: WrappinSuspense(<TeacherOnboadingPage />),
              },
              {
                path: "/admin/dashboard/teacher/payout",
                element: WrappinSuspense(<TeacherPayoutApprovalPage />),
              },
              {
                path: "/admin/dashboard/user/management",
                element: WrappinSuspense(<UserManagementPage />),
              },
              {
                path: "/admin/dashboard/user/reports",
                element: WrappinSuspense(<UserCourseReportPage />),
              },
              {
                path: "/admin/dashboard/course/coupon",
                element: WrappinSuspense(<CouponManagementPage />),
              },
              {
                path: "/admin/dashboard/course/management",
                element: WrappinSuspense(<CourseManagementPage />),
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
