import apiSlice from "@/redux/features/api/apiSlice";

const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => "/api/user/profile",
            providesTags: ["userDetails"],
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: "/api/user/profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["userDetails"],
        }),

        updateUserProfilePicture: builder.mutation({
            query: (data) => ({
                url: "/api/user/profilePic",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["userDetails"],
        }),
        changeUserPassword: builder.mutation({
            query: (data) => ({
                url: "/api/user/password",
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useUpdateUserProfilePictureMutation,
    useUpdateUserProfileMutation,
    useChangeUserPasswordMutation,
} = profileApiSlice;
