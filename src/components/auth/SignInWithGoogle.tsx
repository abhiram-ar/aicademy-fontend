import { useGoogleSigninMutation } from "@/redux/features/api/apiSlice";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
    GoogleLogin,
    GoogleOAuthProvider,
    CredentialResponse,
} from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";

export type GoogleAuthRoles = "teacher" | "user";

const SignInWithGoogle: React.FC<{ gAuthRole: GoogleAuthRoles }> = ({
    gAuthRole,
}) => {
    const [authenticateWithGoogleCredentials] = useGoogleSigninMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    console.log(`socual location`, location);

    const handleGoogleSuccess = async (
        credentialResponse: CredentialResponse
    ) => {
        console.log(credentialResponse);
        try {
            const res = await authenticateWithGoogleCredentials({
                credentials: credentialResponse.credential,
                role: gAuthRole,
            }).unwrap();
            const decoded = jwtDecode(res.token);
            console.log(decoded);
            dispatch(setCredentials({ accessToken: res.token, user: decoded }));

            // if redirected from any page, navigate to that page from where the login request came
            if (location.state && location.state.from) {
                return navigate(location.state.from);
            }

            // else navigate to defailt user routes
            if (gAuthRole === "user") navigate("/");
            if (gAuthRole === "teacher") navigate("/teach");
        } catch (error) {
            console.error("error while google signin", error);
        }
    };

    return (
        <>
            <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                onScriptLoadSuccess={() => setLoading(false)}
            >
                {!loading ? (
                    <div className="flex justify-center items-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            theme="filled_black"
                            width={"320px"}
                        />
                    </div>
                ) : (
                    <div className="w-fit mx-auto px-3 py-2 rounded-base bg-[#d9d9d9] flex justify-center items-center gap-3 border  border-black hover:bg-[#bababa] active:bg-zinc-400">
                        <GoogleIcon />

                        <button className="font-medium">
                            SignIn with Google
                        </button>
                    </div>
                )}
            </GoogleOAuthProvider>
        </>
    );
};

export default SignInWithGoogle;
