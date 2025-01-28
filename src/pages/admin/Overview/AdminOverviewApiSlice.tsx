import apiSlice from "@/redux/features/api/apiSlice";

const adminOverviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLastTwoMonthOverviewAdmin: builder.query({
            query: () => "/api/admin/dashboard/overview",
        }),
        getRevenueAndProfitData: builder.query({
            query: (data) => {
                const query = new URLSearchParams(data).toString();
                return `/api/admin/dashboard/revenue-profit?${query}`;
            },
        }),
        getUserCount: builder.query({
            query: () => "/api/admin/dashboard/user-count",
        }),
    }),
});

export const {
    useGetLastTwoMonthOverviewAdminQuery,
    useGetRevenueAndProfitDataQuery,
    useGetUserCountQuery,
} = adminOverviewApiSlice;
