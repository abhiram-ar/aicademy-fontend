import apiSlice from "../api/apiSlice";

const courseCreationsAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourseDraft: builder.mutation({
            query: (data) => ({
                url: "/api/course/create/draft",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["draftCourseList"],
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
            keepUnusedDataFor: 0,
        }),
        updateBasisCourseDetails: builder.mutation({
            query: (data) => ({
                url: "/api/course/draft/basic-info",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["draftCourseDetails", "draftCourseList"],
        }),
        updateThumnail: builder.mutation({
            query: (data) => ({
                url: "/api/course/draft/thumbnail",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["draftCourseDetails"],
        }),
        saveUploadedVideoMetada: builder.mutation({
            query: (data) => ({
                url: "/api/course/upload/save-metadata",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["draftCourseContent"],
        }),
        getAllCourseVideos: builder.query({
            query: (data) => ({
                url: `/api/course/draft/videos?courseId=${data.courseId}`,
            }),
            providesTags: ["draftCourseContent"],
            keepUnusedDataFor: 10,
        }),
        updateCouseStructure: builder.mutation({
            query: (data: { courseId: string; chapters: object }) => ({
                url: "/api/course/draft/structure",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["draftCourseDetails"],
        }),
        publishCourse: builder.mutation({
            query: (data) => ({
                url: "/api/course/publish",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["draftCourseList", "fullcourseDetailsPublic"],
        }),
        unPublishCourse: builder.mutation({
            query: (data) => ({
                url: "/api/course/unpublish",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["draftCourseList", "fullcourseDetailsPublic"],
        }),
    }),
});

export const {
    useCreateCourseDraftMutation,
    useGetDraftCourseListQuery,
    useGetFullCourseDetailsQuery,
    useUpdateBasisCourseDetailsMutation,
    useUpdateThumnailMutation,
    useSaveUploadedVideoMetadaMutation,
    useGetAllCourseVideosQuery,
    useUpdateCouseStructureMutation,
    usePublishCourseMutation,
    useUnPublishCourseMutation,
} = courseCreationsAPI;
