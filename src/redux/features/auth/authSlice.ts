import { createSlice } from "@reduxjs/toolkit";


interface IUser {
    firstName: string,
    lastName: string,
    email: string
}

interface IState {
    token: string | null,
    user: IUser | null
}

const initialState:IState = {
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

