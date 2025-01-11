import apiSlice from "@/redux/features/api/apiSlice";

const courseReportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseReportList: builder.query({
            query: (data) => {
                const query = new URLSearchParams(data).toString();
                return `/api/admin/user/course/reports?${query}`;
            },
            providesTags: ["courseReportList"],
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

export const {
    useGetCourseReportListQuery,
    useUpdateCourseReportStateAdminMutation,
} = courseReportsApiSlice;
