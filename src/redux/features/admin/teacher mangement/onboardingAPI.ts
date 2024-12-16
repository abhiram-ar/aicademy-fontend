import apiSlice from "../../api/apiSlice";

const adminAuthAPIs = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOnbordPending: builder.query({
            query: () => "/api/admin/teacher/onboarding-list",
            providesTags: ["onboarding"],
        }),
    }),
});

export const { useGetOnbordPendingQuery } = adminAuthAPIs;
