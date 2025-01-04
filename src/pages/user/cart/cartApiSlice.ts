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
        verifyPaymentandCheckout: builder.mutation({
            query: (data) => ({
                url: "/api/user/checkout/verify-payment",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["cart"], //invalidte course detalis if necessaary
        }),
        applyCoupon: builder.mutation({
            query: (data) => ({
                url: "/api/user/cart/apply-coupon",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["cart"],
        }),
        removeCouponFromCart: builder.mutation({
            query: () => ({
                url: "/api/user/cart/remove-coupon",
                method: "PATCH",
            }),
            invalidatesTags: ["cart"],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useCreateOrderMutation,
    useVerifyPaymentandCheckoutMutation,
    useApplyCouponMutation,
    useRemoveCouponFromCartMutation,
} = cartApiSlice;
