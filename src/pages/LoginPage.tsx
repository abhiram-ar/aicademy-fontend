import Login from "@/components/auth/Login";
import BodyBlock from "@/components/base/BodyBlock";
import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import loginArt from "./.././assets/loginArt.png";
import { Link } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
    const dispatch = useDispatch()

    const handleLogin: (data: object) => void = async (data) => {
        console.log(data);
        try {
            const payload = await login(data).unwrap();
            console.log(payload);
        } catch (error) {
            console.error("error while logging in");
            console.log(error);
            //toast
        }
    };
    
    const [login] = useLoginMutation();
    return (
        <>
            <NavbarOnlyLogo />
            <BodyBlock>
                <div className="mx-2 flex-col min-h-fit h-[90vh] lg:mx-52 lg:flex lg:flex-row justify-center items-baseline border gap-5">
                    <div className="m-auto mt-20 w-fit border  ">
                        <h2 className="text-xl font-bold mb-5">
                            Log in to continue your learning journey
                        </h2>
                        <Login handleLogin={handleLogin} />
                        <p className="text-center mt-5 font-medium">
                            Don’t have an account?
                            <Link
                                to="/signup"
                                className="font-bold underline ms-1"
                            >
                                Singup
                            </Link>
                        </p>
                    </div>

                    <div className="w-full flex justify-center items-center border mt-5 ">
                        <img src={loginArt} alt="login Art peice" />
                    </div>
                </div>
            </BodyBlock>
        </>
    );
};

export default LoginPage;
