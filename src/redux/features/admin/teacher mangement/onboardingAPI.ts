import apiSlice from "../../api/apiSlice";

const adminAuthAPIs = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOnbordPending: builder.query({
            query: () => "/api/admin/teacher/onboarding-list",
            providesTags: ["onboarding"],
        }),
        approveOnboarding: builder.mutation({
            query: (data) => ({
                url: "/api/admin/teacher/approve-onboarding",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["onboarding"]
        }),
        rejectOnboarding: builder.mutation({
            query: (data) => ({
                url: "/api/admin/teacher/reject-onboarding",
                method: "PATCH",
                body: data,
                
            }),
            invalidatesTags: ["onboarding"]
        }),
    }),
});

export const { useGetOnbordPendingQuery, useApproveOnboardingMutation, useRejectOnboardingMutation } = adminAuthAPIs;
