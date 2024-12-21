import apiSlice from "../api/apiSlice";

const courseCreationsAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourseDraft: builder.mutation({
            query: (data) => ({
                url: "/api/course/create/draft",
                method: "POST",
                body: data,
            }),
        }),
        getDraftCourseList: builder.query({
            query: () => "/api/course/draft-list",
            providesTags: ["draftCourseList"],
        }),
        getFullCourseDetails: builder.query({
            query: (data) => ({
                url: `/api/course/full-details?courseId=${data.courseId}`,
            }),
        }),
    }),
});

export const {
    useCreateCourseDraftMutation,
    useGetDraftCourseListQuery,
    useGetFullCourseDetailsQuery,
} = courseCreationsAPI;
