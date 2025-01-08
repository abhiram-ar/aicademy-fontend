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
    }),
});

export const {
    useGetRevenuelastTwoMonthQuery,
    useGetPurchaselastTwoMonthQuery,
    useGetLifetimeEarningQuery,
} = teacherOverviewPageApiSlice;
