import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInWithGoogle from "./components/auth/SignInWithGoogle";
import {Provider} from "react-redux"
import store from "./redux/store";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/test",
        element: <SignInWithGoogle/>,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>

        <RouterProvider router={appRouter} />
        </Provider>
    </StrictMode>
);
