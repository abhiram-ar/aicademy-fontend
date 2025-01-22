import apiSlice from "@/redux/features/api/apiSlice";
import { ICourseContent } from "./Types";

interface Response {
    success: boolean;
    message: string;
}

interface GetCourseContenetRespose extends Response {
    content: ICourseContent;
}

const learnApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBoughtCourseContent: builder.query<
            GetCourseContenetRespose,
            { courseId?: string }
        >({
            query: (data) => `/api/user/course/learn/${data.courseId}`,
        }),
    }),
});

export const { useGetBoughtCourseContentQuery } = learnApiSlice;
