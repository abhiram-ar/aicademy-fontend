import apiSlice from "@/redux/features/api/apiSlice";

const adminRevenueApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminRevenueList: builder.query({
            query: (data) => {
                const query = new URLSearchParams(data).toString();
                return `/api/admin/revenue-list?${query}`;
            },
        }),
    }),
});

export const { useGetAdminRevenueListQuery } = adminRevenueApiSlice;
