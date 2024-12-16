import Login from "@/components/auth/Login";
import BodyBlock from "@/components/base/BodyBlock";
import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useToast } from "../../hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const AdminLoginPage = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogin: (data: object) => void = async (data) => {
        console.log(data);
        try {
            const payload = await login(data).unwrap();
            dispatch(
                setCredentials({
                    accessToken: payload.token,
                    user: payload.user,
                })
            );
            navigate("/");
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
            <NavbarOnlyLogo />
            <div className="bg-[#374151]">
                <Toaster />
                <div className="w-full lg:w-2/3  mx-auto flex-col min-h-fit h-[90vh] lg:flex lg:flex-row justify-between items-center gap-10">
                    <div className="m-auto mt-20 w-fit">
                        <h2 className="text-xl text-[#eeefe9] font-bold mb-5">
                            SUDO
                        </h2>
                        <Login handleLogin={handleLogin} enableSocialAuth={false}/>
                    
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLoginPage;
