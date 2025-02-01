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
        removeCartLock: builder.mutation({
            query: () => ({
                url: "/api/user/checkout/clear-cart-state",
                method: "POST",
            }),
            invalidatesTags: ["cart"],
        }),
        verifyPaymentandCheckout: builder.mutation({
            query: (data) => ({
                url: "/api/user/checkout/verify-payment",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["cart", "userBoughtCourseList"], //invalidte course detalis if necessaary
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
        moveToWishlist: builder.mutation({
            query: (data) => ({
                url: "/api/user/cart/move-to-wishlist",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["cart", "wishlist"],
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
    useMoveToWishlistMutation,
    useRemoveCartLockMutation,
} = cartApiSlice;
