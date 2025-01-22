import apiSlice from "@/redux/features/api/apiSlice";

const learnApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBoughtCourseContent: builder.query({
            query: (data) => `/api/user/course/list/${data}`,
        }),
    }),
});

export const { useGetBoughtCourseContentQuery } = learnApiSlice;
