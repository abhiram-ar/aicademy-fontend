import apiSlice from "@/redux/features/api/apiSlice";
import { setCredentials, logout } from "@/redux/features/auth/authSlice";
import store from "@/redux/store";
import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const fetchAccessTokenOnload = async () => {
    try {
        const result = await store.dispatch(
            apiSlice.endpoints.refresh.initiate(null, { forceRefetch: true })
        );
        if (result.data) {
            const decoded = jwtDecode(result.data);
            store.dispatch(
                setCredentials({ accessToken: result.data, user: decoded })
            );
            return true;
        }
    } catch (error) {
        console.log(`Onload: failed to refresh access token`, error);
        store.dispatch(logout());
    }
    return false;
};

export const authLoader = async (role: string) => {
    const user = store.getState().auth.user;

    let isAuthenticated = user ? true : false;
    
    //only refetch the data if user is not authicated
    if (!user) isAuthenticated = await fetchAccessTokenOnload();
    if (!isAuthenticated) {
        return redirect("/"); 
    }
    if (role === store.getState().auth.user?.role) {
        return null; // Proceed to the protected route
    } else {
        return redirect("/");
    }
};
