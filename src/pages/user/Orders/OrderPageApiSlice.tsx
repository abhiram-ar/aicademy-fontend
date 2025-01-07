import apiSlice from "@/redux/features/api/apiSlice";

const orderPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserPurchaseHistory: builder.query({
            query: () => "/api/user/order-history",
            providesTags: ["userBoughtCourseList"],
        }),
        getCourseReview: builder.query({
            query: (data) => {
                const query = new URLSearchParams(data);
                return `/api/user/course/review?${query}`;
            },
            providesTags: ["courseReview"],
        }),
        addCourseReview: builder.mutation({
            query: (data) => ({
                url: "/api/user/course/review",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["courseReview"],
        }),
        editCourseReview: builder.mutation({
            query: (data) => ({
                url: "/api/user/course/review",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["courseReview"],
        }),
    }),
});

export const {
    useGetUserPurchaseHistoryQuery,
    useGetCourseReviewQuery,
    useAddCourseReviewMutation,
    useEditCourseReviewMutation,
} = orderPageApiSlice;
