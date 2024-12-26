import apiSlice from "@/redux/features/api/apiSlice";

const explorePageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoursesCardDetails: builder.query({
            query: () => {
                return `/api/course/list`;
            },
        }),
    }),
});

export const { useGetCoursesCardDetailsQuery } = explorePageApiSlice;
