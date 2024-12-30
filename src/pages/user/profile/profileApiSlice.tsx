import apiSlice from "@/redux/features/api/apiSlice";

const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => "/api/user/profile",
            providesTags: ["userDetails"],
        }),
        updateUserProfilePicture: builder.mutation({
            query: (data) => ({
                url: "/api/user/profilePic",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["userDetails"],
        }),
    }),
});

export const { useGetUserProfileQuery, useUpdateUserProfilePictureMutation } =
    profileApiSlice;
