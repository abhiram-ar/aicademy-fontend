import apiSlice from "@/redux/features/api/apiSlice";

const adminUserManagementApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetailsAdminUserManagement: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams(params).toString();
                console.log(queryParams);
                return `/api/admin/user/list?${queryParams}`;
            },
            //Invalidate cache If necessary
        }),
    }),
});

export const { useGetUserDetailsAdminUserManagementQuery } =
    adminUserManagementApiSlice;
