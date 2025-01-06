import apiSlice from "@/redux/features/api/apiSlice";

const orderPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserPurchaseHistory: builder.query({
            query: () => "/api/user/order-history",
            providesTags: ["userBoughtCourseList"],
        }),
    }),
});

export const { useGetUserPurchaseHistoryQuery } = orderPageApiSlice;
