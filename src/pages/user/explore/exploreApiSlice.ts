import apiSlice from "@/redux/features/api/apiSlice";

const explorePageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoursesCardDetails: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams(params).toString()
                console.log(queryParams);
                return `/api/course/list?${queryParams}`;
            },
        }),
    }),
});

export const { useGetCoursesCardDetailsQuery } = explorePageApiSlice;
