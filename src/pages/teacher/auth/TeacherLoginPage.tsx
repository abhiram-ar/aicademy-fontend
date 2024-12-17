import Login from "@/components/auth/Login";
import BodyBlock from "@/components/base/BodyBlock";
import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import loginArt from "./../../../assets/loginArt.png";
import { Link, useNavigate } from "react-router-dom";
import { useTeacherLoginMutation } from "@/redux/features/auth/teacherAuthAPI";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useToast } from "../../../hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const TeacherLoginPage = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [login] = useTeacherLoginMutation();

    const handleLogin: (data: object) => void = async (data) => {
        console.log(data);
        try {
            const payload = await login(data).unwrap();
            console.log(payload);
            dispatch(
                setCredentials({
                    accessToken: payload.token,
                    user: payload.teacher,
                })
            );
            navigate("/teach/onboard");
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

    return (
        <>
            <NavbarOnlyLogo />
            <BodyBlock>
                <Toaster />
                <div className="w-full lg:w-2/3  mx-auto flex flex-col min-h-fit h-[90vh] lg:flex lg:flex-row justify-between items-center gap-10">
                    <div className="m-auto mt-20 w-fit">
                        <h2 className="text-xl font-bold mb-5">
                            Log in to continue your learning journey
                        </h2>
                        <Login handleLogin={handleLogin} role="teacher" />
                        <p className="text-center mt-5 font-medium">
                            Don’t have an account?
                            <Link
                                to="/teach/signup"
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

export default TeacherLoginPage;
