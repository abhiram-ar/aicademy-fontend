import apiSlice from "../api/apiSlice";

const teacherAuthApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        teacherRegister: builder.mutation({
            query: (data) => ({
                url: "/api/teacher/auth/register",
                method: "POST",
                body: data,
            }),
        }),
        teacherVerify: builder.mutation({
            query: (data) => ({
                url: "/api/teacher/auth/activate",
                method: "POST",
                body: data,
            }),
        }),
        teacherLogin: builder.mutation({
            query: (data) => ({
                url: "/api/teacher/auth/login",
                method: "POST",
                body: data,
            }),
        }),
        teacherLogout: builder.mutation({
            query: () => ({
                url: "/api/teacher/auth/logout",
                method: "POST",
            }),
        }),
        teacherOnboarding: builder.mutation({
            query: (data) => ({
                url: "/api/teacher/onboard",
                method: "POST",
                body: data,
            }),
        }),
        teacherProfile: builder.query({
            query: () => "/api/teacher/profile",
        }),
    }),
});

export const {
    useTeacherRegisterMutation,
    useTeacherVerifyMutation,
    useTeacherLoginMutation,
    useTeacherOnboardingMutation,
    useTeacherLogoutMutation,
    useTeacherProfileQuery,
} = teacherAuthApi;
