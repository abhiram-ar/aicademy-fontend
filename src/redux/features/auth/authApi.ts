import apiSlice from "./../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/api/user/auth/register",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useRegisterMutation } = authApi;
