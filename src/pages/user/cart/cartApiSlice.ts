import apiSlice from "@/redux/features/api/apiSlice";

const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => "/api/user/cart",
            providesTags: ["cart"],
            //Invalidate cache If necessary
        }),
        addToCart: builder.mutation({
            query: (data) => ({
                url: "/api/user/cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["cart"],
        }),
        removeFromCart: builder.mutation({
            query: (data) => ({
                url: "/api/user/cart",
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["cart"],
        }),
        createOrder: builder.mutation({
            query: () => ({
                url: "/api/user/checkout/create-order",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useCreateOrderMutation,
} = cartApiSlice;
