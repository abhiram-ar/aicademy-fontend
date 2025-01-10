import apiSlice from "@/redux/features/api/apiSlice";

const adminOverviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLastTwoMonthOverviewAdmin: builder.query({
            query: () => "/api/admin/dashboard/overview",
        }),
        updateCourseReportStateAdmin: builder.mutation({
            query: (data) => ({
                url: "/api/admin/user/course/report/status",
                method: "PATCH",
                body: data,
                // keepalive: false,
            }),
            invalidatesTags: ["courseReportList"],
        }),
    }),
});

export const { useGetLastTwoMonthOverviewAdminQuery } = adminOverviewApiSlice;
