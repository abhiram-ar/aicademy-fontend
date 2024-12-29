import apiSlice from "@/redux/features/api/apiSlice";

const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => "/api/user/cart",
            //Invalidate cache If necessary
        }),
    }),
});

export const { useGetCartQuery } = cartApiSlice;
