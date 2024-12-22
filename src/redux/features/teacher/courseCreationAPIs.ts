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
            providesTags: ["draftCourseDetails"],
            keepUnusedDataFor: 0
        }),
        updateBasisCourseDetails: builder.mutation({
            query: (data) => ({
                url: "/api/course/draft/basic-info",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["draftCourseDetails", "draftCourseList"]
        }),
    }),
});

export const {
    useCreateCourseDraftMutation,
    useGetDraftCourseListQuery,
    useGetFullCourseDetailsQuery,
    useUpdateBasisCourseDetailsMutation,
} = courseCreationsAPI;
