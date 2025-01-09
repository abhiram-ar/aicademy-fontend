import apiSlice from "@/redux/features/api/apiSlice";

const teacherPayoutPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        isTeacherBankAccountVerified: builder.query({
            query: () => "/api/teacher/payout/verification",
            providesTags: ["teacherBankAccount"],
        }),
        createBankVerificationOrder: builder.mutation({
            query: () => ({
                url: "/api/teacher/payout/verification/create-order",
                method: "POST",
            }),
        }),
        verifyTeacherBankAccount: builder.mutation({
            query: (data) => ({
                url: "/api/teacher/payout/verification/verify",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["teacherBankAccount"],
        }),
    }),
});

export const {
    useCreateBankVerificationOrderMutation,
    useIsTeacherBankAccountVerifiedQuery,
    useVerifyTeacherBankAccountMutation,
} = teacherPayoutPageApiSlice;
