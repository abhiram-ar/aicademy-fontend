import apiSlice from "@/redux/features/api/apiSlice";

const adminTeacherPayoutPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeacherPayoutListAdmin: builder.query({
            query: (data) => {
                const query = new URLSearchParams(data).toString();
                return `/api/admin/teacher/payout-list?${query}`;
            },
            providesTags: ["teacherPayout"],
        }),

        updatePayoutApprovalState: builder.mutation({
            query: (data) => ({
                url: "/api/admin/teacher/payout/approval",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["teacherPayout"],
        }),
    }),
});

export const {
    useGetTeacherPayoutListAdminQuery,
    useUpdatePayoutApprovalStateMutation,
} = adminTeacherPayoutPageApiSlice;
