import { logout, setCredentials } from "../auth/authSlice";
import { RootState } from "./../../store";
import {
    createApi,
    fetchBaseQuery,
    FetchArgs,
    BaseQueryFn,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const basequery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQuerywithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const { url } = args as FetchArgs;

    // avoid trying to hit refresh route, for public routes
    if (url === "/api/auth/refresh" || url === "/api/auth/goole") {
        return basequery(args, api, extraOptions);
    }

    let result = await basequery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refershResult = await basequery(
            "/api/auth/refresh",
            api,
            extraOptions
        );
        console.log(`refreshed token`, refershResult);
        if (refershResult.data) {
            const newAccessToken = refershResult.data;
            api.dispatch(setCredentials({ token: newAccessToken }));

            //retry the original request
            result = await basequery(args, api, extraOptions);
        } else {
            //logout if refresh fails
            console.warn("jwt refresh expired/invalid. Loggging out....");
            api.dispatch(logout());
        }
    }

    return result;
};

const apiSlice = createApi({
    baseQuery: baseQuerywithReauth,
    tagTypes: [
        "onboarding",
        "draftCourseList",
        "draftCourseDetails",
        "draftCourseContent",
        "cart",
        "wishlist",
        "userDetails",
        "userList",
        "fullCourseList",
        "fullcourseDetailsPublic",
        "couponList",
        "couponDetails",
        "userBoughtCourseList",
        "courseReportList",
        "courseReview",
        "teacherDashboard",
        "teacherBankAccount",
        "teacherPayout",
        "courseOverviewReportList",
    ],
    endpoints: (builder) => ({
        refresh: builder.query({
            query: () => ({
                url: "/api/auth/refresh",
            }),
            keepUnusedDataFor: 0, //nocache
        }),
        googleSignin: builder.mutation({
            query: (data) => ({
                url: "/api/auth/google",
                method: "POST",
                body: data,
            }),
        }),
    }),
});
export const { useRefreshQuery, useGoogleSigninMutation } = apiSlice;
export default apiSlice;
