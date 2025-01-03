import apiSlice from "@/redux/features/api/apiSlice";

const couponManagementApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCouponList: builder.query({
            query: (data) => {
                const query = new URLSearchParams(data).toString();
                return `/api/admin/course/coupon?${query}`;
            },
        }),
        createCouponAdmin: builder.mutation({
            query: (data) => ({
                url: "/api/admin/course/coupon",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetCouponListQuery, useCreateCouponAdminMutation } =
    couponManagementApiSlice;
