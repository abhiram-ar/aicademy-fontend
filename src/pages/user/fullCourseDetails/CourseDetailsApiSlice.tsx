import apiSlice from "@/redux/features/api/apiSlice";

const courseDetailsPageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFullCoursePublicDetails: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams(params).toString();
                console.log(queryParams);
                return `/api/course/details?${queryParams}`;
            },
            //Invalidate cache If necessary
        }),
    }),
});

export const { useGetFullCoursePublicDetailsQuery } = courseDetailsPageApiSlice;
