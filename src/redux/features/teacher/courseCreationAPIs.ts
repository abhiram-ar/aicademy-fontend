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
            query: () => "/api/course/draft-list"
        })
    }),
});

export const { useCreateCourseDraftMutation, useGetDraftCourseListQuery } = courseCreationsAPI;
