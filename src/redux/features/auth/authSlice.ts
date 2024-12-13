import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
     
        setCredentials: (state, action) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export default authSlice.reducer
export const { setCredentials, logout}  = authSlice.actions

