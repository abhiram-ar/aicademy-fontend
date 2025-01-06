import apiSlice from "@/redux/features/api/apiSlice";

const myLearningPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserBoughtCourseList: builder.query({
            query: () => "/api/user/course/list",
            providesTags: ["userBoughtCourseList"],
        }),
    }),
});

export const { useGetUserBoughtCourseListQuery } = myLearningPageApiSlice;
