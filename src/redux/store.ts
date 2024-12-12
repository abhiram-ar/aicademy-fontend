import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: true, //turn off in production
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store
export type RootState = ReturnType<typeof store.getState>