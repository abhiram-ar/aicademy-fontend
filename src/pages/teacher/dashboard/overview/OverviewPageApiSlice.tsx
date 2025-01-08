import apiSlice from "@/redux/features/api/apiSlice";

const teacherOverviewPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRevenuelastTwoMonth: builder.query({
            query: () => "/api/teacher/dashboard/revenue",
            providesTags: ["teacherDashboard"],
        }),
        getPurchaselastTwoMonth: builder.query({
            query: () => "/api/teacher/dashboard/purchase",
            providesTags: ["teacherDashboard"],
        }),
        getLifetimeEarning: builder.query({
            query: () => "/api/teacher/dashboard/lifetime-earning",
            providesTags: ["teacherDashboard"],
        }),
        getEarningsByMonth: builder.query({
            query: (data) => {
                const query = new URLSearchParams(data);
                return `/api/teacher/dashboard/earning/monthly?${query}`;
            },
            providesTags: ["teacherDashboard"],
        }),
        getCourseSalesList: builder.query({
            query: (data) => {
                const query = new URLSearchParams(data);
                return `/api/teacher/dashboard/sales-list?${query}`;
            },
            providesTags: ["teacherDashboard"],
        }),
    }),
});

export const {
    useGetRevenuelastTwoMonthQuery,
    useGetPurchaselastTwoMonthQuery,
    useGetLifetimeEarningQuery,
    useGetEarningsByMonthQuery,
    useGetCourseSalesListQuery,
} = teacherOverviewPageApiSlice;
