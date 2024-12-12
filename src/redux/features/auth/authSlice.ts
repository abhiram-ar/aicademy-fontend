import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activationToken: null,
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setActivationToken: (state, action) => {
            state.activationToken = action.payload.activationToken;
        },
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
export const {setActivationToken, setCredentials, logout}  = authSlice.actions

