import apiSlice from "@/redux/features/api/apiSlice";

const wishlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: () => "/api/user/wishlist",
            providesTags: ["wishlist"],
            //Invalidate cache If necessary
        }),
        addToWishlist: builder.mutation({
            query: (data) => ({
                url: "/api/user/wishlist",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["wishlist"],
        }),
        removeFromWishlist: builder.mutation({
            query: (data) => ({
                url: "/api/user/wishlist",
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["wishlist"],
        }),
        moveToCart: builder.mutation({
            query: (data) => ({
                url: "/api/user/wishlist/move-to-cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["wishlist", "cart"],
        }),
    }),
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
    useMoveToCartMutation,
} = wishlistApiSlice;
