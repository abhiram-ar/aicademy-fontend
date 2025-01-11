import apiSlice from "@/redux/features/api/apiSlice";

const courseManagementApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourseOverviewReport: builder.query({
            query: (data) => {
                const query = new URLSearchParams(data).toString();
                return `/api/admin/course?${query}`;
            },
            providesTags: ["courseOverviewReportList"],
        }),
        // updateCourseReportStateAdmin: builder.mutation({
        //     query: (data) => ({
        //         url: "/api/admin/user/course/report/status",
        //         method: "PATCH",
        //         body: data,
        //         // keepalive: false,
        //     }),
        //     invalidatesTags: ["courseReportList"],
        // }),
    }),
});

export const { useGetAllCourseOverviewReportQuery } = courseManagementApiSlice;
