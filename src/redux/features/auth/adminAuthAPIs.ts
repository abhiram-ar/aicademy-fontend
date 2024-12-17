import apiSlice from "../api/apiSlice";

const adminAuthAPIs = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: "/api/admin/auth/login",
                method: "POST",
                body: data,
            }),
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: "/api/admin/auth/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useAdminLoginMutation, useAdminLogoutMutation } = adminAuthAPIs;
