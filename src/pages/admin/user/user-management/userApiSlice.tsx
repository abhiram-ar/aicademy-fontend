import apiSlice from "@/redux/features/api/apiSlice";

const adminUserManagementApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetailsAdminUserManagement: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams(params).toString();
                console.log(queryParams);
                return `/api/admin/user/list?${queryParams}`;
            },
            providesTags: ["userList"],
            //Invalidate cache If necessary
        }),
        blockUserAdminUserManagement: builder.mutation({
            query: (data) => ({
                url: "/api/admin/user/block",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["userList"],
        }),
        unBlockUserAdminUserManagement: builder.mutation({
            query: (data) => ({
                url: "/api/admin/user/unblock",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["userList"],
        }),
    }),
});

export const {
    useGetUserDetailsAdminUserManagementQuery,
    useBlockUserAdminUserManagementMutation,
    useUnBlockUserAdminUserManagementMutation,
} = adminUserManagementApiSlice;
