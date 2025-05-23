import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/api/user/auth/register",
                method: "POST",
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/api/user/auth/login",
                method: "POST",
                body: data,
            }),
        }),
        verify: builder.mutation({
            query: (data) => ({
                url: "/api/user/auth/activate",
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/api/user/auth/logout",
                method: "POST",
            }),
        }),
        forgotUserPasword: builder.mutation({
            query: (data) => ({
                url: "/api/user/auth/forgotPassword",
                method: "POST",
                body: data,
            }),
        }),
        resetUserPasword: builder.mutation({
            query: (data) => ({
                url: "/api/user/auth/resetPassword",
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useVerifyMutation,
    useLogoutMutation,
    useForgotUserPaswordMutation,
    useResetUserPaswordMutation,
} = authApi;
