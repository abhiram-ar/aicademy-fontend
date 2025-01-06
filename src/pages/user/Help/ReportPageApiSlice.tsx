import apiSlice from "@/redux/features/api/apiSlice";

const reportPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        reportCourse: builder.mutation({
            query: (data) => ({
                url: "/api/user/course/report",
                method: "POST",
                body: data,
            }),
            //Invalidate cache If necessary
        }),
    }),
});

export const { useReportCourseMutation } = reportPageApiSlice;
