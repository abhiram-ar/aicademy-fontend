import apiSlice from "@/redux/features/api/apiSlice";

const teacherPayoutPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRevenuelastTwoMonth: builder.query({
            query: () => "/api/teacher/dashboard/revenue",
            providesTags: ["teacherDashboard"],
        }),
        createBankVerificationOrder: builder.mutation({
            query: () => ({
                url: "/api/teacher/payout/verification/create-order",
                method: "POST",
            }),
        }),
    }),
});

export const { useCreateBankVerificationOrderMutation } =
    teacherPayoutPageApiSlice;
