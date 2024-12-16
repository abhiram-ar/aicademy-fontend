import { Action } from "@radix-ui/react-toast";
import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    teacherId?: string;
    userId?: string;
    firstName?: string;
    role: string;
    isApproved?: string;
}

interface IState {
    token: string | null;
    user: IUser | null;
}

const initialState: IState = {
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

        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { setCredentials, logout, setUser } = authSlice.actions;
