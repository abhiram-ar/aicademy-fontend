import Login from "@/components/auth/Login";
import BodyBlock from "@/components/base/BodyBlock";
import loginArt from "./../../../assets/loginArt.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/userAuthAPIs";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useToast } from "../../../hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location);

    const handleLogin: (data: object) => void = async (data) => {
        console.log(data);
        try {
            const payload = await login(data).unwrap();
            const decoded = jwtDecode(payload.token);
            dispatch(
                setCredentials({
                    accessToken: payload.token,
                    user: decoded,
                })
            );
            if (location.state && location.state.from) {
                navigate(location.state.from);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("error while logging in", error);
            toast({
                variant: "destructive",
                title: "Error while Login",
                description: (error as { data: { message: string } }).data
                    .message,
            });
        }
    };

    const [login] = useLoginMutation();
    return (
        <>
            <BodyBlock>
                <Toaster />
                <div className="w-full lg:w-2/3  mx-auto  flex flex-col gap-10 min-h-fit h-[90vh] lg:flex lg:flex-row justify-between items-center">
                    <div className="m-auto mt-20 w-fit">
                        <h2 className="text-xl font-bold mb-5">
                            Log in to continue your learning journey
                        </h2>
                        <Login handleLogin={handleLogin} role="user" />

                        <p className="text-center mt-5 font-medium">
                            <Link
                                to="/user/forgotPassword"
                                className=" underline ms-1"
                            >
                                Forget Password?
                            </Link>
                        </p>

                        <p className="text-center mt-2 font-medium">
                            Don’t have an account?
                            <Link
                                to="/signup"
                                className="font-bold underline ms-1"
                            >
                                Singup
                            </Link>
                        </p>
                    </div>

                    <div className="w-full flex justify-center items-center -mt-5">
                        <img src={loginArt} alt="login Art peice" />
                    </div>
                </div>
            </BodyBlock>
        </>
    );
};

export default LoginPage;
