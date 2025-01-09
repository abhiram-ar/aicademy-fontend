import apiSlice from "@/redux/features/api/apiSlice";

const teacherPayoutPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWithdawableAmountandTotalCashedout: builder.query({
            query: () => "/api/teacher/withdrawable-amount",
            providesTags: ["teacherPayout"],
        }),

        isTeacherBankAccountVerified: builder.query({
            query: () => "/api/teacher/payout/verification/isVerified",
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
        teacherPayoutHistoryList: builder.query({
            query: () => "/api/teacher/payout/history",
            providesTags: ["teacherPayout"],
        }),
    }),
});

export const {
    useGetWithdawableAmountandTotalCashedoutQuery,
    useCreateBankVerificationOrderMutation,
    useIsTeacherBankAccountVerifiedQuery,
    useVerifyTeacherBankAccountMutation,
    useTeacherPayoutHistoryListQuery,
} = teacherPayoutPageApiSlice;
