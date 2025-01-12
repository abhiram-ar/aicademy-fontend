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
        updateCourseStateAdmin: builder.mutation({
            query: (data) => ({
                url: "/api/admin/course/state",
                method: "PATCH",
                body: data,
                // keepalive: false,
            }),
            invalidatesTags: ["courseOverviewReportList"],
        }),
    }),
});

export const {
    useGetAllCourseOverviewReportQuery,
    useUpdateCourseStateAdminMutation,
} = courseManagementApiSlice;
